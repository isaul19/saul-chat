import { EventHandler } from "react";

export interface AppContextState {
  inputValue: string;
  onChangeInput: EventHandler<any>;
  onSubmitForm: EventHandler<any>;
  newMessage: (message: Message) => void;
  messages: Message[];
  isLoading: boolean;
}

export interface ComponentChildren {
  children: React.ReactNode;
}

export interface Message {
  from: "user" | "bot";
  content: string;
}

export interface ComponentMessage {
  content: string;
}
