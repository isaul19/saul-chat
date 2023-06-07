import { ComponentMessage } from "../types";

export default function MyMessage({ content }: ComponentMessage) {
  return (
    <div className="bg-white p-2">
      User Message:
      <p>{content}</p>
    </div>
  );
}
