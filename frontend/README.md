# 🎨 Eventos Frontend

Aplicación web moderna para la plataforma de gestión de eventos.

## 🛠️ Tech Stack

| Tecnología      | Uso                     |
| --------------- | ----------------------- |
| Vite            | Build tool y dev server |
| React           | Framework UI            |
| shadcn/ui       | Componentes UI          |
| Motion          | Animaciones             |
| Phosphor Icons  | Sistema de iconos       |
| TanStack Router | Routing type-safe       |
| TanStack Form   | Gestión de formularios  |

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ui/           # Componentes shadcn
│   └── shared/       # Componentes reutilizables
├── features/
│   ├── auth/         # Autenticación
│   ├── events/       # Gestión de eventos
│   └── payments/     # Pagos
├── hooks/            # Custom hooks
├── lib/              # Utilidades y configuración
├── routes/           # Rutas TanStack Router
├── services/         # Llamadas API
├── stores/           # Estado global
├── styles/           # Estilos globales
└── main.tsx          # Entry point
```

## 📦 Componentes principales

### UI Components (shadcn)

```tsx
// Componentes disponibles
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
// ... y más
```

### Iconos (Phosphor)

```tsx
import { Calendar, MapPin, Users, Ticket } from "@phosphor-icons/react";

<Calendar size={24} weight="duotone" />;
```

### Animaciones (Motion)

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
>
  {children}
</motion.div>;
```

## 📄 Licencia

MIT
