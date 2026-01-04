🔧 Eventos Backend

API REST para la plataforma de gestión de eventos.

## 🚀 Características

- ✅ **Autenticación JWT** + OAuth (Google y Facebook)
- 📅 **CRUD completo de eventos**
- 🎫 **Sistema de registro a eventos**
- 💳 **Integración con Stripe** para eventos premium
- 📧 **Envío de emails** con Mailgun (confirmaciones y recordatorios)
- 🔔 **Notificaciones en tiempo real** con Socket.io
- ⭐ **Sistema de comentarios y valoraciones**
- 🗄️ **PostgreSQL con Drizzle ORM**
- 📚 **Documentación Swagger**
- 🔒 **Validaciones con Zod**

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL (Neon Database)
- **ORM**: Drizzle ORM
- **Autenticación**: JWT + Passport (Google, Facebook)
- **Pagos**: Stripe
- **Emails**: Mailgun
- **WebSockets**: Socket.io
- **Validación**: Zod
- **Documentación**: Swagger

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone [<tu-repo>](https://github.com/ingfranciscastillo/plataforma-gestion-eventos-backend)
cd event-management-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (Neon)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# OAuth Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# OAuth Facebook
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM_EMAIL=noreply@yourdomain.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Configurar la base de datos

#### Crear cuenta en Neon Database

1. Ve a [neon.tech](https://neon.tech)
2. Crea un proyecto y obtén tu `DATABASE_URL`
3. Copia la URL de conexión al archivo `.env`

#### Generar y aplicar migraciones

```bash
# Generar esquema de base de datos
npm run db:generate

# Aplicar migraciones a la base de datos
npm run db:push
```

### 5. Seed de datos (opcional)

Crea usuarios y eventos de ejemplo:

```bash
npm run seed
```

**Usuarios de prueba creados:**

- Email: `juan@example.com` | Password: `password123`
- Email: `maria@example.com` | Password: `password123`
- Email: `carlos@example.com` | Password: `password123`

### 6. Ejecutar el servidor

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Producción
npm run build
npm start
```

El servidor estará disponible en:

- API: `http://localhost:3000`
- Documentación: `http://localhost:3000/api-docs`

## 📚 Documentación de la API

### Autenticación

#### Registro

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Usuario Ejemplo"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Usuario Ejemplo"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### OAuth Google

```http
GET /api/auth/google
```

#### OAuth Facebook

```http
GET /api/auth/facebook
```

#### Obtener perfil

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Eventos

#### Crear evento

```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Workshop de React",
  "description": "Aprende React desde cero",
  "location": "Santo Domingo",
  "startDate": "2024-12-25T10:00:00Z",
  "endDate": "2024-12-25T16:00:00Z",
  "capacity": 50,
  "isPremium": true,
  "price": "25.00",
  "imageUrl": "https://example.com/image.jpg",
  "status": "published"
}
```

#### Obtener todos los eventos

```http
GET /api/events?status=published&upcoming=true
```

#### Obtener evento por ID

```http
GET /api/events/1
```

#### Actualizar evento

```http
PUT /api/events/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo título",
  "capacity": 100
}
```

#### Eliminar evento

```http
DELETE /api/events/1
Authorization: Bearer <token>
```

#### Mis eventos

```http
GET /api/events/my-events
Authorization: Bearer <token>
```

### Registros

#### Registrarse a un evento

```http
POST /api/registrations/event/1
Authorization: Bearer <token>
```

**Respuesta (evento gratuito):**

```json
{
  "message": "Registro confirmado exitosamente",
  "registration": {
    "id": 1,
    "userId": 2,
    "eventId": 1,
    "status": "confirmed",
    "isPaid": true
  }
}
```

**Respuesta (evento premium):**

```json
{
  "message": "Registro iniciado. Completa el pago para confirmar",
  "registration": {
    "id": 1,
    "status": "pending"
  },
  "clientSecret": "pi_xxx_secret_xxx"
}
```

#### Confirmar pago

```http
POST /api/registrations/1/confirm-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx"
}
```

#### Mis registros

```http
GET /api/registrations/my-registrations
Authorization: Bearer <token>
```

#### Cancelar registro

```http
PUT /api/registrations/1/cancel
Authorization: Bearer <token>
```

#### Ver asistentes (solo organizador)

```http
GET /api/registrations/event/1/attendees
Authorization: Bearer <token>
```

### Comentarios

#### Crear comentario

```http
POST /api/comments/event/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "¡Excelente evento! Muy bien organizado.",
  "rating": 5
}
```

#### Obtener comentarios de un evento

```http
GET /api/comments/event/1
```

**Respuesta:**

```json
{
  "comments": [...],
  "averageRating": "4.5",
  "totalComments": 10
}
```

#### Actualizar comentario

```http
PUT /api/comments/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Actualización del comentario",
  "rating": 4
}
```

#### Eliminar comentario

```http
DELETE /api/comments/1
Authorization: Bearer <token>
```

### Notificaciones

#### Obtener mis notificaciones

```http
GET /api/notifications
Authorization: Bearer <token>
```

#### Marcar como leída

```http
PUT /api/notifications/1/read
Authorization: Bearer <token>
```

#### Marcar todas como leídas

```http
PUT /api/notifications/mark-all-read
Authorization: Bearer <token>
```

#### Eliminar notificación

```http
DELETE /api/notifications/1
Authorization: Bearer <token>
```

## 🔌 WebSockets

El servidor Socket.io está disponible en el mismo puerto que la API.

### Conectarse desde el cliente

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Unirse a la sala del usuario
socket.emit("join-room", userId);

// Escuchar eventos
socket.on("event-created", (data) => {
  console.log("Nuevo evento:", data);
});

socket.on("event-updated", (data) => {
  console.log("Evento actualizado:", data);
});

socket.on("registration-confirmed", (data) => {
  console.log("Registro confirmado:", data);
});

socket.on("payment-confirmed", (data) => {
  console.log("Pago confirmado:", data);
});
```

## 💳 Integración con Stripe

### Configuración

1. Crea una cuenta en [stripe.com](https://stripe.com)
2. Obtén tus claves de API (modo test)
3. Agrégalas al archivo `.env`

### Flujo de pago

1. Usuario se registra a evento premium
2. Backend crea un PaymentIntent
3. Frontend recibe el `clientSecret`
4. Usuario completa el pago en el frontend
5. Frontend confirma el pago llamando al endpoint `/confirm-payment`

### Ejemplo con Stripe.js (Frontend)

```javascript
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe("pk_test_...");

// Después de registrarse
const { clientSecret } = await fetch("/api/registrations/event/1", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((r) => r.json());

// Confirmar pago
const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: "Usuario" },
  },
});

