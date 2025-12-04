import { Home, Navigation, AlertTriangle, FileText, User } from "lucide-react";

interface BottomNavProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export function BottomNav({ activeTab = "home", onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "gps", icon: Navigation, label: "GPS" },
    { id: "emergency", icon: AlertTriangle, label: "Darurat" },
    { id: "orders", icon: FileText, label: "Pesanan" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const handleTabClick = (tabId: string) => {
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive ? "text-red-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}