import Image from "next/image";
import KanbanBoard from "./components/KanbanBoard";

export default function Home() {
  return (
    <div>
      <div className="text-white text-right text-2xl font-bold px-4 py-2">
        <h3>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
      </div>
      <div>
      <KanbanBoard />
      </div>
    </div>
  );
}
