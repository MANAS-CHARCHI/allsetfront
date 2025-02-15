"use client";
import { X, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-gray-900 text-white w-64 p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 md:relative md:w-64`}
    >
      {/* Close button for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>

      <h1 className="text-xl font-semibold mb-6">ChatGPT UI</h1>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link
          href="#"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
        >
          <MessageCircle size={20} />
          <span>Chats</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
