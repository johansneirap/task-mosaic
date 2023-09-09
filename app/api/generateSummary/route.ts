import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos, userName } = await request.json();

  // comunicate with OpenAI GPT
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as ${userName} and say Welcome to the Task Mosaic TODO App! Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos.
        Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here is the data ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { choices } = response;

  return NextResponse.json(choices[0].message);
}
