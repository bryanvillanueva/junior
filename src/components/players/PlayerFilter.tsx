import { useMemo, useState } from "react";
import PlayerCard from "./PlayerCard";

type Jugador = {
  nombre: string;
  posicion: string;
  numero: number;
  nacionalidad?: string;
  altura_cm?: number;
  peso_kg?: number;
  foto?: string;
  estadisticas: { partidos: number; goles: number; asistencias: number; minutos: number; };
};

export default function PlayerFilter({ jugadores }: { jugadores: Jugador[] }) {
  const [pos, setPos] = useState<string>("Todos");
  const posiciones = useMemo(() => {
    const set = new Set(jugadores.map(j => j.posicion));
    return ["Todos", ...Array.from(set)];
  }, [jugadores]);

  const lista = pos === "Todos" ? jugadores : jugadores.filter(j => j.posicion === pos);

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        {posiciones.map(p => (
          <button
            key={p}
            onClick={() => setPos(p)}
            className={`px-3 py-1 rounded-xl border ${p===pos ? "bg-neutral-100 text-neutral-900 border-neutral-100" : "border-neutral-700 hover:border-neutral-500"}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((p) => <PlayerCard key={`${p.numero}-${p.nombre}`} {...p} />)}
      </div>
    </div>
  );
}
