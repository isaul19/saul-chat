import ContentChat from "./components/ContentChat";
import InputChat from "./components/InputChat";

export default function App() {
  return (
    <main className="w-11/12 max-w-3xl mx-auto h-screen flex flex-col justify-between">
      <ContentChat />
      <InputChat />
    </main>
  );
}
