import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, CheckCircle2, Calendar, User, CreditCard, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookingSummaryProps {
  motorcycle: any;
  bookingData: any;
  paymentData: any;
  onBack: () => void;
  onConfirm: () => void;
}

export function BookingSummary({ motorcycle, bookingData, paymentData, onBack, onConfirm }: BookingSummaryProps) {
  const dpAmount = Math.floor(bookingData.totalPrice * 0.5);
  const depositAmount = 500000;

  const handleConfirmBooking = () => {
    alert("Booking berhasil! Kami akan mengirimkan instruksi pembayaran ke email Anda.");
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* Success Icon */}
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
        <h3 className="text-xl text-gray-900 mb-1">Booking Siap Dikonfirmasi</h3>
        <p className="text-sm text-gray-600">Periksa kembali data booking Anda</p>
      </div>

      {/* Motor Info */}
      <Card className="p-4 bg-gray-50">
        <div className="flex gap-4 items-center mb-3">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
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
      <Card className="p-4">
        <h3 className="flex items-center gap-2 text-gray-900 mb-3">
          <User className="w-5 h-5" />
          Data Penyewa
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Nama:</span>
            <span>{bookingData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">NIK:</span>
            <span>{bookingData.nik}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Telepon:</span>
            <span>{bookingData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="text-xs">{bookingData.email}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600">KTP:</span>
            <span className="text-green-600 text-xs">✓ Terverifikasi</span>
          </div>
        </div>
      </Card>

      {/* Rental Period */}
      <Card className="p-4">
        <h3 className="flex items-center gap-2 text-gray-900 mb-3">
          <Calendar className="w-5 h-5" />
          Periode Sewa
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Mulai:</span>
            <span>{new Date(bookingData.startDate).toLocaleDateString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Selesai:</span>
            <span>{new Date(bookingData.endDate).toLocaleDateString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Durasi:</span>
            <span>{bookingData.days} hari</span>
          </div>
        </div>
      </Card>

      {/* Pickup Location */}
      <Card className="p-4">
        <h3 className="flex items-center gap-2 text-gray-900 mb-3">
          <MapPin className="w-5 h-5" />
          Lokasi Pengambilan
        </h3>
        <p className="text-sm">{bookingData.pickupLocation}</p>
      </Card>

      {/* Payment Method */}
      <Card className="p-4">
        <h3 className="flex items-center gap-2 text-gray-900 mb-3">
          <CreditCard className="w-5 h-5" />
          Metode Pembayaran
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Metode:</span>
            <span className="capitalize">{paymentData.paymentMethod.replace("_", " ")}</span>
          </div>
          {paymentData.paymentDetail && (
            <div className="flex justify-between">
              <span className="text-gray-600">Detail:</span>
              <span>{paymentData.paymentDetail}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Breakdown */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="text-gray-900 mb-3">Rincian Pembayaran</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Harga Sewa ({bookingData.days} hari):</span>
            <span>Rp {bookingData.totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-orange-700">
            <span>DP (50%):</span>
            <span>Rp {dpAmount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-blue-700">
            <span>Deposit (dikembalikan):</span>
            <span>Rp {depositAmount.toLocaleString("id-ID")}</span>
          </div>
          <div className="border-t border-blue-300 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-900">Total Bayar Sekarang:</span>
              <span className="text-xl text-red-700">
                Rp {(dpAmount + depositAmount).toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Sisa Rp {(bookingData.totalPrice - dpAmount).toLocaleString("id-ID")} dibayar saat pengambilan motor
            </p>
          </div>
        </div>
      </Card>

      {/* Terms */}
      <Card className="p-4 bg-gray-50 text-xs text-gray-600">
        <p className="mb-2">Dengan melanjutkan, Anda menyetujui:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Syarat dan ketentuan penyewaan motor</li>
          <li>Kebijakan pembatalan dan pengembalian dana</li>
          <li>Bertanggung jawab atas kerusakan atau kehilangan motor</li>
          <li>Data pribadi digunakan untuk verifikasi dan komunikasi</li>
        </ul>
      </Card>

      <Button
        onClick={handleConfirmBooking}
        className="w-full h-12 bg-red-900 hover:bg-red-800"
      >
        Konfirmasi & Lanjut ke Pembayaran
      </Button>
    </div>
  );
}