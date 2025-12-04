import { Shield, Clock, Wallet, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Semua motor diasuransikan dan dirawat secara berkala untuk keamanan Anda.",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description: "Booking online dan ambil motor dalam waktu kurang dari 30 menit.",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    description: "Tarif kompetitif dengan berbagai pilihan paket sewa harian, mingguan, dan bulanan.",
  },
  {
    icon: HeadphonesIcon,
    title: "Layanan 24/7",
    description: "Tim customer service kami siap membantu Anda kapan saja.",
  },
];

export function Features() {
  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Mengapa Pilih Kami?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman sewa motor terbaik untuk Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
