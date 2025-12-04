import { useState, useEffect } from "react";
import { 
  X, 
  MapPin, 
  Navigation, 
  Power,
  AlertTriangle,
  Clock,
  Gauge,
  Route,
  Shield,
  Activity
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface GPSTrackerProps {
  onClose: () => void;
}

// Mock data motor yang sedang disewa
const rentalData = {
  motorName: "Honda Beat",
  plateNumber: "AB 1234 XY",
  rentalStartTime: "08:00",
  rentalEndTime: "18:00",
};

// Batas area rental (Geofencing)
const allowedZones = [
  "Yogyakarta Kota",
  "Sleman",
  "Bantul (dalam radius 20 km)",
  "Prambanan",
  "Parangtritis"
];

const forbiddenZones = [
  "Solo (50+ km)",
  "Semarang (100+ km)",
  "Magelang (40+ km)",
  "Purworejo (60+ km)"
];

export function GPSTracker({ onClose }: GPSTrackerProps) {
  const [engineStatus, setEngineStatus] = useState<"ON" | "OFF">("ON");
  const [currentLocation, setCurrentLocation] = useState({
    lat: -7.7956,
    lng: 110.3695,
    address: "Jl. Malioboro, Yogyakarta"
  });
  const [speed, setSpeed] = useState(35);
  const [distance, setDistance] = useState(12.5);
  const [isInSafeZone, setIsInSafeZone] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulasi update GPS real-time
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulasi perubahan kecil pada lokasi
      setCurrentLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
      
      // Simulasi perubahan speed
      setSpeed(Math.floor(Math.random() * 60));
      
      // Simulasi jarak bertambah
      setDistance(prev => prev + 0.1);
      
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulasi keluar zona
  useEffect(() => {
    // Jika distance > 25 km, anggap keluar zona
    if (distance > 25) {
      setIsInSafeZone(false);
    }
  }, [distance]);

  const handleCutOffEngine = () => {
    if (confirm("⚠️ PERINGATAN!\n\nAnda yakin ingin mematikan mesin motor dari jarak jauh?\n\nMesin akan dimatikan secara otomatis dan hanya bisa dinyalakan kembali oleh admin.")) {
      setEngineStatus("OFF");
      alert("✅ Mesin berhasil dimatikan!\n\nHubungi customer service untuk mengaktifkan kembali.");
    }
  };

  const handleActivateEngine = () => {
    if (confirm("Hubungi customer service untuk mengaktifkan mesin?\n\n+62 812-3456-7890")) {
      window.open('tel:+6281234567890');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-t-3xl md:rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">GPS Tracker</h2>
                <p className="text-sm text-blue-100">Live Monitoring & Remote Control</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Motor Info */}
          <Card className="p-4 bg-white text-gray-900">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Motor Anda</p>
                <p className="text-xl">{rentalData.motorName}</p>
                <p className="text-sm text-gray-500">{rentalData.plateNumber}</p>
              </div>
              <Badge 
                className={`${
                  engineStatus === "ON" 
                    ? "bg-green-600" 
                    : "bg-red-600"
                }`}
              >
                <Power className="w-3 h-3 mr-1" />
                {engineStatus}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-4">
              <span>⏰ {rentalData.rentalStartTime} - {rentalData.rentalEndTime}</span>
              <span>🔋 {batteryLevel}%</span>
            </div>
          </Card>
        </div>

        <div className="p-6 space-y-4">
          {/* Alert jika keluar zona */}
          {!isInSafeZone && (
            <Alert className="border-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                ⚠️ <strong>PERINGATAN ZONA!</strong> Motor Anda telah keluar dari area rental yang diizinkan. Mesin dapat dimatikan secara otomatis jika terus melanggar batas zona.
              </AlertDescription>
            </Alert>
          )}

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-gray-600">Kecepatan</p>
              </div>
              <p className="text-2xl">{speed} <span className="text-sm text-gray-500">km/h</span></p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Route className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">Jarak</p>
              </div>
              <p className="text-2xl">{distance.toFixed(1)} <span className="text-sm text-gray-500">km</span></p>
            </Card>
          </div>

          {/* Map Visualization */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Lokasi Real-Time
              </h3>
              <Badge variant="outline" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            
            {/* Mock Map */}
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-400"></div>
                  ))}
                </div>
              </div>

              {/* Safe Zone Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-green-500 border-dashed rounded-full opacity-50"></div>
              
              {/* Warning Zone Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-yellow-500 border-dashed rounded-full opacity-30"></div>

              {/* Motor Position */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${
                !isInSafeZone ? 'animate-pulse' : ''
              }`}>
                <div className={`w-6 h-6 rounded-full ${
                  isInSafeZone ? 'bg-green-500' : 'bg-red-500'
                } shadow-lg relative`}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-current"></div>
                </div>
              </div>

              {/* Zone Labels */}
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Zona Aman</span>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Alamat Saat Ini:</p>
              <p className="text-sm">{currentLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Update terakhir: {lastUpdate.toLocaleTimeString('id-ID')}
              </p>
            </div>
          </Card>

          {/* Geofencing Info */}
          <Card className="p-4">
            <h3 className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              Batas Area Rental (Geofencing)
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-2">✅ <strong>Area Diizinkan:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {allowedZones.map((zone, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm mb-2">❌ <strong>Area Terlarang:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {forbiddenZones.map((zone, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-300">
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Remote Control */}
          <Card className="p-4 border-2 border-red-200 bg-red-50">
            <h3 className="flex items-center gap-2 mb-3 text-red-900">
              <Power className="w-5 h-5" />
              Remote Engine Control
            </h3>
            
            <p className="text-sm text-red-800 mb-4">
              {engineStatus === "ON" 
                ? "Matikan mesin dari jarak jauh jika terjadi pelanggaran atau kehilangan." 
                : "Mesin telah dimatikan. Hubungi customer service untuk mengaktifkan kembali."}
            </p>

            {engineStatus === "ON" ? (
              <Button 
                onClick={handleCutOffEngine}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Power className="w-4 h-4 mr-2" />
                Matikan Mesin (Cut Off)
              </Button>
            ) : (
              <Button 
                onClick={handleActivateEngine}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Power className="w-4 h-4 mr-2" />
                Hubungi CS untuk Aktivasi
              </Button>
            )}
          </Card>

          {/* Info Footer */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-700" />
              Informasi Penting
            </h4>
            <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>GPS diperbarui setiap 3 detik untuk tracking akurat</li>
              <li>Mesin akan otomatis cut off jika keluar zona 30+ menit</li>
              <li>Pelanggaran zona akan tercatat dan dikenakan denda</li>
              <li>Hubungi CS jika terjadi kesalahan sistem GPS</li>
              <li>Biaya denda keluar zona: Rp 100.000 + Rp 50.000/km</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}