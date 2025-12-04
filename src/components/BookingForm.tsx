import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Calendar, Upload, User, Phone, Mail, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookingFormProps {
  motorcycle: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onSubmit: (data: any) => void;
}

export function BookingForm({ motorcycle, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    phone: "",
    email: "",
    address: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    ktpFile: null as File | null,
    ktpPreview: null as string | null,
  });

  const handleKtpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        ktpFile: file,
        ktpPreview: URL.createObjectURL(file),
      });
    }
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const totalPrice = motorcycle.price * calculateDays();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ktpFile) {
      alert("Mohon upload foto KTP Anda");
      return;
    }
    onSubmit({
      ...formData,
      days: calculateDays(),
      totalPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Motor Info */}
      <Card className="p-4 bg-gray-50">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
            <ImageWithFallback
              src={motorcycle.image}
              alt={motorcycle.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg">{motorcycle.name}</h3>
            <p className="text-red-700">
              Rp {motorcycle.price.toLocaleString("id-ID")}/hari
            </p>
          </div>
        </div>
      </Card>

      {/* Personal Data */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-gray-900">
          <User className="w-5 h-5" />
          Data Pribadi
        </h3>
        
        <div>
          <Label htmlFor="fullName">Nama Lengkap (Sesuai KTP)</Label>
          <Input
            id="fullName"
            placeholder="Masukkan nama lengkap"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
          <Input
            id="nik"
            placeholder="16 digit NIK"
            maxLength={16}
            value={formData.nik}
            onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="08xx xxxx xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Alamat Lengkap
          </Label>
          <Textarea
            id="address"
            placeholder="Masukkan alamat lengkap sesuai KTP"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            rows={3}
          />
        </div>
      </div>

      {/* KTP Upload */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-gray-900">
          <Upload className="w-5 h-5" />
          Verifikasi KTP
        </h3>
        
        <Card className="p-4 border-2 border-dashed border-gray-300">
          <Label htmlFor="ktp" className="cursor-pointer">
            <div className="text-center">
              {formData.ktpPreview ? (
                <div className="space-y-2">
                  <img
                    src={formData.ktpPreview}
                    alt="KTP Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-green-600">KTP berhasil diupload</p>
                  <p className="text-xs text-gray-500">Klik untuk mengganti</p>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload Foto KTP</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Format: JPG, PNG (Max 5MB)
                  </p>
                </div>
              )}
            </div>
            <Input
              id="ktp"
              type="file"
              accept="image/*"
              onChange={handleKtpUpload}
              className="hidden"
            />
          </Label>
        </Card>
        <p className="text-xs text-gray-500">
          * Pastikan foto KTP jelas dan terbaca. Data Anda aman dan hanya digunakan untuk verifikasi.
        </p>
      </div>

      {/* Rental Period */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-gray-900">
          <Calendar className="w-5 h-5" />
          Periode Sewa
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Tanggal Mulai</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="endDate">Tanggal Selesai</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="pickupLocation">Lokasi Pengambilan Motor</Label>
          <Input
            id="pickupLocation"
            placeholder="Contoh: Bandara, Hotel, Alamat"
            value={formData.pickupLocation}
            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
            required
          />
        </div>

        {formData.startDate && formData.endDate && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Durasi Sewa:</span>
              <span className="text-blue-700">{calculateDays()} hari</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700">Total Harga:</span>
              <span className="text-xl text-red-700">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </Card>
        )}
      </div>

      <Button type="submit" className="w-full h-12 bg-red-900 hover:bg-red-800">
        Lanjut ke Pembayaran
      </Button>
    </form>
  );
}
