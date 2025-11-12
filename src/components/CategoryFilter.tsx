import { Badge } from "@/components/ui/badge";
import type { EventCategory } from "@/types/event";

interface CategoryFilterProps {
  selectedCategory: EventCategory | "Todos";
  onSelectCategory: (category: EventCategory | "Todos") => void;
}

const categories: (EventCategory | "Todos")[] = [
  "Todos",
  "Conferencia",
  "Meetup",
  "Taller",
  "Networking",
  "Webinar",
  "Festival",
];

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-6">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`cursor-pointer px-4 py-2 text-sm transition-all ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
              : "hover:bg-secondary"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};
