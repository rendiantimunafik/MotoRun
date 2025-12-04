import { ArrowLeft } from "lucide-react";
import { MotorcycleCard } from "./MotorcycleCard";

interface Motorcycle {
  id: number;
  name: string;
  price: number;
  image: string;
  features: string[];
  category: string;
}

interface SearchResultsProps {
  searchQuery: string;
  motorcycles: Motorcycle[];
  onBack: () => void;
}

export function SearchResults({ searchQuery, motorcycles, onBack }: SearchResultsProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="max-w-md mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl mb-2">
            {searchQuery ? `Hasil Pencarian "${searchQuery}"` : "Semua Motor"}
          </h1>
          <p className="text-sm text-red-100">
            {motorcycles.length} motor tersedia
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {motorcycles.length > 0 ? (
          <div className="space-y-4">
            {motorcycles.map((motorcycle) => (
              <div key={motorcycle.id}>
                <div className="text-xs text-gray-500 mb-1 ml-1">
                  {motorcycle.category}
                </div>
                <MotorcycleCard motorcycle={motorcycle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-gray-700 mb-2">Motor tidak ditemukan</h3>
            <p className="text-gray-500">
              Coba kata kunci lain atau lihat semua kategori
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
