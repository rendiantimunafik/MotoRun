import { Bike, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Bike className="w-8 h-8 text-blue-500" />
              <span className="text-xl">SewaMotor</span>
            </div>
            <p className="text-sm">
              Penyedia layanan sewa motor terpercaya dengan armada lengkap dan harga terjangkau.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-400 transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#motor" className="hover:text-blue-400 transition">
                  Daftar Motor
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-blue-400 transition">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-blue-400 transition">
                  Booking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5" />
                <span>+62 123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5" />
                <span>info@sewamotor.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>Jl. Contoh No. 123, Jakarta</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 SewaMotor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
