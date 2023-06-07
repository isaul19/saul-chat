import { ComponentMessage } from "../types";

export default function MyMessage({ content }: ComponentMessage) {
  return (
    <div className="bg-white rounded-md p-2">
      User Message:
      <div className="whitespace-pre-wrap break-words">{content}</div>
    </div>
  );
}
