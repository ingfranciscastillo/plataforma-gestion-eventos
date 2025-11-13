import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  capacity: z.number().min(1, "Debe haber al menos 1 persona"),
  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().min(1, "La hora es obligatoria"),
  location: z.string().min(3, "La ubicación es obligatoria"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  organizer: z.string().min(2, "El organizador es obligatorio"),
  image: z.url("Debe ser una URL válida"),
});

export type CreateEventFormData = z.infer<typeof createEventSchema>;
