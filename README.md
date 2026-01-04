# 🎉 Plataforma de Eventos

Una plataforma moderna y completa para la gestión de eventos.

## 📋 Descripción

Esta plataforma permite a los usuarios crear, gestionar y participar en eventos de manera sencilla. Incluye funcionalidades como autenticación social, pagos integrados, notificaciones en tiempo real y mucho más.

## 🏗️ Arquitectura

El proyecto está dividido en dos repositorios principales:

```
plataforma-eventos/
├── backend/          # API REST con Node.js y Express
└── frontend/         # Aplicación web con React y Vite
```

## ✨ Características principales

- **Autenticación múltiple**: Email/contraseña, Google y Facebook
- **Gestión de eventos**: Crear, editar, eliminar y buscar eventos
- **Pagos integrados**: Procesamiento seguro con Stripe
- **Tiempo real**: Notificaciones y actualizaciones via WebSockets
- **Notificaciones por email**: Integración con Mailgun
- **API documentada**: Swagger UI para explorar endpoints

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express
- **Base de datos**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Autenticación**: Passport.js + JWT
- **Pagos**: Stripe
- **Email**: Mailgun
- **WebSockets**: Socket.io

### Frontend

- **Build tool**: Vite
- **Framework**: React
- **UI Components**: shadcn/ui
- **Animaciones**: Motion
- **Iconos**: Phosphor Icons
- **Routing**: TanStack Router
- **Formularios**: TanStack Form

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
