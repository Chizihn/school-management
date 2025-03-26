import React, { JSX, useState, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  Settings,
  FileText,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SubMenuItem {
  title: string;
  path: string;
}

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subItems?: SubMenuItem[];
  isNew?: boolean;
}

interface ExpandedItems {
  [key: string]: boolean;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const toggleExpand = useCallback((key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Teachers",
      icon: <Users size={20} />,
      path: "/dashboard/teachers",
      subItems: [
        { title: "All teachers", path: "/teachers" },
        { title: "Add teacher", path: "/teachers/add" },
      ],
    },
    {
      title: "Students/Classes",
      icon: <GraduationCap size={20} />,
      path: "/dashboard/students",
      subItems: [
        { title: "All students", path: "/dashboard/students/all" },
        { title: "Admission form", path: "/dashboard/students/admission" },
        { title: "Student promotion", path: "/dashboard/students/promotion" },
        { title: "Class", path: "/dashboard/students/class" },
      ],
    },
    {
      title: "Billing",
      icon: <CreditCard size={20} />,
      path: "/dashboard/billing",
      subItems: [
        { title: "Student Billing", path: "/dashboard/billing/student" },
        { title: "Parent Billing", path: "/dashboard/billing/parent" },
        { title: "School Billing", path: "/dashboard/billing/school" },
        { title: "Friend Billing", path: "/dashboard/billing/friend" },
      ],
    },
    {
      title: "Settings and profile",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
    {
      title: "Exams",
      icon: <FileText size={20} />,
      path: "/exams",
    },
    {
      title: "Features",
      icon: <Sparkles size={20} />,
      path: "/dashboard/features",
      isNew: true,
    },
  ];

  return (
    <>
      {/* Mobile hamburger menu */}
      <div className="lg:hidden flex items-center p-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-blue-900 text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 fixed inset-y-0 left-0 z-30 w-64 bg-blue-950 text-white overflow-y-auto flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center p-4 border-b border-blue-900">
          <div className="text-lg font-semibold">Udemy school</div>
        </div>

        {/* Menu items */}
        <div className="flex-grow">
          {menuItems.map((item, index) => (
            <div key={index} className="px-2 py-1">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-blue-900 ${
                  pathname.startsWith(`${pathname.startsWith(`${item.path}`)}`)
                    ? "bg-blue-800"
                    : ""
                }`}
                onClick={() =>
                  item.subItems ? toggleExpand(item.title) : null
                }
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center">
                  {item.isNew && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full mr-2">
                      NEW
                    </span>
                  )}
                  {item.subItems &&
                    (expandedItems[item.title] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </div>

              {/* Submenu */}
              {item.subItems && expandedItems[item.title] && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.path}
                      className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-blue-900 rounded-md"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
