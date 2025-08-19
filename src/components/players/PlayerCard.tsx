import { motion } from "framer-motion";

type Stats = {
  partidos: number; goles: number; asistencias: number; minutos: number;
};

type Props = {
  nombre: string;
  posicion: string;
  numero: number;
  nacionalidad?: string;
  altura_cm?: number;
  peso_kg?: number;
  foto?: string;
  estadisticas: Stats;
};

export default function PlayerCard(props: Props) {
  const { nombre, posicion, numero, nacionalidad, altura_cm, peso_kg, foto, estadisticas } = props;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-2xl bg-neutral-900 border border-neutral-800 p-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={foto ?? "/jugadores/placeholder.jpg"}
          alt={nombre}
          loading="lazy"
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div>
          <h3 className="text-xl font-bold leading-tight">{nombre}</h3>
          <p className="text-sm text-neutral-400">
            #{numero} · {posicion}{nacionalidad ? ` · ${nacionalidad}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <Stat label="Part." value={estadisticas.partidos} />
        <Stat label="Goles" value={estadisticas.goles} />
        <Stat label="Asist." value={estadisticas.asistencias} />
        <Stat label="Min." value={estadisticas.minutos} />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-4 h-1 origin-left bg-gradient-to-r from-red-600 to-white/80 rounded-full"
      />

      <dl className="mt-3 text-xs text-neutral-400 grid grid-cols-2 gap-2">
        {altura_cm ? <div><dt>Altura</dt><dd>{altura_cm} cm</dd></div> : null}
        {peso_kg ? <div><dt>Peso</dt><dd>{peso_kg} kg</dd></div> : null}
      </dl>
    </motion.article>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-neutral-800 p-2">
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-neutral-400">{label}</div>
    </div>
  );
}
