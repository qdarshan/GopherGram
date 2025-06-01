import type { ReactNode } from "@tanstack/react-router";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
}

export default function MainLayout({
  children,
  rightSidebar,
}: MainLayoutProps) {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-2/12 flex-col w-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-10/12 flex-col overflow-y-auto scrollbar-hide">
        <div className="flex">
          <div className="flex-2/3">{children}</div>
          <div className="flex-1/3">
            {rightSidebar || <DefaultRightSidebar />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DefaultRightSidebar() {
  const trendingTopics = ["#React", "#TypeScript", "#WebDev"];
  const suggestedCommunities = ["r/javascript", "r/frontend", "r/coding"];

  return (
    <div className="p-4" role="complementary">
      <section className="bg-card rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2 text-lg">Trending Topics</h3>
        <ul className="space-y-2">
          {trendingTopics.map((topic) => (
            <li key={topic} className="text-sm text-muted-foreground">
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card rounded-lg p-4">
        <h3 className="font-semibold mb-2 text-lg">Suggested Communities</h3>
        <ul className="space-y-2">
          {suggestedCommunities.map((community) => (
            <li key={community} className="text-sm">
              {community}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
