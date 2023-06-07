import { AiOutlineSend } from "react-icons/ai";
import { useApp } from "../context/AppContext";

export default function InputChat() {
  const { onSubmitForm, inputValue, onChangeInput } = useApp();

  return (
    <form
      className="fixed pb-5 bottom-0 w-11/12 max-w-3xl bg-slate-100"
      onSubmit={onSubmitForm}
    >
      <div className="rounded-lg overflow-hidden flex shadow-md">
        <input
          className="w-full p-3 outline-none"
          placeholder="Ingresa una pregunta"
          onChange={onChangeInput}
          value={inputValue}
        />
        <button className="bg-white pr-2">
          <AiOutlineSend size={25} />
        </button>
      </div>
    </form>
  );
}
