import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState } from "react";

interface SidebarSectionProps {
  title: string;
  items: {
    label: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
  }[];
  collapsed?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  collapsed = false,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-2 px-2 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded w-full`}
      >
        {!collapsed && (
          <div className="flex flex-row justify-items-end
          ">
            <span>
              {open ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </span>
            <span>{title}</span>
          </div>
        )}
      </button>

      {!collapsed && open && (
        <div className="ml-6">
          {items.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;
