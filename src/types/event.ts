export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  capacity: number;
  registered: number;
  image: string;
  organizer: string;
  price: number;
}

export type EventCategory =
  | "Conferencia"
  | "Meetup"
  | "Taller"
  | "Networking"
  | "Webinar"
  | "Festival";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Conferencia de Innovación Tecnológica 2025",
    description:
      "Únete a los líderes de la industria tech para explorar las últimas tendencias en IA, blockchain y desarrollo web. Networking, charlas inspiradoras y más.",
    date: "2025-12-15",
    time: "09:00",
    location: "Centro de Convenciones Madrid",
    category: "Conferencia",
    capacity: 500,
    registered: 342,
    image: "/placeholder.svg",
    organizer: "Tech Community Madrid",
    price: 49.99,
  },
  {
    id: "2",
    title: "Workshop de React y Next.js",
    description:
      "Taller práctico de 4 horas donde aprenderás a construir aplicaciones modernas con React 18 y Next.js 14. Incluye proyecto final.",
    date: "2025-11-28",
    time: "15:00",
    location: "CoWorking Space Barcelona",
    category: "Taller",
    capacity: 30,
    registered: 28,
    image: "/placeholder.svg",
    organizer: "Dev Academy",
    price: 79.99,
  },
  {
    id: "3",
    title: "Meetup de Emprendedores Digitales",
    description:
      "Conecta con otros emprendedores, comparte experiencias y aprende de casos de éxito. Evento informal con networking y bebidas.",
    date: "2025-11-25",
    time: "18:30",
    location: "Startup Hub Valencia",
    category: "Meetup",
    capacity: 80,
    registered: 52,
    image: "/placeholder.svg",
    organizer: "Valencia Emprende",
    price: 0,
  },
  {
    id: "4",
    title: "Festival de Diseño UX/UI 2025",
    description:
      "Dos días completos dedicados al diseño de experiencias de usuario. Talleres, charlas y portfolio reviews con expertos internacionales.",
    date: "2025-12-01",
    time: "10:00",
    location: "Palacio de Congresos Sevilla",
    category: "Festival",
    capacity: 300,
    registered: 187,
    image: "/placeholder.svg",
    organizer: "Design Guild España",
    price: 129.99,
  },
  {
    id: "5",
    title: "Webinar: Marketing Digital en 2025",
    description:
      "Sesión online gratuita sobre las últimas estrategias de marketing digital, SEO, redes sociales y contenido que funcionan en 2025.",
    date: "2025-11-22",
    time: "17:00",
    location: "Online",
    category: "Webinar",
    capacity: 1000,
    registered: 456,
    image: "/placeholder.svg",
    organizer: "Marketing Pros",
    price: 0,
  },
  {
    id: "6",
    title: "Networking Tech & Business",
    description:
      "Evento de networking exclusivo para profesionales tech y business. Ambiente relajado, aperitivos y oportunidades de colaboración.",
    date: "2025-11-30",
    time: "19:00",
    location: "Hotel Renaissance Madrid",
    category: "Networking",
    capacity: 120,
    registered: 95,
    image: "/placeholder.svg",
    organizer: "Business Connect",
    price: 25.0,
  },
];
