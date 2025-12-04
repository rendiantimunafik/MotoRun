import { useState } from "react";
import { Header } from "./components/Header";
import { CategorySection } from "./components/CategorySection";
import { ActionButtons } from "./components/ActionButtons";
import { BottomNav } from "./components/BottomNav";
import { MotorcycleListView } from "./components/MotorcycleListView";
import { SearchResults } from "./components/SearchResults";
import { ProfilePage } from "./components/ProfilePage";
import { GPSTracker } from "./components/GPSTracker";
import { EmergencyHelp } from "./components/EmergencyHelp";
import { MyOrders } from "./components/MyOrders";

// Data motor dari semua kategori
const allMotorcycles = [
  // Motor Biasa
  {
    id: 1,
    name: "Honda Beat",
    price: 70000,
    image: "https://i.pinimg.com/736x/d1/1b/5a/d11b5adde286d1261c2dfa95b6f4ae64.jpg?w=400",
    features: ["Automatic", "Hemat BBM", "Nyaman"],
    category: "Motor Biasa",
  },
  {
    id: 2,
    name: "Vario 125",
    price: 85000,
    image: "https://i.pinimg.com/1200x/b1/a4/1f/b1a41f0dc003417db0f0105db0cdb59a.jpg?w=400",
    features: ["125cc", "Stylish", "Irit"],
    category: "Motor Biasa",
  },
  {
    id: 3,
    name: "Scoopy",
    price: 80000,
    image: "https://i.pinimg.com/736x/ec/cb/0e/eccb0e8bd63492a603686dbba4341338.jpg?w=400",
    features: ["Retro Design", "Compact", "Ekonomis"],
    category: "Motor Biasa",
  },
  {
    id: 4,
    name: "Yamaha Mio",
    price: 75000,
    image: "https://i.pinimg.com/736x/81/7a/fe/817afe4911096a00bca3351e36dfe891.jpg?w=400",
    features: ["Sporty", "Ringan", "Lincah"],
    category: "Motor Biasa",
  },
  {
    id: 5,
    name: "Honda Genio",
    price: 90000,
    image: "https://i.pinimg.com/1200x/6e/de/04/6ede045fc8df37969fe9aadebaff3397.jpg?w=400",
    features: ["Modern", "Smart Key", "Premium"],
    category: "Motor Biasa",
  },
  // Motor Besar
  {
    id: 6,
    name: "Yamaha NMAX",
    price: 150000,
    image: "https://i.pinimg.com/736x/37/5a/2f/375a2fb791dac4460d3005e2e1c0ef86.jpg?w=400",
    features: ["ABS", "155cc", "Premium Seat"],
    category: "Motor Besar",
  },
  {
    id: 7,
    name: "Honda PCX",
    price: 160000,
    image: "https://i.pinimg.com/736x/66/4a/aa/664aaa7f1e2f9055fae5f5402ea93068.jpg?w=400",
    features: ["Smart Key", "Luxury", "Spacious"],
    category: "Motor Besar",
  },
  {
    id: 8,
    name: "Honda ADV 160",
    price: 180000,
    image: "https://i.pinimg.com/736x/ce/35/4d/ce354d5c479727576533659cdb355234.jpg?w=400",
    features: ["Adventure", "160cc", "All Terrain"],
    category: "Motor Besar",
  },
  {
    id: 9,
    name: "Yamaha XSR 155",
    price: 200000,
    image: "https://i.pinimg.com/736x/e9/f1/09/e9f1098ce5900239b7bdbf8512aa7882.jpg?w=400",
    features: ["Retro Modern", "155cc", "Stylish"],
    category: "Motor Besar",
  },
  // MOGE
  {
    id: 10,
    name: "Harley-Davidson Street 750",
    price: 800000,
    image: "https://i.pinimg.com/1200x/3f/5c/b8/3f5cb8da0dbbca0629595c969d87cbd9.jpg?w=400",
    features: ["750cc", "Cruiser", "Iconic Design"],
    category: "MOGE",
  },
  {
    id: 11,
    name: "Kawasaki Ninja ZX25R",
    price: 1000000,
    image: "https://i.pinimg.com/1200x/7c/81/ed/7c81edbc49f7da1dd975856ff16c65d0.jpg?w=400",
    features: ["636cc", "Super Sport", "Race Ready"],
    category: "MOGE",
  },
  {
    id: 12,
    name: "Yamaha R6",
    price: 1100000,
    image: "https://i.pinimg.com/736x/99/00/4c/99004ce3694c422192964623f11c15ca.jpg?w=400",
    features: ["600cc", "Track Performance", "Aggressive"],
    category: "MOGE",
  },
  {
    id: 13,
    name: "Honda CB650R",
    price: 900000,
    image: "https://i.pinimg.com/736x/79/bb/d5/79bbd57a871a65891a8885c2ed15a44d.jpg?w=400",
    features: ["650cc", "Neo Sports Café", "Powerful"],
    category: "MOGE",
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "list" | "search" | "profile" | "gps" | "emergency" | "orders">("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTourism, setShowTourism] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView("list");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const handleNavigation = (tab: string) => {
    if (tab === "home") {
      setCurrentView("home");
      setSelectedCategory(null);
      setSearchQuery("");
    } else if (tab === "profile") {
      setCurrentView("profile");
    } else if (tab === "gps") {
      setCurrentView("gps");
    } else if (tab === "emergency") {
      setCurrentView("emergency");
    } else if (tab === "orders") {
      setCurrentView("orders");
    } else if (tab === "tourism") {
      setShowTourism(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView("search");
  };

  const handleRentNow = () => {
    setSearchQuery("");
    setCurrentView("search");
  };

  const handleNotificationNavigate = (destination: string) => {
    if (destination === "orders") {
      setCurrentView("orders");
    } else if (destination === "search") {
      setSearchQuery("");
      setCurrentView("search");
    } else if (destination === "tourism") {
      setShowTourism(true);
    } else if (destination === "emergency") {
      setCurrentView("emergency");
    }
  };

  const filteredMotorcycles = searchQuery
    ? allMotorcycles.filter((motorcycle) =>
        motorcycle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        motorcycle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        motorcycle.features.some((feature) =>
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : allMotorcycles;

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "home" ? (
        <>
          <Header 
            onSearch={handleSearch}
            onNotificationNavigate={handleNotificationNavigate}
          />
          <div className="pb-24">
            <CategorySection onCategorySelect={handleCategorySelect} />
            <ActionButtons 
              onRentNow={handleRentNow}
              showTourismPanel={showTourism}
              onTourismOpen={() => setShowTourism(true)}
              onTourismClose={() => setShowTourism(false)}
            />
          </div>
          <BottomNav activeTab="home" onNavigate={handleNavigation} />
        </>
      ) : currentView === "list" ? (
        <>
          <MotorcycleListView 
            category={selectedCategory || "Motor Biasa"} 
            onBack={handleBackToHome}
          />
          <BottomNav activeTab="home" onNavigate={handleNavigation} />
        </>
      ) : currentView === "search" ? (
        <>
          <SearchResults
            searchQuery={searchQuery}
            motorcycles={filteredMotorcycles}
            onBack={handleBackToHome}
          />
          <BottomNav activeTab="home" onNavigate={handleNavigation} />
        </>
      ) : currentView === "profile" ? (
        <>
          <ProfilePage onClose={handleBackToHome} />
          <BottomNav activeTab="profile" onNavigate={handleNavigation} />
        </>
      ) : currentView === "gps" ? (
        <>
          <GPSTracker onClose={handleBackToHome} />
          <BottomNav activeTab="gps" onNavigate={handleNavigation} />
        </>
      ) : currentView === "emergency" ? (
        <>
          <EmergencyHelp onClose={handleBackToHome} />
          <BottomNav activeTab="emergency" onNavigate={handleNavigation} />
        </>
      ) : currentView === "orders" ? (
        <>
          <MyOrders onClose={handleBackToHome} />
          <BottomNav activeTab="orders" onNavigate={handleNavigation} />
        </>
      ) : null}
    </div>
  );
}