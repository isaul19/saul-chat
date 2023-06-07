import { AiOutlineSend } from "react-icons/ai";
import { useApp } from "../context/AppContext";

export default function InputChat() {
  const { onSubmitForm, inputValue, onChangeInput, isLoading } = useApp();

  return (
    <form
      className="fixed pb-5 bottom-0 w-11/12 max-w-3xl bg-white"
      onSubmit={onSubmitForm}
    >
      <div className="rounded-lg overflow-hidden flex shadow-lg border border-black/10">
        <input
          className="w-full p-3 outline-none"
          placeholder="Ingresa una pregunta"
          onChange={onChangeInput}
          value={inputValue}
        />
        <button
          className={`pr-2 ${isLoading ? "text-gray-400" : "text-black"}`}
          disabled={isLoading}
        >
          <AiOutlineSend size={25} />
        </button>
      </div>
    </form>
  );
}
