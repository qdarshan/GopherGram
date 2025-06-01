import Feed from "@/components/Feed";
import MainLayout from "@/components/MainLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <MainLayout>
      <Feed />
    </MainLayout>
  );
}

// function App() {
//   return (
//     // <div className="grid grid-cols-3 gap-4 min-h-screen bg-background">
//     //   <div className="col-span-1 border-r border-border p-4">
//     //     <Sidebar />
//     //   </div>
//     //   <main className="col-span-1 p-4">
//     //     <Outlet />
//     //   </main>
//     //   <div className="col-span-1 border-l border-border p-4">
//     //     <Feed />
//     //   </div>
//     // </div>

//     // <div className="flex h-full overflow-hidden">
//     //   <div className="flex-2/12 flex-col w-full overflow-y-auto">
//     //     <Sidebar />
//     //   </div>
//     //   <div className="flex-10/12 flex-col overflow-y-auto scrollbar-hide">
//     //     <div className="flex">
//     //       <div className="flex-2/3">
//     //         <Feed/>
//     //       </div>
//     //       <div className="flex-1/3">
//     //         <Feed />
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }
