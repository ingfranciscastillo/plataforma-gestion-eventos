import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mockEvents } from "@/types/event";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  MoneyIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useParams, Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/evento/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/evento/$id" });

  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
          <Link to="/">
            <Button variant="default">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.registered;
  const fillPercentage = (event.registered / event.capacity) * 100;

  const handleRegister = () => {
    toast.success("¡Registro exitoso!", {
      description: `Te has registrado para ${event.title}. Recibirás un email de confirmación.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Volver a eventos
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-base px-4 py-2">
              {event.category}
            </Badge>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {event.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">
                Sobre este evento
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Este es un evento único donde podrás conectar con profesionales
                del sector, aprender de expertos y ampliar tu red de contactos.
                No te pierdas esta oportunidad de crecer profesional y
                personalmente.
              </p>
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2 text-foreground">
                  Organizado por
                </h3>
                <p className="text-muted-foreground">{event.organizer}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Fecha</p>
                    <p className="text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Hora</p>
                    <p className="text-muted-foreground">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Ubicación</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UsersIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Asistentes</p>
                    <p className="text-muted-foreground mb-2">
                      {event.registered} de {event.capacity} registrados
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-primary h-full transition-all duration-500"
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {spotsLeft}{" "}
                      {spotsLeft === 1
                        ? "plaza disponible"
                        : "plazas disponibles"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Precio</span>
                  {event.price === 0 ? (
                    <span className="font-bold text-2xl text-accent">
                      Gratis
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <MoneyIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-bold text-2xl text-foreground">
                        {event.price}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleRegister}
                  disabled={spotsLeft === 0}
                >
                  {spotsLeft === 0 ? "Evento completo" : "Registrarse ahora"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Recibirás un email de confirmación después de registrarte
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
