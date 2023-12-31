interface Board {
  columns: Map<TypedColumns, Column>;
}

type TypedColumns = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumns;
  image?: TodoImage;
}

interface TodoImage {
  bucketId: string;
  fileId: string;
}
