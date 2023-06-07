import { ComponentMessage } from "../types";
import userLogo from "../assets/icons/user.svg";

export default function MyMessage({ content }: ComponentMessage) {
  return (
    <div className="bg-gray-50 rounded-md p-4 flex gap-5 shadow-sm">
      <img className="w-7 h-7" src={userLogo} alt="user-logo" />
      <div className="whitespace-pre-wrap break-words">{content}</div>
    </div>
  );
}
