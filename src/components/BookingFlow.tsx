import { useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { PaymentMethod } from "./PaymentMethod";
import { BookingSummary } from "./BookingSummary";
import { PaymentInstructions } from "./PaymentInstructions";

interface BookingFlowProps {
  motorcycle: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onClose: () => void;
}

export function BookingFlow({ motorcycle, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<"form" | "payment" | "summary" | "pay">("form");
  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setBookingData(data);
    setStep("payment");
  };

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    setStep("summary");
  };

  const handleConfirmBooking = () => {
    setStep("pay");
  };

  const handleBackToForm = () => {
    setStep("form");
  };

  const handleBackToPayment = () => {
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    alert("Terima kasih! Booking Anda sedang diproses. Kami akan mengirim konfirmasi ke email Anda.");
    onClose();
  };

  const getTotalAmount = () => {
    if (!bookingData) return 0;
    const dpAmount = Math.floor(bookingData.totalPrice * 0.5);
    const depositAmount = 500000;
    return dpAmount + depositAmount;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl">
            {step === "form" && "Data Penyewa"}
            {step === "payment" && "Metode Pembayaran"}
            {step === "summary" && "Ringkasan Booking"}
            {step === "pay" && "Instruksi Pembayaran"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === "form" && (
            <BookingForm 
              motorcycle={motorcycle} 
              onSubmit={handleFormSubmit}
            />
          )}
          
          {step === "payment" && bookingData && (
            <PaymentMethod
              motorcycle={motorcycle}
              bookingData={bookingData}
              onSubmit={handlePaymentSubmit}
              onBack={handleBackToForm}
            />
          )}
          
          {step === "summary" && bookingData && paymentData && (
            <BookingSummary
              motorcycle={motorcycle}
              bookingData={bookingData}
              paymentData={paymentData}
              onBack={handleBackToPayment}
              onConfirm={handleConfirmBooking}
            />
          )}

          {step === "pay" && bookingData && paymentData && (
            <PaymentInstructions
              motorcycle={motorcycle}
              bookingData={bookingData}
              paymentData={paymentData}
              totalAmount={getTotalAmount()}
              onComplete={handlePaymentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}