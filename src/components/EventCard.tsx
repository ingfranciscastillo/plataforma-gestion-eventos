import { Calendar, MapPin, Users, Euro } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/event";
import { Link } from "@tanstack/react-router";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const spotsLeft = event.capacity - event.registered;
  const fillPercentage = (event.registered / event.capacity) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {event.category}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-bold text-xl line-clamp-2 text-foreground">
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {new Date(event.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - {event.time}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{event.registered} registrados</span>
            <span className="text-xs">
              ({spotsLeft}{" "}
              {spotsLeft === 1 ? "plaza disponible" : "plazas disponibles"})
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-primary h-full transition-all duration-500"
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center gap-1">
          {event.price === 0 ? (
            <span className="font-bold text-lg text-accent">Gratis</span>
          ) : (
            <>
              <Euro className="w-4 h-4 text-muted-foreground" />
              <span className="font-bold text-lg text-foreground">
                {event.price}
              </span>
            </>
          )}
        </div>

        <Link params={{ id: event.id }} to={`/evento/$id`}>
          <Button variant="default" size="sm">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
