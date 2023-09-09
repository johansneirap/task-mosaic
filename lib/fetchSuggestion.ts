import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board, userName: string) => {
  const todos = formatTodosForAI(board);
  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos, userName }),
  });
  const GPTdata = await res.json();
  const { content } = GPTdata;

  return content;
};

export default fetchSuggestion;
