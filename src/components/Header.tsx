import { Search, Bell } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { NotificationPanel } from "./NotificationPanel";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNotificationNavigate?: (destination: string) => void;
}

export function Header({ onSearch, onNotificationNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl">MotoRun Jogja</h1>
            <button 
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
              placeholder="Cari Motor di Sekitarmu..."
              className="pl-10 bg-white text-gray-900 border-none rounded-xl h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </div>

      {showNotifications && (
        <NotificationPanel 
          onClose={() => setShowNotifications(false)}
          onNavigate={onNotificationNavigate}
        />
      )}
    </>
  );
}