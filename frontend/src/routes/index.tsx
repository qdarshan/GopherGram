import Feed from "@/components/Feed";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <h1>hello world</h1>

      <Feed />
    </div>
  );
}
