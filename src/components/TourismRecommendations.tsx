import { useState } from "react";
import { 
  X, 
  MapPin, 
  Clock,
  DollarSign,
  Star,
  Navigation,
  Camera,
  Mountain,
  Sunset,
  TreePine,
  Building2,
  Heart
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TourismRecommendationsProps {
  onClose: () => void;
}

const tourismData = {
  alam: [
    {
      id: 1,
      name: "Pantai Parangtritis",
      category: "Pantai",
      image: "https://i.pinimg.com/1200x/13/cb/6c/13cb6cc641aa971631d31a5e49e5f64c.jpg?w=800",
      rating: 4.6,
      price: "Gratis",
      distance: "27 km",
      duration: "45 menit",
      address: "Jl. Parangtritis, Bantul, Yogyakarta",
      description: "Pantai ikonik dengan pemandangan sunset yang spektakuler dan aktivitas paralayang.",
      highlights: ["Sunset Indah", "Paralayang", "Naik Kuda", "Foto Instagram"],
      bestTime: "Sore hari (16:00 - 18:00)",
    },
    {
      id: 2,
      name: "Bukit Bintang",
      category: "Bukit",
      image: "https://i.pinimg.com/736x/02/b6/6e/02b66e6df03a5ee0f65fe4839ab4b2c9.jpg?w=800",
      rating: 4.7,
      price: "Rp 5.000",
      distance: "15 km",
      duration: "30 menit",
      address: "Pathuk, Gunung Kidul, Yogyakarta",
      description: "Spot terbaik untuk menikmati pemandangan langit malam penuh bintang.",
      highlights: ["Stargazing", "Sunrise", "Camping", "Fotografi"],
      bestTime: "Malam hari (19:00 - 22:00)",
    },
    {
      id: 3,
      name: "Hutan Pinus Mangunan",
      category: "Hutan",
      image: "https://i.pinimg.com/736x/cc/26/71/cc2671dc84fef933d8e6067c078b76b0.jpg?w=800",
      rating: 4.5,
      price: "Rp 10.000",
      distance: "22 km",
      duration: "40 menit",
      address: "Dlingo, Bantul, Yogyakarta",
      description: "Hutan pinus asri dengan spot foto instagramable dan udara sejuk.",
      highlights: ["Spot Foto", "Udara Sejuk", "Hammock", "Piknik"],
      bestTime: "Pagi hari (06:00 - 10:00)",
    },
    {
      id: 4,
      name: "Tebing Breksi",
      category: "Tebing",
      image: "https://i.pinimg.com/1200x/7d/03/a0/7d03a096456aa9d9dd35cdf9af67a70e.jpg?w=800",
      rating: 4.4,
      price: "Rp 10.000",
      distance: "18 km",
      duration: "35 menit",
      address: "Prambanan, Sleman, Yogyakarta",
      description: "Bekas tambang batu kapur yang disulap menjadi destinasi wisata unik.",
      highlights: ["Unik", "Sunset", "Fotografi", "Seni Pahatan"],
      bestTime: "Sore hari (15:00 - 17:00)",
    },
  ],
  sejarah: [
    {
      id: 5,
      name: "Candi Borobudur",
      category: "Candi",
      image: "https://i.pinimg.com/736x/fd/13/f8/fd13f8e749cb09fa094cf48c7af9ff80.jpg?w=800",
      rating: 4.9,
      price: "Rp 50.000",
      distance: "42 km",
      duration: "1 jam",
      address: "Magelang, Jawa Tengah",
      description: "Candi Buddha terbesar di dunia dan situs warisan dunia UNESCO.",
      highlights: ["UNESCO", "Sunrise", "Sejarah", "Fotografi"],
      bestTime: "Pagi hari (04:30 - 07:00)",
    },
    {
      id: 6,
      name: "Candi Prambanan",
      category: "Candi",
      image: "https://i.pinimg.com/1200x/b7/84/dc/b784dcd68ed4e12ed039a164ef072a57.jpg?w=800",
      rating: 4.8,
      price: "Rp 50.000",
      distance: "17 km",
      duration: "30 menit",
      address: "Prambanan, Sleman, Yogyakarta",
      description: "Kompleks candi Hindu terbesar di Indonesia dengan arsitektur megah.",
      highlights: ["UNESCO", "Ramayana Ballet", "Sunset", "Sejarah"],
      bestTime: "Sore hari (15:00 - 18:00)",
    },
    {
      id: 7,
      name: "Keraton Yogyakarta",
      category: "Istana",
      image: "https://i.pinimg.com/1200x/8b/01/4f/8b014f13b6049b7c613b9ceec3b446d5.jpg?w=800",
      rating: 4.6,
      price: "Rp 15.000",
      distance: "5 km",
      duration: "15 menit",
      address: "Jl. Rotowijayan, Yogyakarta",
      description: "Istana resmi Kesultanan Yogyakarta dengan arsitektur Jawa klasik.",
      highlights: ["Budaya", "Museum", "Arsitektur", "Sejarah"],
      bestTime: "Pagi hari (09:00 - 12:00)",
    },
    {
      id: 8,
      name: "Taman Sari",
      category: "Taman",
      image: "https://i.pinimg.com/1200x/f8/79/14/f879147e7ef6c5d014e0b19973c41c87.jpg?w=800",
      rating: 4.5,
      price: "Rp 15.000",
      distance: "6 km",
      duration: "15 menit",
      address: "Patehan, Kraton, Yogyakarta",
      description: "Taman air bekas tempat pemandian keluarga Sultan dengan arsitektur unik.",
      highlights: ["Sejarah", "Fotografi", "Underground Mosque", "Arsitektur"],
      bestTime: "Pagi hari (08:00 - 11:00)",
    },
  ],
  kuliner: [
    {
      id: 9,
      name: "Malioboro",
      category: "Shopping & Kuliner",
      image: "https://i.pinimg.com/1200x/bc/c3/52/bcc352ab1675f8df16f9c441e32fbfd4.jpg?w=800",
      rating: 4.7,
      price: "Bervariasi",
      distance: "3 km",
      duration: "10 menit",
      address: "Jl. Malioboro, Yogyakarta",
      description: "Jantung kota Jogja dengan deretan toko, kuliner khas, dan wisata malam.",
      highlights: ["Shopping", "Kuliner", "Street Food", "Batik"],
      bestTime: "Malam hari (18:00 - 22:00)",
    },
    {
      id: 10,
      name: "Alun-Alun Kidul",
      category: "Taman",
      image: "https://i.pinimg.com/1200x/16/ff/15/16ff155ce260c2535bd00eaadf6b1c2f.jpg?w=800",
      rating: 4.5,
      price: "Gratis",
      distance: "6 km",
      duration: "15 menit",
      address: "Patehan, Kraton, Yogyakarta",
      description: "Alun-alun selatan dengan wahana lampu hias dan kuliner angkringan.",
      highlights: ["Lampu Hias", "Angkringan", "Masangin", "Odong-odong"],
      bestTime: "Malam hari (19:00 - 23:00)",
    },
    {
      id: 11,
      name: "Gudeg Yu Djum",
      category: "Kuliner",
      image: "https://i.pinimg.com/1200x/77/f8/b3/77f8b3dcdbe7980e264653bd03f4dcc0.jpg?w=800",
      rating: 4.8,
      price: "Rp 15.000 - 35.000",
      distance: "7 km",
      duration: "20 menit",
      address: "Jl. Kaliurang, Sleman, Yogyakarta",
      description: "Gudeg legendaris Jogja yang sudah terkenal sejak puluhan tahun.",
      highlights: ["Gudeg", "Kuliner Khas", "Halal", "Legendaris"],
      bestTime: "Pagi hari (06:00 - 11:00)",
    },
    {
      id: 12,
      name: "Bakpia Pathok 25",
      category: "Oleh-oleh",
      image: "https://i.pinimg.com/1200x/7e/0e/1f/7e0e1f645cef151882ac3ad40f521702.jpg?w=800",
      rating: 4.6,
      price: "Rp 30.000 - 50.000",
      distance: "4 km",
      duration: "12 menit",
      address: "Jl. Aip KS Tubun, Yogyakarta",
      description: "Pusat oleh-oleh bakpia khas Jogja dengan berbagai varian rasa.",
      highlights: ["Bakpia", "Oleh-oleh", "Halal", "Varian Rasa"],
      bestTime: "Kapan saja (08:00 - 21:00)",
    },
  ],
};

export function TourismRecommendations({ onClose }: TourismRecommendationsProps) {
  const [activeTab, setActiveTab] = useState("alam");
  const [selectedPlace, setSelectedPlace] = useState<typeof tourismData.alam[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "pantai":
        return Sunset;
      case "bukit":
      case "tebing":
        return Mountain;
      case "hutan":
        return TreePine;
      case "candi":
      case "istana":
      case "taman":
        return Building2;
      default:
        return Camera;
    }
  };

  const handleNavigate = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const renderPlaceCard = (place: typeof tourismData.alam[0]) => {
    const CategoryIcon = getCategoryIcon(place.category);
    
    return (
      <Card 
        key={place.id} 
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedPlace(place)}
      >
        <div className="relative h-48">
          <ImageWithFallback
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(place.id);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition"
          >
            <Heart 
              className={`w-5 h-5 ${
                favorites.includes(place.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`} 
            />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className="bg-white/90 text-gray-900 backdrop-blur">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {place.category}
            </Badge>
            <Badge className="bg-yellow-500">
              <Star className="w-3 h-3 mr-1 fill-white" />
              {place.rating}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg mb-2">{place.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{place.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              {place.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {place.duration}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {place.price}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {place.highlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  if (selectedPlace) {
    const CategoryIcon = getCategoryIcon(selectedPlace.category);
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
        <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
          {/* Image Header */}
          <div className="relative h-64">
            <ImageWithFallback
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(selectedPlace.id);
              }}
              className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition"
            >
              <Heart 
                className={`w-5 h-5 ${
                  favorites.includes(selectedPlace.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600'
                }`} 
              />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-700">
                  <CategoryIcon className="w-3 h-3 mr-1" />
                  {selectedPlace.category}
                </Badge>
                <Badge className="bg-yellow-500">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {selectedPlace.rating}
                </Badge>
              </div>
              <h2 className="text-2xl mb-2">{selectedPlace.name}</h2>
              <p className="text-gray-600">{selectedPlace.description}</p>
            </div>

            {/* Info */}
            <Card className="p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Jarak dari Pusat Kota</p>
                  <p className="text-sm flex items-center gap-1">
                    <Navigation className="w-4 h-4 text-red-700" />
                    {selectedPlace.distance} ({selectedPlace.duration})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Harga Tiket</p>
                  <p className="text-sm flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-red-700" />
                    {selectedPlace.price}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Waktu Terbaik</p>
                  <p className="text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4 text-red-700" />
                    {selectedPlace.bestTime}
                  </p>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-4">
              <h3 className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-red-700" />
                Lokasi
              </h3>
              <p className="text-sm text-gray-600">{selectedPlace.address}</p>
            </Card>

            {/* Highlights */}
            <Card className="p-4">
              <h3 className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-red-700" />
                Highlights
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedPlace.highlights.map((highlight, index) => (
                  <Badge key={index} variant="outline">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <Button 
              onClick={() => handleNavigate(selectedPlace.address)}
              className="w-full bg-red-900 hover:bg-red-800 gap-2"
            >
              <Navigation className="w-4 h-4" />
              Navigasi ke Lokasi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-t-3xl md:rounded-t-2xl z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Rekomendasi Wisata</h2>
                <p className="text-sm text-red-100">Jelajahi Keindahan Jogja</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="alam" className="gap-2">
                <Mountain className="w-4 h-4" />
                Alam
              </TabsTrigger>
              <TabsTrigger value="sejarah" className="gap-2">
                <Building2 className="w-4 h-4" />
                Sejarah
              </TabsTrigger>
              <TabsTrigger value="kuliner" className="gap-2">
                <Camera className="w-4 h-4" />
                Kuliner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alam" className="space-y-4">
              {tourismData.alam.map(renderPlaceCard)}
            </TabsContent>

            <TabsContent value="sejarah" className="space-y-4">
              {tourismData.sejarah.map(renderPlaceCard)}
            </TabsContent>

            <TabsContent value="kuliner" className="space-y-4">
              {tourismData.kuliner.map(renderPlaceCard)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
