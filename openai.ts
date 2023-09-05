import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-EE78qiHpCvRBtBOoNBYhnjgT",
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
