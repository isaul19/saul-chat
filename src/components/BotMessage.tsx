import { ComponentMessage } from "../types";

export default function BotMessage({ content }: ComponentMessage) {
  return (
    <div>
      Bot Message:
      <p>{content}</p>
    </div>
  );
}
