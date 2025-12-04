import { X, CheckCheck, Tag, AlertCircle, MapPin, Wrench, TrendingUp, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface NotificationPanelProps {
  onClose: () => void;
  onNavigate?: (destination: string) => void;
}

interface Notification {
  id: number;
  type: "promo" | "booking" | "reminder" | "info" | "tips";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: any;
  color: string;
  action?: string; // "orders" | "search" | "tourism" | "emergency"
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "promo",
    title: "Diskon 20% Weekend!",
    message: "Rental motor weekend ini dapat diskon 20% untuk semua kategori. Gunakan kode: WEEKEND20",
    time: "5 menit lalu",
    isRead: false,
    icon: Tag,
    color: "bg-green-100 text-green-600",
    action: "search",
  },
  {
    id: 2,
    type: "booking",
    title: "Booking Dikonfirmasi",
    message: "Booking Honda Beat Anda telah dikonfirmasi. Ambil motor besok pukul 09:00 WIB.",
    time: "2 jam lalu",
    isRead: false,
    icon: CheckCheck,
    color: "bg-blue-100 text-blue-600",
    action: "orders",
  },
  {
    id: 3,
    type: "reminder",
    title: "Reminder Pengembalian",
    message: "Jangan lupa kembalikan Yamaha NMAX besok sebelum pukul 18:00 WIB.",
    time: "4 jam lalu",
    isRead: true,
    icon: AlertCircle,
    color: "bg-yellow-100 text-yellow-600",
    action: "orders",
  },
  {
    id: 4,
    type: "tips",
    title: "Tips Berkendara Aman",
    message: "Selalu gunakan helm SNI, patuhi rambu lalu lintas, dan cek kondisi motor sebelum berangkat.",
    time: "1 hari lalu",
    isRead: true,
    icon: Wrench,
    color: "bg-purple-100 text-purple-600",
    action: "emergency",
  },
  {
    id: 5,
    type: "info",
    title: "Destinasi Populer Minggu Ini",
    message: "Pantai Parangtritis menjadi destinasi favorit penyewa motor minggu ini. Jarak 27 km dari kota.",
    time: "1 hari lalu",
    isRead: true,
    icon: MapPin,
    color: "bg-orange-100 text-orange-600",
    action: "tourism",
  },
  {
    id: 6,
    type: "promo",
    title: "Cashback 50rb!",
    message: "Dapatkan cashback Rp 50.000 untuk rental minimal 3 hari. Promo terbatas!",
    time: "2 hari lalu",
    isRead: true,
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
    action: "search",
  },
];

export function NotificationPanel({ onClose, onNavigate }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: Notification) => {
    // Tandai sebagai dibaca
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    ));

    // Navigasi jika ada action
    if (notification.action && onNavigate) {
      onNavigate(notification.action);
      onClose();
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-0">
      <div className="bg-white w-full max-w-md h-full flex flex-col animate-in slide-in-from-top duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-900 to-red-800 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl">Notifikasi</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {unreadCount > 0 && (
            <p className="text-sm text-red-100">
              {unreadCount} notifikasi belum dibaca
            </p>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto pb-6">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative group ${
                      !notification.isRead ? "bg-red-50/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            className={`text-sm ${
                              !notification.isRead ? "font-semibold" : ""
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {notification.time}
                        </p>
                        {notification.action && (
                          <div className="mt-2">
                            <span className="text-xs text-red-600 hover:text-red-700">
                              Ketuk untuk lihat →
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleDeleteNotification(notification.id, e)}
                        className="absolute right-4 top-4 p-1.5 hover:bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Hapus notifikasi"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg text-gray-700 mb-2">
                Tidak ada notifikasi
              </h3>
              <p className="text-sm text-gray-500">
                Notifikasi Anda akan muncul di sini
              </p>
            </div>
          )}
        </div>

        {/* Footer Action */}
        {notifications.length > 0 && unreadCount > 0 && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleMarkAllRead}
            >
              Tandai Semua Dibaca
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}