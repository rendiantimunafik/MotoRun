import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, CreditCard, Wallet, Building2, Smartphone } from "lucide-react";

interface PaymentMethodProps {
  motorcycle: any;
  bookingData: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function PaymentMethod({ motorcycle, bookingData, onSubmit, onBack }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    {
      id: "bank_transfer",
      name: "Transfer Bank",
      icon: Building2,
      description: "BCA, BNI, Mandiri, BRI",
      options: ["BCA", "BNI", "Mandiri", "BRI"],
    },
    {
      id: "e_wallet",
      name: "E-Wallet",
      icon: Wallet,
      description: "GoPay, OVO, DANA, ShopeePay",
      options: ["GoPay", "OVO", "DANA", "ShopeePay"],
    },
    {
      id: "qris",
      name: "QRIS",
      icon: Smartphone,
      description: "Scan & Pay dengan semua e-wallet",
      options: null,
    },
    {
      id: "credit_card",
      name: "Kartu Kredit/Debit",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB",
      options: null,
    },
  ];

  const [selectedBank, setSelectedBank] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert("Pilih metode pembayaran");
      return;
    }
    onSubmit({
      paymentMethod: selectedMethod,
      paymentDetail: selectedBank,
    });
  };

  const selectedPayment = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* Summary */}
      <Card className="p-4 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Motor:</span>
            <span>{motorcycle.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Durasi:</span>
            <span>{bookingData.days} hari</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-gray-900">Total Pembayaran:</span>
            <span className="text-xl text-red-700">
              Rp {bookingData.totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-gray-900">Pilih Metode Pembayaran</h3>
        
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-red-700 border-2 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-4">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <Label htmlFor={method.id} className="cursor-pointer text-base">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </RadioGroup>
      </div>

      {/* Bank/E-Wallet Selection */}
      {selectedPayment?.options && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <Label className="text-gray-900 mb-3 block">
            Pilih {selectedPayment.name}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {selectedPayment.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedBank(option)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedBank === option
                    ? "border-red-700 bg-white"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Important Notes */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <h4 className="text-sm text-yellow-900 mb-2">Catatan Penting:</h4>
        <ul className="text-xs text-yellow-800 space-y-1 list-disc list-inside">
          <li>Pembayaran DP 50% untuk mengkonfirmasi booking</li>
          <li>Pelunasan dilakukan saat pengambilan motor</li>
          <li>Deposit Rp 500.000 (dikembalikan setelah motor dikembalikan)</li>
          <li>Pembayaran akan dikonfirmasi dalam 1x24 jam</li>
        </ul>
      </Card>

      <Button
        type="submit"
        disabled={!selectedMethod}
        className="w-full h-12 bg-red-900 hover:bg-red-800"
      >
        Lanjut ke Ringkasan
      </Button>
    </form>
  );
}
