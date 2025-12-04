import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Edit
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface ProfilePageProps {
  onClose: () => void;
}

export function ProfilePage({ onClose }: ProfilePageProps) {
  const userData = {
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Malioboro No. 123, Yogyakarta",
    joinDate: "Januari 2024",
    totalRentals: 5,
    membershipLevel: "Gold Member",
    avatar: "",
  };

  const menuItems = [
    {
      icon: User,
      label: "Edit Profil",
      description: "Ubah data pribadi Anda",
      action: () => alert("Fitur edit profil akan segera hadir!"),
    },
    {
      icon: Shield,
      label: "Verifikasi KTP",
      description: "Status: Terverifikasi ✓",
      badge: "Verified",
      action: () => alert("KTP Anda sudah terverifikasi"),
    },
    {
      icon: CreditCard,
      label: "Metode Pembayaran",
      description: "Kelola kartu & e-wallet",
      action: () => alert("Fitur metode pembayaran akan segera hadir!"),
    },
    {
      icon: Bell,
      label: "Notifikasi",
      description: "Atur preferensi notifikasi",
      action: () => alert("Fitur notifikasi akan segera hadir!"),
    },
    {
      icon: Settings,
      label: "Pengaturan",
      description: "Preferensi aplikasi",
      action: () => alert("Fitur pengaturan akan segera hadir!"),
    },
    {
      icon: HelpCircle,
      label: "Bantuan & Dukungan",
      description: "FAQ & Customer Service",
      action: () => window.open('tel:+6281234567890'),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-t-3xl md:rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Profil Saya</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info Card */}
          <Card className="p-6 bg-white text-gray-900">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-red-100 text-red-700 text-2xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white hover:bg-red-800 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl">{userData.name}</h3>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <Badge className="bg-yellow-600 mb-2">
                  {userData.membershipLevel}
                </Badge>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{userData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl text-red-700">{userData.totalRentals}</p>
                <p className="text-xs text-gray-500">Total Rental</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {userData.joinDate}
                </p>
                <p className="text-xs text-gray-500">Bergabung Sejak</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm text-gray-500 mb-3">PENGATURAN AKUN</h3>
          
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={item.action}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{item.label}</h4>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            );
          })}

          {/* Logout Button */}
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-red-200 bg-red-50"
            onClick={() => {
              if (confirm("Yakin ingin keluar dari akun?")) {
                alert("Logout berhasil!");
                onClose();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <LogOut className="w-5 h-5 text-red-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-red-700">Keluar</h4>
                <p className="text-xs text-red-600">Logout dari akun Anda</p>
              </div>
            </div>
          </Card>

          {/* App Info */}
          <div className="text-center pt-6 pb-4">
            <p className="text-xs text-gray-400">MotoRun Jogja v1.0.0</p>
            <p className="text-xs text-gray-400">© 2024 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
