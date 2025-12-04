interface CategorySectionProps {
  onCategorySelect: (category: string) => void;
}

export function CategorySection({ onCategorySelect }: CategorySectionProps) {
  const categories = [
    { 
      name: "Motor Biasa", 
      icon: "🛵", 
      color: "bg-green-600",
      description: "Ekonomi",
    },
    { 
      name: "Motor Besar", 
      icon: "🏍️", 
      color: "bg-orange-500",
      description: "Menengah",
    },
    { 
      name: "MOGE", 
      icon: "🏍️", 
      color: "bg-red-700",
      description: "Premium",
    },
  ];

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <h2 className="text-2xl mb-6 text-gray-900">Kategori</h2>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className="flex flex-col items-center group"
          >
            <div
              className={`${category.color} w-24 h-24 rounded-full flex items-center justify-center mb-3 shadow-lg transform transition-all group-hover:scale-110 group-active:scale-95`}
            >
              <span className="text-5xl filter drop-shadow-lg">
                {category.icon}
              </span>
            </div>
            <span className="text-gray-900">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
