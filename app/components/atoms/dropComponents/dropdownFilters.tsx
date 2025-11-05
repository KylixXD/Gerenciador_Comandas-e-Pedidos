"use client";
import { useState, useRef, useEffect } from "react";

// Interface e opções para o filtro de status
interface StatusOption {
  label: string;
  value: string;
  dotColor?: string; // Classe Tailwind para a cor do ponto
}

const options: StatusOption[] = [
  { label: "Todos os atendimentos", value: "all" },
  { label: "Em atendimento", value: "in_progress", dotColor: "bg-green-500" },
  { label: "Ociosas", value: "idle", dotColor: "bg-red-500" },
  { label: "Sem pedidos", value: "no_orders", dotColor: "bg-orange-400" },
  {
    label: "Disponíveis",
    value: "available",
    dotColor: "border border-gray-400", // Ponto cinza/vazio
  },
];

interface Props {
  onSelect?: (value: string) => void;
}

export default function DropUpFiltro({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  // O estado 'selected' agora guarda o objeto inteiro
  const [selected, setSelected] = useState<StatusOption>(options[0]);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-60" ref={ref}> {/* Ajuste a largura se precisar */}

      {/* Menu drop-up */}
      {open && (
        <div className="absolute bottom-full mb-2 bg-white border shadow-lg rounded-md w-full z-50 overflow-hidden">
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setSelected(item); // Salva o objeto inteiro
                setOpen(false);
                onSelect?.(item.value);
              }}
              className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between ${
                selected.value === item.value
                  ? "bg-black text-white" // Estilo selecionado
                  : "text-neutral-900 hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
              {/* Renderiza o ponto de status */}
              {item.dotColor && (
                <span
                  className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`}
                ></span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Botão principal (o texto muda com a seleção) */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="border rounded-md px-4 py-2 bg-white text-neutral-900 text-sm hover:bg-gray-100 flex items-center justify-between w-full"
      >
        {selected.label}{" "}
        {/* Mostra o label da opção selecionada */}
        <span className="text-[10px] ml-1">▲</span>
      </button>
    </div>
  );
}