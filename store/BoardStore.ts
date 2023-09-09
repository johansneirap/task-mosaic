import { ID, databases, storage } from "@/appwrite";
import getTodosGroupedByColumns from "@/lib/getTodosGroupedByColumns";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: (userEmail: string) => void;
  setBoard: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumns) => void;
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;
  newTaskType: TypedColumns;
  setNewTaskType: (newTaskType: TypedColumns) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  addTask: (
    todo: string,
    columnId: TypedColumns,
    userEmail: string,
    image?: File | null
  ) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumns) => void;
}
export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumns, Column>(),
  },
  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",
  image: null,
  addTask: async (
    todo: string,
    columnId: TypedColumns,
    userEmail: string,
    image?: File | null
  ) => {
    let file: TodoImage | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        user: userEmail,
        ...(file && { image: JSON.stringify(file) }),
      }
    );
    set({ newTaskInput: "", newTaskType: "todo" });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)!.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  setImage: (image: File | null) => set({ image }),
  setNewTaskType: (newTaskType) => set({ newTaskType }),
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async (userEmail: string) => {
    const board = await getTodosGroupedByColumns(userEmail);
    set({ board });
  },
  setBoard: (board: Board) => {
    set({ board });
  },
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);
    //* delete todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
}));
