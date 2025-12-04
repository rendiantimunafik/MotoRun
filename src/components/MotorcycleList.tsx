import { MotorcycleCard } from "./MotorcycleCard";

const motorcycles = [
  {
    id: 1,
    name: "Honda Beat",
    category: "Matic",
    price: 75000,
    image: "https://images.unsplash.com/photo-1693407787355-2a77a9160898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwdmVzcGF8ZW58MXx8fHwxNzYyNTAwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Automatic", "Hemat BBM", "Nyaman Dikendarai"],
  },
  {
    id: 2,
    name: "Yamaha NMAX",
    category: "Matic Premium",
    price: 120000,
    image: "https://images.unsplash.com/photo-1693407787355-2a77a9160898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwdmVzcGF8ZW58MXx8fHwxNzYyNTAwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["ABS", "Keyless", "Lega & Nyaman"],
  },
  {
    id: 3,
    name: "Honda CBR 150R",
    category: "Sport",
    price: 150000,
    image: "https://images.unsplash.com/photo-1656414760392-5dbd778c59e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMG1vdG9yY3ljbGV8ZW58MXx8fHwxNzYyNDY3NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Sport Mode", "150cc", "Racing Style"],
  },
  {
    id: 4,
    name: "Kawasaki Ninja 250",
    category: "Sport Premium",
    price: 200000,
    image: "https://images.unsplash.com/photo-1656414760392-5dbd778c59e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMG1vdG9yY3ljbGV8ZW58MXx8fHwxNzYyNDY3NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["250cc", "Twin Cylinder", "High Performance"],
  },
  {
    id: 5,
    name: "Honda ADV 150",
    category: "Adventure",
    price: 130000,
    image: "https://images.unsplash.com/photo-1666907418714-1b5f85aaf146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3RvcmN5Y2xlfGVufDF8fHx8MTc2MjQ4NDc3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["All Terrain", "Bagasi Luas", "ABS"],
  },
  {
    id: 6,
    name: "Yamaha PCX",
    category: "Matic Premium",
    price: 125000,
    image: "https://images.unsplash.com/photo-1693407787355-2a77a9160898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY29vdGVyJTIwdmVzcGF8ZW58MXx8fHwxNzYyNTAwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Smart Key", "Mewah", "Irit BBM"],
  },
];

export function MotorcycleList() {
  return (
    <section id="motor" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Daftar Motor Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih motor sesuai kebutuhan Anda. Semua motor terawat dan dalam kondisi prima.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map((motorcycle) => (
            <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
          ))}
        </div>
      </div>
    </section>
  );
}
