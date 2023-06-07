import { createContext, useContext, useEffect, useState } from "react";
import { AppContextState, ComponentChildren, Message } from "../types";
import { scrollMaxBottom } from "../helpers";

const AppContext = createContext<AppContextState>({} as AppContextState);

const AppProvider = ({ children }: ComponentChildren) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    newMessage({ from: "user", content: inputValue });
    setInputValue("");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const newMessage = ({ from, content }: Message) => {
    setMessages((prev) => [...prev, { from, content }]);
  };

  useEffect(() => {
    scrollMaxBottom();
  }, [messages]);

  return (
    <AppContext.Provider
      value={{ inputValue, onChangeInput, onSubmitForm, messages, newMessage }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const App = useContext(AppContext);

  if (!App) {
    throw Error("Context not found");
  }
  return App;
};

export { AppProvider, AppContext, useApp };
