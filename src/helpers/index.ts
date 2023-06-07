import { API } from "aws-amplify";

export const scrollMaxBottom = () => {
  document.documentElement.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  });
};

export const gptResponse = (prompt: string) => {
  const apiName = "openai";
  const path = `/gpt-turbo`;
  const myInit = {
    body: {
      prompt
    }
  };

  return API.post(apiName, path, myInit);
};
