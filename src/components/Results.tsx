import { useState, useEffect } from "react";

type Match = {
  id: string;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  homeLogo: string;
  awayLogo: string;
  competition: string;
  status: 'finished' | 'upcoming' | 'live';
  venue?: string;
  jornada?: string;
};

const matches: Match[] = [
  // Próximo partido
  {
    id: "1",
    date: "25/08/2025",
    time: "20:00",
    homeTeam: "Millonarios FC",
    awayTeam: "Junior FC",
    homeLogo: "/equipos/Millonarios.png",
    awayLogo: "/logo.png",
    competition: "Liga BetPlay",
    status: "upcoming",
    venue: "El Campín",
    jornada: "Jornada 12"
  },
  // Últimos resultados
  {
    id: "2",
    date: "30/07/2025",
    homeTeam: "Junior FC",
    awayTeam: "Atlético Huila",
    homeScore: 2,
    awayScore: 2,
    homeLogo: "/logo.png",
    awayLogo: "/equipos/atletico-huila-logo.png",
    competition: "Liga BetPlay",
    status: "finished",
    venue: "Metropolitano",
    jornada: "Jornada 11"
  },
  {
    id: "3",
    date: "26/07/2025",
    homeTeam: "Once Caldas",
    awayTeam: "Junior FC",
    homeScore: 2,
    awayScore: 2,
    homeLogo: "/equipos/once-caldas-logo.png",
    awayLogo: "/logo.png",
    competition: "Liga BetPlay",
    status: "finished",
    venue: "Palogrande",
    jornada: "Jornada 10"
  },
  {
    id: "4",
    date: "20/07/2025",
    homeTeam: "Junior FC",
    awayTeam: "Envigado FC",
    homeScore: 1,
    awayScore: 1,
    homeLogo: "/logo.png",
    awayLogo: "/equipos/envigado-logo.png",
    competition: "Liga BetPlay",
    status: "finished",
    venue: "Metropolitano",
    jornada: "Jornada 9"
  },
  {
    id: "5",
    date: "15/07/2025",
    homeTeam: "Junior FC",
    awayTeam: "Boyacá Chicó",
    homeScore: 2,
    awayScore: 0,
    homeLogo: "/logo.png",
    awayLogo: "/equipos/boyaca-chico-logo.png",
    competition: "Liga BetPlay",
    status: "finished",
    venue: "Metropolitano",
    jornada: "Jornada 8"
  }
];

export default function Results() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards] = useState(3); // Número de tarjetas visibles

  // Auto-slide cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = matches.length - visibleCards;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [visibleCards]);

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return `${day}/${months[parseInt(month) - 1]} - 21 HRS`;
  };

  const getResultColor = (match: Match) => {
    if (match.status !== 'finished') return 'text-blue-600';
    
    const isJuniorHome = match.homeTeam.includes('Junior');
    const juniorScore = isJuniorHome ? match.homeScore : match.awayScore;
    const opponentScore = isJuniorHome ? match.awayScore : match.homeScore;
    
    if (juniorScore! > opponentScore!) return 'text-green-600';
    if (juniorScore! < opponentScore!) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getCardBackground = (match: Match) => {
    if (match.status === 'upcoming') return 'bg-gradient-to-br from-blue-900 to-blue-800';
    
    const isJuniorHome = match.homeTeam.includes('Junior');
    const juniorScore = isJuniorHome ? match.homeScore : match.awayScore;
    const opponentScore = isJuniorHome ? match.awayScore : match.homeScore;
    
    if (juniorScore! > opponentScore!) return 'bg-gradient-to-br from-green-700 to-green-600';
    if (juniorScore! < opponentScore!) return 'bg-gradient-to-br from-red-700 to-red-600';
    return 'bg-gradient-to-br from-yellow-600 to-yellow-500';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = matches.length - visibleCards;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = matches.length - visibleCards;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < matches.length - visibleCards;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Calendario de Partidos
          </h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            <img src="/logo.png" alt="Liga BetPlay" className="w-12 h-8 object-contain" />
            <span className="text-lg font-semibold text-gray-700">Liga BetPlay</span>
          </div>
        </div>

        {/* Carrusel de partidos */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                width: `${(matches.length / visibleCards) * 100}%`
              }}
            >
              {matches.map((match, index) => (
                <div 
                  key={match.id}
                  className={`flex-shrink-0 rounded-2xl p-6 text-white shadow-xl ${getCardBackground(match)}`}
                  style={{ width: `${100 / matches.length}%` }}
                >
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold mb-1">{match.jornada}</div>
                    <div className="text-xs opacity-90">{formatDate(match.date)}</div>
                    <div className="text-xs opacity-75 mt-1">{match.venue}</div>
                  </div>

                  {/* Partido */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Equipo local */}
                    <div className="flex flex-col items-center flex-1">
                      <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="w-12 h-12 object-contain mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/logo.png";
                        }}
                      />
                      <span className="text-xs text-center font-medium leading-tight">
                        {match.homeTeam}
                      </span>
                    </div>

                    {/* Resultado */}
                    <div className="flex items-center justify-center px-4">
                      {match.status === 'finished' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{match.homeScore}</span>
                          <span className="text-lg">-</span>
                          <span className="text-2xl font-bold">{match.awayScore}</span>
                        </div>
                      ) : (
                        <div className="text-lg font-semibold">
                          {match.time}
                        </div>
                      )}
                    </div>

                    {/* Equipo visitante */}
                    <div className="flex flex-col items-center flex-1">
                      <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="w-12 h-12 object-contain mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/logo.png";
                        }}
                      />
                      <span className="text-xs text-center font-medium leading-tight">
                        {match.awayTeam}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    {match.status === 'finished' ? (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        Finalizado
                      </span>
                    ) : (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        Próximo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
              canGoPrev 
                ? 'bg-white text-gray-800 hover:bg-gray-100 cursor-pointer' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Partidos anteriores"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
              canGoNext 
                ? 'bg-white text-gray-800 hover:bg-gray-100 cursor-pointer' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Siguientes partidos"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Junior FC está en la <span className="font-bold text-red-600">1ª posición</span> de la Liga BetPlay con{' '}
            <span className="font-bold">17 puntos</span>
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div>
              <span className="font-semibold text-green-600">5</span> Victorias
            </div>
            <div>
              <span className="font-semibold text-yellow-600">2</span> Empates
            </div>
            <div>
              <span className="font-semibold text-red-600">0</span> Derrotas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}