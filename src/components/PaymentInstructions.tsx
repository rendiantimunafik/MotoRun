import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { 
  Copy, 
  CheckCircle2, 
  Upload, 
  Clock,
  AlertCircle,
  Smartphone,
  Building2
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PaymentInstructionsProps {
  motorcycle: any;
  bookingData: any;
  paymentData: any;
  totalAmount: number;
  onComplete: () => void;
}

export function PaymentInstructions({ 
  motorcycle, 
  bookingData, 
  paymentData, 
  totalAmount,
  onComplete 
}: PaymentInstructionsProps) {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate booking code
  const bookingCode = `MTR${Date.now().toString().slice(-8)}`;
  
  // Payment details based on method
  const getPaymentDetails = () => {
    const method = paymentData.paymentMethod;
    const detail = paymentData.paymentDetail;

    if (method === "bank_transfer") {
      const bankAccounts: any = {
        "BCA": { number: "1234567890", name: "MotoRun Jogja" },
        "BNI": { number: "0987654321", name: "MotoRun Jogja" },
        "Mandiri": { number: "1122334455", name: "MotoRun Jogja" },
        "BRI": { number: "5544332211", name: "MotoRun Jogja" },
      };
      return bankAccounts[detail] || bankAccounts["BCA"];
    }

    if (method === "e_wallet") {
      const walletAccounts: any = {
        "GoPay": { number: "081234567890", name: "MotoRun Jogja" },
        "OVO": { number: "081234567890", name: "MotoRun Jogja" },
        "DANA": { number: "081234567890", name: "MotoRun Jogja" },
        "ShopeePay": { number: "081234567890", name: "MotoRun Jogja" },
      };
      return walletAccounts[detail] || walletAccounts["GoPay"];
    }

    return null;
  };

  const paymentDetails = getPaymentDetails();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
      setPaymentProofPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitProof = () => {
    if (!paymentProof) {
      alert("Mohon upload bukti pembayaran");
      return;
    }
    alert("Bukti pembayaran berhasil dikirim! Kami akan verifikasi dalam 1x24 jam dan mengirimkan konfirmasi ke email Anda.");
    onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Booking Code */}
      <Card className="p-6 bg-gradient-to-br from-red-900 to-red-800 text-white text-center">
        <p className="text-sm opacity-90 mb-2">Kode Booking Anda</p>
        <h2 className="text-3xl mb-4">{bookingCode}</h2>
        <p className="text-xs opacity-75">Simpan kode ini untuk tracking pesanan</p>
      </Card>

      {/* Timer */}
      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8 text-orange-600" />
          <div>
            <p className="text-sm text-orange-900">Selesaikan pembayaran dalam</p>
            <p className="text-xl text-orange-700">23:59:45</p>
          </div>
        </div>
      </Card>

      {/* Payment Amount */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Total Pembayaran</p>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl text-red-700">
              Rp {totalAmount.toLocaleString("id-ID")}
            </h2>
            <button
              onClick={() => handleCopy(totalAmount.toString())}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Klik untuk menyalin nominal
          </p>
        </div>
      </Card>

      {/* Payment Instructions */}
      {paymentData.paymentMethod === "qris" ? (
        <Card className="p-6">
          <div className="text-center">
            <Smartphone className="w-12 h-12 text-red-700 mx-auto mb-4" />
            <h3 className="text-lg mb-4">Scan QR Code untuk Bayar</h3>
            
            {/* QR Code Placeholder */}
            <div className="w-64 h-64 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">QR Code QRIS</p>
                <p className="text-xs text-gray-400 mt-2">Scan dengan aplikasi e-wallet Anda</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Cara Pembayaran:</p>
              <ol className="text-xs text-gray-600 text-left space-y-1 list-decimal list-inside">
                <li>Buka aplikasi e-wallet (GoPay, OVO, DANA, dll)</li>
                <li>Pilih menu "Scan QR"</li>
                <li>Scan kode QR di atas</li>
                <li>Pastikan nominal sesuai: Rp {totalAmount.toLocaleString("id-ID")}</li>
                <li>Konfirmasi pembayaran</li>
              </ol>
            </div>
          </div>
        </Card>
      ) : paymentData.paymentMethod === "bank_transfer" && paymentDetails ? (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-red-700" />
            <div>
              <h3 className="text-lg">Transfer Bank {paymentData.paymentDetail}</h3>
              <p className="text-sm text-gray-600">Ikuti instruksi di bawah ini</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-xs text-gray-600">Nomor Rekening</Label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg">{paymentDetails.number}</span>
                <button
                  onClick={() => handleCopy(paymentDetails.number)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-xs text-gray-600">Atas Nama</Label>
              <p className="text-lg mt-1">{paymentDetails.name}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Cara Transfer:</p>
              <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                <li>Buka aplikasi m-banking {paymentData.paymentDetail}</li>
                <li>Pilih menu "Transfer"</li>
                <li>Masukkan nomor rekening: {paymentDetails.number}</li>
                <li>Masukkan nominal: Rp {totalAmount.toLocaleString("id-ID")}</li>
                <li>Pastikan nama penerima: {paymentDetails.name}</li>
                <li>Konfirmasi dan selesaikan transfer</li>
              </ol>
            </div>
          </div>
        </Card>
      ) : paymentData.paymentMethod === "e_wallet" && paymentDetails ? (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-8 h-8 text-red-700" />
            <div>
              <h3 className="text-lg">Transfer {paymentData.paymentDetail}</h3>
              <p className="text-sm text-gray-600">Ikuti instruksi di bawah ini</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-xs text-gray-600">Nomor {paymentData.paymentDetail}</Label>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg">{paymentDetails.number}</span>
                <button
                  onClick={() => handleCopy(paymentDetails.number)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <Label className="text-xs text-gray-600">Atas Nama</Label>
              <p className="text-lg mt-1">{paymentDetails.name}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">Cara Transfer {paymentData.paymentDetail}:</p>
              <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                <li>Buka aplikasi {paymentData.paymentDetail}</li>
                <li>Pilih menu "Transfer" atau "Kirim"</li>
                <li>Masukkan nomor: {paymentDetails.number}</li>
                <li>Masukkan nominal: Rp {totalAmount.toLocaleString("id-ID")}</li>
                <li>Pastikan nama penerima: {paymentDetails.name}</li>
                <li>Tulis catatan: "{bookingCode}"</li>
                <li>Konfirmasi dan kirim</li>
              </ol>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-900">
                Metode pembayaran {paymentData.paymentMethod} akan segera tersedia.
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Silakan pilih metode lain atau hubungi customer service.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Upload Payment Proof */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <h3 className="flex items-center gap-2 text-gray-900 mb-4">
          <Upload className="w-5 h-5" />
          Upload Bukti Pembayaran
        </h3>

        <Label htmlFor="payment-proof" className="cursor-pointer">
          <div className="text-center">
            {paymentProofPreview ? (
              <div className="space-y-2">
                <img
                  src={paymentProofPreview}
                  alt="Payment Proof"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <p className="text-sm text-green-600">Bukti pembayaran berhasil diupload</p>
                <p className="text-xs text-gray-500">Klik untuk mengganti</p>
              </div>
            ) : (
              <div className="py-8">
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600">Upload Screenshot/Foto Bukti Transfer</p>
                <p className="text-xs text-gray-500 mt-1">
                  Format: JPG, PNG (Max 5MB)
                </p>
              </div>
            )}
          </div>
          <Input
            id="payment-proof"
            type="file"
            accept="image/*"
            onChange={handleProofUpload}
            className="hidden"
          />
        </Label>
      </Card>

      {/* Important Notes */}
      <Card className="p-4 bg-red-50 border-red-200">
        <h4 className="text-sm text-red-900 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Penting!
        </h4>
        <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
          <li>Transfer sesuai nominal EXACT: Rp {totalAmount.toLocaleString("id-ID")}</li>
          <li>Sertakan kode booking: {bookingCode} di catatan transfer</li>
          <li>Upload bukti pembayaran untuk verifikasi cepat</li>
          <li>Booking otomatis dibatalkan jika tidak dibayar dalam 24 jam</li>
        </ul>
      </Card>

      {/* Booking Details Summary */}
      <Card className="p-4 bg-gray-50">
        <h4 className="text-sm mb-3">Detail Booking:</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Motor:</span>
            <span>{motorcycle.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nama Penyewa:</span>
            <span>{bookingData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Periode:</span>
            <span>
              {new Date(bookingData.startDate).toLocaleDateString("id-ID")} - {new Date(bookingData.endDate).toLocaleDateString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Durasi:</span>
            <span>{bookingData.days} hari</span>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmitProof}
        disabled={!paymentProof}
        className="w-full h-12 bg-red-900 hover:bg-red-800 disabled:opacity-50"
      >
        {paymentProof ? "Kirim Bukti Pembayaran" : "Upload Bukti Pembayaran Dulu"}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Butuh bantuan? Hubungi WhatsApp: <a href="https://wa.me/62123456789" className="text-red-700 underline">+62 812-3456-789</a>
      </p>
    </div>
  );
}
