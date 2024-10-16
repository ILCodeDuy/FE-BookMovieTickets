import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, Menu } from "react-daisyui";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHome, FaList } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";

const menuItems = [
  { name: "Dashboard", icon: FaHome, link: "/admin/dashboard" },
  { name: "Menu Lists", icon: FaList, link: "/admin/menu-lists" },
  {
    name: "Task Statistics",
    icon: MdWorkHistory,
    link: "/admin/task-statistics",
  },
  { name: "Chat List", icon: IoChatboxEllipses, link: "/admin/chat-list" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    const foundItem = menuItems.find((item) => location.pathname === item.link);
    if (foundItem) setActiveItem(foundItem.name);
  }, [location.pathname]);

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out lg:inset-auto lg:z-auto ${isOpen ? "block" : "hidden lg:block"}`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50 lg:hidden"
        onClick={toggleSidebar}
      ></div>
      <div className="relative flex h-screen w-64 flex-col justify-between bg-gray-900 text-gray-300 shadow-lg">
        <div>
          <div className="mt-8 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">ST-Flix</h2>
            </div>
          </div>
          <div className="scrollbar-hide mt-5 h-[300px] overflow-y-auto lg:h-auto">
            <Menu className="flex-grow">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Menu.Item key={item.name} className="relative">
                    <NavLink
                      to={item.link}
                      className={`flex w-full items-center justify-start rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out ${activeItem === item.name ? "bg-gray-700 font-semibold text-white" : "hover:bg-gray-800/70"} `}
                      onClick={() => {
                        setActiveItem(item.name);
                        toggleSidebar();
                      }}
                    >
                      <div className="flex w-full items-center">
                        {activeItem === item.name && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-blue-400" />
                        )}
                        <Icon
                          className={`mr-3 h-5 w-5 ${activeItem === item.name ? "text-blue-400" : "text-gray-400"}`}
                        />
                        {item.name}
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
        <div className="mx-4 mb-6 flex flex-col items-center">
          <div className="rounded-lg bg-gray-800 p-4 text-center text-gray-200 shadow-md">
            <p className="text-sm">Upgrade to unlock premium features</p>
            <Link to="/upgrade-pro">
              <Button className="my-4 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600">
                + Upgrade Pro
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-xs text-gray-400">
            <p className="font-bold">Brand Name</p>
            <p className="font-light">Created by Your Company</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the Sidebar component
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen should be a boolean and is required
  toggleSidebar: PropTypes.func.isRequired, // toggleSidebar should be a function and is required
};

export default Sidebar;
