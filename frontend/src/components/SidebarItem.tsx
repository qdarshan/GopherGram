import type React from "react";

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
        isActive ? "bg-gray-300" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default SidebarItem;
