import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { NumberTicker } from "./ui/number-ticker";

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Increibles", "Nuevos", "Maravillosos"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-white">
              <span className="text-spektr-cyan-50">Descubre eventos</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex gap-2 bg-card/95 backdrop-blur p-2 rounded-lg shadow-glow">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    name="search"
                    placeholder="Buscar eventos por nombre, categoría o ubicación..."
                    className="pl-10 bg-background border-border"
                  />
                </div>
                <Button type="submit" variant="default" size="lg">
                  Buscar
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16 pt-8">
              <div className="text-center">
                <NumberTicker
                  value={500}
                  className="text-3xl md:text-4xl font-bold text-primary-foreground"
                />
                <div className="text-sm text-primary-foreground/80">
                  Eventos
                </div>
              </div>
              <div className="text-center">
                <NumberTicker
                  value={100}
                  className="text-3xl md:text-4xl font-bold text-primary-foreground"
                />
                <div className="text-sm text-primary-foreground/80">
                  Participantes
                </div>
              </div>
              <div className="text-center">
                <NumberTicker
                  value={20}
                  className="text-3xl md:text-4xl font-bold text-primary-foreground"
                />
                <div className="text-sm text-primary-foreground/80">
                  Ciudades
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
    </section>
  );
};
