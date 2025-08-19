import { useState, useEffect } from "react";

type NewsItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  excerpt: string;
  category: string;
};

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "'Titi' Rodríguez lideró la remontada y el 'Día del hincha' terminó con una sonrisa para Junior",
    subtitle: "El antioqueño marcó los dos goles del equipo barranquillero.",
    image: "/noticias/Tit.jpg",
    date: "19 de agosto, 2025",
    excerpt: "El temor de una nueva derrota con el Metropolitano lleno estaba latente. Pero esta vez, sin desplegar el juego que gusta en su afición, Junior pudo sonreír al vencer 2-1 al Bucaramanga en el 'Día del hincha'. Como se ha vuelto costumbre en los más recientes partidos, en el primer tiempo el equipo barranquillero tuvo un rendimiento irregular...",
    category: "Partido"
  },
  {
    id: "2", 
    title: "Con Junior, Alfredo Arias logra su segundo mejor arranque como técnico en Colombia",
    subtitle: "Tras seis fechas solo es superado por el que tuvo en el Deportivo Cali en el primer semestre de 2021.",
    image: "/noticias/Alfredo.jpg",
    date: "18 de agosto, 2025",
    excerpt: "El arranque de Alfredo Arias como técnico del Junior es el segundo mejor del uruguayo disputadas las seis primeras jornadas de la Liga en su paso por el fútbol colombiano. Con el cuadro tiburón, Arias ha dirigido seis partidos en la Liga y ha sumado 14 puntos, producto de cuatro triunfos y dos empates...",
    category: "Análisis"
  },
  {
    id: "3",
    title: "El Metropolitano explotó de pasión en la celebración de los 101 años del Junior",
    subtitle: "Una noche mágica en el estadio Roberto Meléndez para festejar la historia del club.",
    image: "/noticias/Reina.jpg", 
    date: "17 de agosto, 2025",
    excerpt: "El estadio Metropolitano Roberto Meléndez se transformó este lunes en un templo de fiesta y pasión rojiblanca para celebrar el cumpleaños 101 del Junior de Barranquilla. Desde temprano, una marea de hinchas comenzó a colmar cada rincón del escenario, teñido de rojiblanco, con banderas, cánticos y sonrisas...",
    category: "Celebración"
  }
];

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards] = useState(1); // Una tarjeta visible en móvil, se ajusta en desktop

  // Auto-slide cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = newsItems.length - 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = newsItems.length - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = newsItems.length - 1;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas Noticias
          </h2>
          <p className="text-xl text-gray-600">
            Mantente al día con las novedades del Junior FC
          </p>
        </div>

        {/* Carrusel de noticias */}
        <div className="relative">
          {/* Contenedor principal - responsive */}
          <div className="block md:hidden">
            {/* Vista móvil - una tarjeta */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {newsItems.map((news) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-2">
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vista desktop - tres tarjetas */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* Botones de navegación - solo móvil */}
          <div className="md:hidden">
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center z-10"
              aria-label="Noticia anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center z-10"
              aria-label="Siguiente noticia"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicadores - solo móvil */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-red-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a noticia ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Botón ver más noticias */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
            Ver todas las noticias
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// Componente para cada tarjeta de noticia
function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group cursor-pointer">
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/logo.png"; // Fallback image
          }}
        />
        {/* Overlay con categoría */}
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {news.category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Fecha */}
        <div className="text-sm text-gray-500 mb-3">
          {news.date}
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
          {news.title}
        </h3>

        {/* Subtítulo */}
        <p className="text-sm font-medium text-gray-700 mb-3 line-clamp-2">
          {news.subtitle}
        </p>

        {/* Extracto */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
          {news.excerpt}
        </p>

        {/* Leer más */}
        <div className="flex items-center text-red-600 font-semibold text-sm group-hover:text-red-700">
          <span>Leer más</span>
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}