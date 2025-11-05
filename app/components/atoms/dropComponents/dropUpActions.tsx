"use client";
import { useState, useRef, useEffect } from "react";

interface ActionOption {
  label: string;
  value: string;
}

const options: ActionOption[] = [
  { label: "Juntar/Transferir", value: "merge" },
  { label: "Histórico", value: "history" },
  { label: "Serviços", value: "services" },
];

interface Props {
  onSelect?: (value: string) => void;
}

export default function DropUpActions({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
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
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="border rounded-md px-4 py-2 bg-white text-sm text-neutral-900 hover:bg-gray-200 flex items-center gap-1"
      >
        Ações
        <span className="text-[10px]">▲</span>
      </button>

      {/* Drop-up menu */}
      {open && (
        <div className="absolute bottom-full mb-2 bg-white text-neutral-900 border shadow-md rounded-md w-40 z-50">
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setSelected(item.value);
                setOpen(false);
                onSelect?.(item.value);
              }}
              className={`w-full text-left px-3 py-2 text-sm ${
                selected === item.value ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
