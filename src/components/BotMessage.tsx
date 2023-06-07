import { ComponentMessage } from "../types";

export default function BotMessage({ content }: ComponentMessage) {
  return (
    <div className="bg-blue-100 rounded-md p-2">
      Bot Message:
      <p className="whitespace-pre-wrap break-words">{content}</p>
    </div>
  );
}
