import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";

const createEventSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  capacity: z.number().min(1, "Debe haber al menos 1 persona"),
  date: z.string().min(1, "La fecha es obligatoria"),
  time: z.string().min(1, "La hora es obligatoria"),
  location: z.string().min(3, "La ubicación es obligatoria"),
  price: z.number().min(0, "El precio no puede ser negativo").optional(),
  organizer: z.string().min(2, "El organizador es obligatorio"),
  image: z.url("Debe ser una URL válida").optional(),
});

export const Route = createFileRoute("/crear-evento")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate({ from: "/crear-evento" });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      capacity: 0,
      date: "",
      time: "",
      location: "",
      price: 0,
      organizer: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("¡Evento creado!", {
        description: "Tu evento ha sido publicado exitosamente.",
      });
      navigate({ to: "/" });
    },
    validators: {
      onSubmit: createEventSchema,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Volver al inicio
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Crear nuevo evento</CardTitle>
          <p className="text-muted-foreground">
            Completa la información para publicar tu evento
          </p>
        </CardHeader>
        <CardContent>
          <form
            id="create-event-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Ej: Conferencia de Innovación Tecnológica 2025"
                        autoComplete="off"
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Describe tu evento, qué aprenderán los asistentes, qué incluye..."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                          required
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <form.Field
                  name="category"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                        <Select
                          name={field.name}
                          value={field.state.value}
                          onValueChange={field.handleChange}
                          required
                        >
                          <SelectTrigger
                            id="select-category"
                            aria-invalid={isInvalid}
                          >
                            <SelectValue placeholder="Selecciona una categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Conferencia">
                              Conferencia
                            </SelectItem>
                            <SelectItem value="Meetup">Meetup</SelectItem>
                            <SelectItem value="Taller">Taller</SelectItem>
                            <SelectItem value="Networking">
                              Networking
                            </SelectItem>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Festival">Festival</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="capacity"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Capacidad</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          aria-invalid={isInvalid}
                          placeholder="Ej: 100"
                          autoComplete="off"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="date"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Fecha:</FieldLabel>
                        <Input
                          type="date"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="time"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Hora:</FieldLabel>
                        <Input
                          type="time"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="location"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Ubicación:</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Ej: Centro de Convenciones Madrid o Online"
                        autoComplete="off"
                        required
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Precio:</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          aria-invalid={isInvalid}
                          placeholder="0.00 (Gratis si es 0)"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="organizer"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Organizador:
                        </FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Nombre del organizador"
                          autoComplete="off"
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Imagen:</FieldLabel>
                      <Input
                        type="file"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Login button not working on mobile"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                      <p className="text-xs text-muted-foreground">
                        Opcional: URL de una imagen representativa del evento
                      </p>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              disabled={isSubmitting}
              form="create-event-form"
            >
              {isSubmitting ? "Publicando..." : "Publicar evento"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reiniciar
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
