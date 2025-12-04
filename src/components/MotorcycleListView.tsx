import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { MotorcycleCard } from "./MotorcycleCard";

interface MotorcycleListViewProps {
  category: string;
  onBack: () => void;
}

const motorcycleData = {
  "Motor Biasa": {
    description: "Motor matic/bebek ringan, hemat BBM, cocok untuk mahasiswa dan pekerja.",
    target: "Ekonomi menengah ke bawah (Mahasiswa, Pekerja)",
    priceRange: "Rp 70.000 – 100.000",
    motorcycles: [
      {
        id: 1,
        name: "Honda Beat",
        price: 70000,
        image: "https://i.pinimg.com/736x/d1/1b/5a/d11b5adde286d1261c2dfa95b6f4ae64.jpg?w=400",
        features: ["Automatic", "Hemat BBM", "Nyaman"],
      },
      {
        id: 2,
        name: "Vario 125",
        price: 85000,
        image: "https://i.pinimg.com/1200x/b1/a4/1f/b1a41f0dc003417db0f0105db0cdb59a.jpg?w=400",
        features: ["125cc", "Stylish", "Irit"],
      },
      {
        id: 3,
        name: "Scoopy",
        price: 80000,
        image: "https://i.pinimg.com/736x/ec/cb/0e/eccb0e8bd63492a603686dbba4341338.jpg?w=400",
        features: ["Retro Design", "Compact", "Ekonomis"],
      },
      {
        id: 4,
        name: "Yamaha Mio",
        price: 75000,
        image: "https://i.pinimg.com/736x/81/7a/fe/817afe4911096a00bca3351e36dfe891.jpg?w=400",
        features: ["Sporty", "Ringan", "Lincah"],
      },
      {
        id: 5,
        name: "Honda Genio",
        price: 90000,
        image: "https://i.pinimg.com/1200x/6e/de/04/6ede045fc8df37969fe9aadebaff3397.jpg?w=400",
        features: ["Modern", "Smart Key", "Premium"],
      },
    ],
  },
  "Motor Besar": {
    description: "Motor besar dengan performa dan kenyamanan tinggi, cocok untuk wisatawan.",
    target: "Ekonomi menengah ke atas (Wisatawan, Freelancer)",
    priceRange: "Rp 150.000 – 250.000",
    motorcycles: [
      {
        id: 6,
        name: "Yamaha NMAX",
        price: 150000,
        image: "https://i.pinimg.com/736x/37/5a/2f/375a2fb791dac4460d3005e2e1c0ef86.jpg?w=400",
        features: ["ABS", "155cc", "Premium Seat"],
      },
      {
        id: 7,
        name: "Honda PCX",
        price: 160000,
        image: "https://i.pinimg.com/736x/66/4a/aa/664aaa7f1e2f9055fae5f5402ea93068.jpg?w=400",
        features: ["Smart Key", "Luxury", "Spacious"],
      },
      {
        id: 8,
        name: "Honda ADV 160",
        price: 180000,
        image: "https://i.pinimg.com/736x/ce/35/4d/ce354d5c479727576533659cdb355234.jpg?w=400",
        features: ["Adventure", "160cc", "All Terrain"],
      },
      {
        id: 9,
        name: "Yamaha XSR 155",
        price: 200000,
        image: "https://i.pinimg.com/736x/e9/f1/09/e9f1098ce5900239b7bdbf8512aa7882.jpg?w=400",
        features: ["Retro Modern", "155cc", "Stylish"],
      },
    ],
  },
  "MOGE": {
    description: "Motor sport/touring kelas premium untuk gaya hidup dan event komunitas.",
    target: "Ekonomi tinggi (Pebisnis, Kolektor Motor, Influencer)",
    priceRange: "Rp 600.000 – 1.200.000",
    motorcycles: [
      {
        id: 10,
        name: "Harley-Davidson Street 750",
        price: 800000,
        image: "https://i.pinimg.com/1200x/3f/5c/b8/3f5cb8da0dbbca0629595c969d87cbd9.jpg?w=400",
        features: ["750cc", "Cruiser", "Iconic Design"],
      },
      {
        id: 11,
        name: "Kawasaki Ninja ZX25R",
        price: 1000000,
        image: "https://i.pinimg.com/1200x/7c/81/ed/7c81edbc49f7da1dd975856ff16c65d0.jpg?w=400",
        features: ["636cc", "Super Sport", "Race Ready"],
      },
      {
        id: 12,
        name: "Yamaha R6",
        price: 1100000,
        image: "https://i.pinimg.com/736x/99/00/4c/99004ce3694c422192964623f11c15ca.jpg?w=400",
        features: ["600cc", "Track Performance", "Aggressive"],
      },
      {
        id: 13,
        name: "Honda CB650R",
        price: 900000,
        image: "https://i.pinimg.com/736x/79/bb/d5/79bbd57a871a65891a8885c2ed15a44d.jpg?w=400",
        features: ["650cc", "Neo Sports Café", "Powerful"],
      },
    ],
  },
};

export function MotorcycleListView({ category, onBack }: MotorcycleListViewProps) {
  const data = motorcycleData[category as keyof typeof motorcycleData];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-md mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl mb-2">{category}</h1>
          <p className="text-sm text-red-100 mb-1">{data.description}</p>
          <p className="text-sm text-red-200 mb-2">Target: {data.target}</p>
          <div className="text-xl text-yellow-300">{data.priceRange} /hari</div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-4">
        {data.motorcycles.map((motorcycle) => (
          <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
        ))}
      </div>
    </div>
  );
}