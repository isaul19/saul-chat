import { ComponentMessage } from "../types";
import botLogo from "../assets/icons/bot.svg";

export default function BotMessage({ content }: ComponentMessage) {
  return (
    <div className="bg-blue-50 rounded-md p-4 flex gap-5 shadow-sm">
      <img className="w-7 h-7" src={botLogo} alt="bot-icon" />
      <p className="whitespace-pre-wrap break-words">{content}</p>
    </div>
  );
}
