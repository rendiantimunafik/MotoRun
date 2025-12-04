import { useState } from "react";
import { 
  X, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Phone,
  CreditCard,
  FileText,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MyOrdersProps {
  onClose: () => void;
}

const ordersData = [
  {
    id: "ORD-2024-001",
    motorName: "Honda Beat",
    motorImage: "figma:asset/db1df77d31e3c2c140772b5843ad83e7bfbdee83.png",
    plateNumber: "AB 1234 XY",
    bookingDate: "2024-01-15",
    rentalPeriod: "3 hari",
    startDate: "2024-01-20",
    endDate: "2024-01-23",
    status: "active",
    totalPrice: "Rp 210.000",
    deposit: "Rp 500.000",
    pickupLocation: "MotoRun Jogja - Malioboro",
    paymentMethod: "BCA Virtual Account",
  },
  {
    id: "ORD-2024-002",
    motorName: "Yamaha NMAX",
    motorImage: "https://images.unsplash.com/photo-1594332966028-62ec2fb8908e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBubWF4JTIwc2Nvb3RlcnxlbnwxfHx8fDE3NjI1MDMwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    plateNumber: "AB 5678 CD",
    bookingDate: "2024-01-10",
    rentalPeriod: "2 hari",
    startDate: "2024-01-12",
    endDate: "2024-01-14",
    status: "completed",
    totalPrice: "Rp 300.000",
    deposit: "Rp 500.000 (Dikembalikan)",
    pickupLocation: "MotoRun Jogja - Malioboro",
    paymentMethod: "OVO",
  },
  {
    id: "ORD-2024-003",
    motorName: "Honda PCX",
    motorImage: "https://images.unsplash.com/photo-1695950682652-86b73812a9b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMHBjeCUyMHByZW1pdW18ZW58MXx8fHwxNzYyNTAzMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    plateNumber: "AB 9012 EF",
    bookingDate: "2024-01-05",
    rentalPeriod: "1 hari",
    startDate: "2024-01-08",
    endDate: "2024-01-09",
    status: "pending",
    totalPrice: "Rp 160.000",
    deposit: "Rp 500.000",
    pickupLocation: "MotoRun Jogja - Malioboro",
    paymentMethod: "Transfer Bank BCA",
  },
];

export function MyOrders({ onClose }: MyOrdersProps) {
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "completed":
        return "bg-blue-600";
      case "pending":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Sedang Berjalan";
      case "completed":
        return "Selesai";
      case "pending":
        return "Menunggu Pembayaran";
      default:
        return status;
    }
  };

  const activeOrders = ordersData.filter(o => o.status === "active");
  const pendingOrders = ordersData.filter(o => o.status === "pending");
  const completedOrders = ordersData.filter(o => o.status === "completed");

  if (selectedOrder) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
        <div className="bg-white w-full md:max-w-3xl md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-br from-red-900 to-red-800 text-white p-6 rounded-t-3xl md:rounded-t-2xl z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl">Detail Pesanan</h2>
                  <p className="text-sm text-red-100">{selectedOrder.id}</p>
                </div>
              </div>
              <Badge className={getStatusColor(selectedOrder.status)}>
                {getStatusIcon(selectedOrder.status)}
                <span className="ml-1">{getStatusText(selectedOrder.status)}</span>
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Motor Info */}
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={selectedOrder.motorImage}
                    alt={selectedOrder.motorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{selectedOrder.motorName}</h3>
                  <p className="text-sm text-gray-600">Plat: {selectedOrder.plateNumber}</p>
                  <div className="mt-2">
                    <p className="text-2xl text-red-700">{selectedOrder.totalPrice}</p>
                    <p className="text-xs text-gray-500">{selectedOrder.rentalPeriod}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Rental Period */}
            <Card className="p-4">
              <h3 className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-red-700" />
                Periode Rental
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mulai</p>
                  <p className="text-sm">{new Date(selectedOrder.startDate).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Selesai</p>
                  <p className="text-sm">{new Date(selectedOrder.endDate).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>
            </Card>

            {/* Pickup Location */}
            <Card className="p-4">
              <h3 className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-red-700" />
                Lokasi Pengambilan
              </h3>
              <p className="text-sm">{selectedOrder.pickupLocation}</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Lihat di Peta
              </Button>
            </Card>

            {/* Payment Info */}
            <Card className="p-4">
              <h3 className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-red-700" />
                Informasi Pembayaran
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span>{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Pembayaran:</span>
                  <span className="text-red-700">{selectedOrder.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deposit:</span>
                  <span>{selectedOrder.deposit}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Tanggal Booking:</span>
                  <span>{new Date(selectedOrder.bookingDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Hubungi CS
              </Button>
              <Button className="gap-2 bg-red-900 hover:bg-red-800">
                <FileText className="w-4 h-4" />
                Download Invoice
              </Button>
            </div>
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
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Pesanan Saya</h2>
                <p className="text-sm text-red-100">Riwayat & Status Rental</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">
                Aktif ({activeOrders.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingOrders.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Selesai ({completedOrders.length})
              </TabsTrigger>
            </TabsList>

            {/* Active Orders */}
            <TabsContent value="active" className="space-y-4">
              {activeOrders.length > 0 ? (
                activeOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={order.motorImage}
                          alt={order.motorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg">{order.motorName}</h3>
                            <p className="text-xs text-gray-500">{order.id}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{order.rentalPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <span className="text-red-700">{order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Tidak ada pesanan aktif</p>
                </div>
              )}
            </TabsContent>

            {/* Pending Orders */}
            <TabsContent value="pending" className="space-y-4">
              {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={order.motorImage}
                          alt={order.motorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg">{order.motorName}</h3>
                            <p className="text-xs text-gray-500">{order.id}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{order.rentalPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <span className="text-red-700">{order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Tidak ada pesanan pending</p>
                </div>
              )}
            </TabsContent>

            {/* Completed Orders */}
            <TabsContent value="completed" className="space-y-4">
              {completedOrders.length > 0 ? (
                completedOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={order.motorImage}
                          alt={order.motorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg">{order.motorName}</h3>
                            <p className="text-xs text-gray-500">{order.id}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{order.rentalPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <span className="text-red-700">{order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada pesanan selesai</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
