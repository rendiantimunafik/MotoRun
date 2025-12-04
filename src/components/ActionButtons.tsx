import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { TourismRecommendations } from "./TourismRecommendations";

interface ActionButtonsProps {
  onRentNow?: () => void;
  showTourismPanel?: boolean;
  onTourismOpen?: () => void;
  onTourismClose?: () => void;
}

export function ActionButtons({ onRentNow, showTourismPanel, onTourismOpen, onTourismClose }: ActionButtonsProps) {
  const [showTourism, setShowTourism] = useState(false);

  const handleTourismClick = () => {
    setShowTourism(true);
    if (onTourismOpen) {
      onTourismOpen();
    }
  };

  const handleTourismClose = () => {
    setShowTourism(false);
    if (onTourismClose) {
      onTourismClose();
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto px-6 space-y-4">
        <button
          onClick={handleTourismClick}
          className="w-full bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Camera className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg text-red-700">Rekomendasi Wisata Jogja</h3>
            <p className="text-sm text-gray-600">Alam, sejarah & kuliner</p>
          </div>
        </button>

        <Button 
          className="w-full h-16 bg-red-900 hover:bg-red-800 text-white rounded-2xl text-lg shadow-lg"
          onClick={onRentNow}
        >
          Sewa Sekarang
        </Button>
      </div>

      {(showTourism || showTourismPanel) && (
        <TourismRecommendations onClose={handleTourismClose} />
      )}
    </>
  );
}