import { useApp } from "../context/AppContext";
import BotMessage from "./BotMessage";
import MyMessage from "./MyMessage";

export default function ContentChat() {
  const { messages, isLoading } = useApp();
  return (
    <div className="flex flex-col justify-between pt-5">
      <div className="flex flex-col space-y-5">
        <h1 className="text-center font-bold">Saul - Chat</h1>
        {messages.map((message, i) => (
          <div key={message.from + i}>
            {message.from === "user" ? (
              <MyMessage content={message.content} />
            ) : (
              <BotMessage content={message.content} />
            )}
          </div>
        ))}

        {isLoading && <BotMessage content="Cargando..." />}
      </div>
      <div className="h-20 w-full"></div>
    </div>
  );
}
