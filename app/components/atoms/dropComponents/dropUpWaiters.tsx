// DropUpAtendentes.tsx (Corrigido)

"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/index";
import { fetchComandas, Comanda } from "@/app/features/comandas/comandasSlice"; 

interface AtendenteOption {
  label: string;
  value: string; 
}

interface Props {
  onSelect?: (value: string) => void;
  defaultValue?: string; 
}

export default function DropUpAtendentes({
  onSelect,
  defaultValue,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // --- Lógica do Redux ---
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: comandas, // Lista de todas as comandas
    loading,
    error,
  } = useSelector((state: RootState) => state.comandas); // Assumindo 'comandas' é o nome no root reducer

  // Dispara a busca por comandas (Isso está correto, é um side-effect)
  useEffect(() => {
    if (!loading && comandas.length === 0) {
      dispatch(fetchComandas());
    }
  }, [dispatch, loading, comandas.length]);

  // --- Transformação de Dados (Isso está correto) ---
  const options = useMemo((): AtendenteOption[] => {
    const attendantMap = new Map<number, AtendenteOption>();
    comandas.forEach((comanda: Comanda) => {
      if (comanda.author && comanda.author.id && comanda.author.name) {
        if (!attendantMap.has(comanda.author.id)) {
          attendantMap.set(comanda.author.id, {
            label: comanda.author.name,
            value: String(comanda.author.id),
          });
        }
      }
    });
    return Array.from(attendantMap.values());
  }, [comandas]);

  
  const findOptionByValue = (value: string | null) =>
    options.find((opt) => opt.value === value) || null;

  const [internalSelected, setInternalSelected] = useState<AtendenteOption | null>(null);

  const selected = internalSelected || findOptionByValue(defaultValue || null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getButtonLabel = () => {
    if (loading) return "Carregando...";
    if (error) return "Erro ao buscar";
    if (selected) return selected.label;
    return "Atendentes";
  };

  return (
    <div className="relative w-52" ref={ref}>
      {/* ... (Menu drop-up e estados de loading) ... */}
      
      {open && (
        <div className="absolute bottom-full mb-2 bg-white border shadow-lg rounded-md w-full z-50 overflow-hidden">
          {/* ... (Estados de Loading/Error/Vazio) ... */}
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                // 5. Atualiza o 'internalSelected' quando o usuário clica
                setInternalSelected(item);
                setOpen(false);
                onSelect?.(item.value);
              }}
              // (Isso já funciona com o 'selected' derivado)
              className={`w-full text-left px-4 py-3 text-sm ${
                selected?.value === item.value
                  ? "bg-black text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setOpen((p) => !p)}
        disabled={loading || !!error}
        className="border rounded-md px-4 py-2 bg-white text-neutral-900 text-sm hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-between w-full"
      >
        {getButtonLabel()}
        <span className="text-[10px] ml-1">▲</span>
      </button>
    </div>
  );
}