import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check } from "lucide-react";
import { useState } from "react";
import { BookingFlow } from "./BookingFlow";

interface MotorcycleCardProps {
  motorcycle: {
    id: number;
    name: string;
    price: number;
    image: string;
    features: string[];
  };
}

export function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex gap-4 p-4">
          <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={motorcycle.image}
              alt={motorcycle.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg mb-1">{motorcycle.name}</h3>
            <div className="text-xl text-red-700 mb-2">
              Rp {motorcycle.price.toLocaleString("id-ID")}
              <span className="text-xs text-gray-500">/hari</span>
            </div>
            
            <div className="space-y-1 mb-3">
              {motorcycle.features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button size="sm" className="mt-auto bg-red-900 hover:bg-red-800" onClick={() => setShowBooking(true)}>
              Booking
            </Button>
          </div>
        </div>
      </Card>
      
      {showBooking && (
        <BookingFlow
          motorcycle={motorcycle}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
}