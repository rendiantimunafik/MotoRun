import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Sewa Motor Mudah dan Terpercaya
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Nikmati perjalanan Anda dengan armada motor berkualitas. Harga terjangkau, proses cepat, dan pelayanan 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Search className="w-5 h-5" />
                Cari Motor
              </Button>
              <Button size="lg" variant="outline">
                Lihat Harga
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Motor Tersedia</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600 mb-2">5000+</div>
                <div className="text-gray-600">Pelanggan Puas</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Layanan</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681765656650-e0c87babdfe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmVudGFsfGVufDF8fHx8MTc2MjUwMDQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sewa Motor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
