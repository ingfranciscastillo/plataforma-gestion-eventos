import { Hero } from "@/components/Hero";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EventCard } from "@/components/EventCard";
import type { EventCategory } from "@/types/event";
import { mockEvents } from "@/types/event";
import FooterSection from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    EventCategory | "Todos"
  >("Todos");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section>
      <Hero onSearch={setSearchQuery} />

      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : selectedCategory === "Todos"
                ? "Todos los eventos"
                : `Eventos: ${selectedCategory}`}
          </h2>
          <p className="text-muted-foreground">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1
              ? "evento encontrado"
              : "eventos encontrados"}
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No se encontraron eventos con esos criterios
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
      <FooterSection />
    </section>
  );
}
