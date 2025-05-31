import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <ThemeProvider>
    <div className="flex h-full overflow-hidden">
      <div className="flex-2/12 flex-col w-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-10/12 flex-col overflow-y-auto scrollbar-hide">
        <div className="flex">
          <div className="flex-2/3">
            <Feed/>
          </div>
          <div className="flex-1/3">
            <Feed />
          </div>
        </div>
      </div>
      {/* <div className="flex-4/12 flex-col overflow-y-auto scrollbar-hide">
      </div> */}
    </div>
    </ThemeProvider>
  );
}
