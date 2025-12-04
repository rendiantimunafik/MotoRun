import { useState } from "react";
import { 
  X, 
  Phone, 
  MapPin, 
  Navigation, 
  Clock,
  Wrench,
  Star,
  AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

interface EmergencyHelpProps {
  onClose: () => void;
}

const bengkelData = [
  {
    id: 1,
    name: "Bengkel Motor Jaya",
    type: "Bengkel Umum",
    distance: "0.5 km",
    address: "Jl. Malioboro No. 45, Yogyakarta",
    phone: "081234567890",
    rating: 4.8,
    open24h: true,
    services: ["Servis Rutin", "Ganti Oli", "Tune Up", "Spare Part"],
  },
  {
    id: 2,
    name: "Yamaha Authorized Service",
    type: "Bengkel Resmi",
    distance: "1.2 km",
    address: "Jl. Solo No. 123, Yogyakarta",
    phone: "081234567891",
    rating: 4.9,
    open24h: false,
    openHours: "08:00 - 17:00",
    services: ["Yamaha Specialist", "Garansi Resmi", "Spare Part Original"],
  },
  {
    id: 3,
    name: "Honda Service Center",
    type: "Bengkel Resmi",
    distance: "1.8 km",
    address: "Jl. Kaliurang KM 5, Yogyakarta",
    phone: "081234567892",
    rating: 4.7,
    open24h: false,
    openHours: "08:00 - 17:00",
    services: ["Honda Specialist", "Garansi Resmi", "Express Service"],
  },
  {
    id: 4,
    name: "Bengkel Cepat 24 Jam",
    type: "Bengkel Umum",
    distance: "2.3 km",
    address: "Jl. Gejayan No. 78, Yogyakarta",
    phone: "081234567893",
    rating: 4.5,
    open24h: true,
    services: ["Buka 24 Jam", "Panggilan Darurat", "Servis Cepat"],
  },
];

const tambalBanData = [
  {
    id: 1,
    name: "Tambal Ban Kilat",
    distance: "0.3 km",
    address: "Jl. Malioboro No. 12, Yogyakarta",
    phone: "081234567894",
    rating: 4.6,
    open24h: true,
    price: "Rp 10.000 - 25.000",
    services: ["Tambal Ban Tubeless", "Tambal Ban Dalam", "Ganti Ban", "Nitrogen"],
  },
  {
    id: 2,
    name: "Tambal Ban 24 Jam Pak Budi",
    distance: "0.7 km",
    address: "Jl. Ahmad Yani No. 34, Yogyakarta",
    phone: "081234567895",
    rating: 4.8,
    open24h: true,
    price: "Rp 15.000 - 30.000",
    services: ["Buka 24 Jam", "Tambal di Tempat", "Antar Jemput"],
  },
  {
    id: 3,
    name: "Ban Motor Centre",
    distance: "1.1 km",
    address: "Jl. Sudirman No. 56, Yogyakarta",
    phone: "081234567896",
    rating: 4.7,
    open24h: false,
    openHours: "07:00 - 21:00",
    price: "Rp 10.000 - 20.000",
    services: ["Jual Ban Baru", "Tambal Ban", "Balancing", "Spooring"],
  },
  {
    id: 4,
    name: "Tambal Ban Express",
    distance: "1.5 km",
    address: "Jl. Wates KM 3, Yogyakarta",
    phone: "081234567897",
    rating: 4.5,
    open24h: false,
    openHours: "06:00 - 22:00",
    price: "Rp 12.000 - 25.000",
    services: ["Tambal Cepat", "Ganti Pentil", "Isi Angin Gratis"],
  },
];

export function EmergencyHelp({ onClose }: EmergencyHelpProps) {
  const [activeTab, setActiveTab] = useState("bengkel");

  const handleCall = (phone: string, name: string) => {
    if (confirm(`Hubungi ${name}?\n${phone}`)) {
      window.open(`tel:${phone}`);
    }
  };

  const handleNavigate = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-t-3xl md:rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Bantuan Darurat</h2>
                <p className="text-sm text-red-100">Mitra Terdekat Siap Membantu</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Emergency Contact */}
          <Card className="p-4 bg-white text-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hotline 24/7</p>
                <p className="text-xl text-red-700">+62 812-3456-7890</p>
              </div>
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open('tel:+6281234567890')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi
              </Button>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="bengkel" className="gap-2">
                <Wrench className="w-4 h-4" />
                Bengkel Motor
              </TabsTrigger>
              <TabsTrigger value="tambal" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Tambal Ban
              </TabsTrigger>
            </TabsList>

            {/* Bengkel Tab */}
            <TabsContent value="bengkel" className="space-y-4">
              {bengkelData.map((bengkel) => (
                <Card key={bengkel.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{bengkel.name}</h3>
                          {bengkel.open24h && (
                            <Badge className="bg-green-600">24 Jam</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{bengkel.type}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{bengkel.rating}</span>
                      </div>
                    </div>

                    {/* Distance & Address */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Navigation className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                        <span className="text-red-700">{bengkel.distance}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{bengkel.address}</span>
                      </div>
                      {!bengkel.open24h && bengkel.openHours && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{bengkel.openHours}</span>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2">
                      {bengkel.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleNavigate(bengkel.address)}
                      >
                        <Navigation className="w-4 h-4" />
                        Navigasi
                      </Button>
                      <Button 
                        className="gap-2 bg-red-900 hover:bg-red-800"
                        onClick={() => handleCall(bengkel.phone, bengkel.name)}
                      >
                        <Phone className="w-4 h-4" />
                        Telepon
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Tambal Ban Tab */}
            <TabsContent value="tambal" className="space-y-4">
              {tambalBanData.map((tambal) => (
                <Card key={tambal.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{tambal.name}</h3>
                          {tambal.open24h && (
                            <Badge className="bg-green-600">24 Jam</Badge>
                          )}
                        </div>
                        <p className="text-sm text-red-700">{tambal.price}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{tambal.rating}</span>
                      </div>
                    </div>

                    {/* Distance & Address */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Navigation className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                        <span className="text-red-700">{tambal.distance}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{tambal.address}</span>
                      </div>
                      {!tambal.open24h && tambal.openHours && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{tambal.openHours}</span>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2">
                      {tambal.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleNavigate(tambal.address)}
                      >
                        <Navigation className="w-4 h-4" />
                        Navigasi
                      </Button>
                      <Button 
                        className="gap-2 bg-red-900 hover:bg-red-800"
                        onClick={() => handleCall(tambal.phone, tambal.name)}
                      >
                        <Phone className="w-4 h-4" />
                        Telepon
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Info Footer */}
          <Card className="p-4 bg-blue-50 border-blue-200 mt-6">
            <h4 className="text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-700" />
              Informasi Penting
            </h4>
            <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>Data jarak dihitung dari lokasi Anda saat ini</li>
              <li>Pastikan konfirmasi ketersediaan sebelum datang</li>
              <li>Simpan nomor hotline kami untuk bantuan darurat</li>
              <li>Layanan 24 jam tersedia untuk keadaan darurat</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