if (!error) {
  // Confirmar en el backend
  await fetch(`/api/registrations/${registrationId}/confirm-payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
  });
}
```

## 📧 Emails con Mailgun

El sistema envía emails automáticamente en los siguientes casos:

1. **Confirmación de registro**: Cuando un usuario se registra exitosamente
2. **Recordatorio**: Un día antes del evento
3. **Cancelación**: Cuando un evento es cancelado

Los emails se envían usando templates HTML predefinidos en `src/services/emailService.ts`.

## 🗄️ Base de Datos

### Esquema de tablas

- **users**: Usuarios del sistema
- **events**: Eventos publicados
- **registrations**: Inscripciones a eventos
- **comments**: Comentarios y valoraciones
- **notifications**: Notificaciones de usuarios

### Comandos útiles

```bash
# Ver la base de datos en el navegador
npm run db:studio

# Generar nuevas migraciones
npm run db:generate

# Aplicar migraciones
npm run db:push
```

## 🧪 Testing con Postman/Thunder Client

Importa la siguiente colección de ejemplo:

```json
{
  "name": "Event Management API",
  "requests": [
    {
      "name": "Register",
      "method": "POST",
      "url": "http://localhost:3000/api/auth/register",
      "body": {
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
      }
    },
    {
      "name": "Login",
      "method": "POST",
      "url": "http://localhost:3000/api/auth/login",
      "body": {
        "email": "test@example.com",
        "password": "password123"
      }
    }
  ]
}
```

## 🚨 Manejo de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```json
{
  "error": "Mensaje de error descriptivo",
  "details": [] // Solo en errores de validación
}
```

Códigos de estado HTTP:

- `200`: Éxito
- `201`: Creado
- `400`: Error de validación
- `401`: No autenticado
- `403`: No autorizado
- `404`: No encontrado
- `500`: Error del servidor

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor en modo desarrollo
npm run build        # Compila TypeScript a JavaScript
npm start            # Inicia el servidor en producción
npm run db:generate  # Genera migraciones de Drizzle
npm run db:push      # Aplica migraciones a la base de datos
npm run db:studio    # Abre Drizzle Studio
npm run seed         # Ejecuta el script de seed
```

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt
- Los tokens JWT expiran en 7 días (configurable)
- Las rutas protegidas requieren autenticación
- Validación de datos con Zod
- CORS configurado
- Rate limiting implementado

## 📖 Swagger

La documentación interactiva está disponible en:

```
http://localhost:3000/api-docs
```

Desde ahí puedes probar todos los endpoints directamente.

## 📄 Licencia

MIT

## 🙋‍♂️ Soporte

Si tienes alguna pregunta o problema:

- Abre un issue en GitHub
- Revisa la documentación en `/api-docs`
- Consulta los logs del servidor

---

¡Desarrollado con ❤️ usando Express!
