import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Kami akan menghubungi Anda segera.");
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Booking Motor Sekarang</h2>
            <p className="text-blue-100">
              Isi form di bawah ini dan kami akan segera menghubungi Anda.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pickup" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Lokasi Pengambilan
                </Label>
                <Input
                  id="pickup"
                  placeholder="Masukkan alamat pengambilan"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Tanggal Mulai
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Tanggal Selesai
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Kirim Booking
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
