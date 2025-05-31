import {
  FlameIcon,
  HomeIcon,
  TrendingUpIcon,
  StarIcon,
  CompassIcon,
} from "lucide-react";
import SidebarSection from "./SidebarSection";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

interface SectionConfig {
  title: string;
  items: SidebarItem[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    title: "FEEDS",
    items: [
      { label: "Home", icon: <HomeIcon className="h-5 w-5" /> },
      { label: "Popular", icon: <FlameIcon className="h-5 w-5" /> },
      { label: "All", icon: <CompassIcon className="h-5 w-5" /> },
      { label: "Trending", icon: <TrendingUpIcon className="h-5 w-5" /> },
    ],
  },
  {
    title: "TOPICS",
    items: [
      { label: "Gaming", icon: <StarIcon className="h-5 w-5" /> },
      { label: "Sports", icon: <StarIcon className="h-5 w-5" /> },
      { label: "Technology", icon: <StarIcon className="h-5 w-5" /> },
      { label: "Television", icon: <StarIcon className="h-5 w-5" /> },
    ],
  },
  {
    title: "MY COMMUNITIES",
    items: [
      {
        label: "r/reactjs",
        icon: (
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">r/</span>
          </div>
        ),
      },
      {
        label: "r/typescript",
        icon: (
          <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">r/</span>
          </div>
        ),
      },
      {
        label: "r/webdev",
        icon: (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">r/</span>
          </div>
        ),
      },
      {
        label: "r/programming",
        icon: (
          <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">r/</span>
          </div>
        ),
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full">
      <div className="h-full bg-background text-foreground">
        {SECTION_CONFIGS.map((section) => {
          return (
            <SidebarSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;