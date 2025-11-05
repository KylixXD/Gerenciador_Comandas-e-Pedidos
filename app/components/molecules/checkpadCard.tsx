// Em 'CheckpadCard.tsx'

"use client";

import {
  MdReceipt,
  MdPhone,
  MdTableRestaurant,
  MdLocationOn,
  MdTimer,
  MdRoomService,
} from "react-icons/md";
import { useMemo } from "react"; // <-- Importe o useMemo
import { Comanda } from "@/app/features/comandas/comandasSlice";
import { Area } from "@/app/features/areas/areasSlice"; // <-- Importe a interface Area
import { getInitialsName } from "@/app/features/maskData/getInitialsName";
import { toBrazilianCurrencyFromCents } from "@/app/features/maskData/convertMoneyReais";
import { maskForIdleTime } from "@/app/features/maskData/maskForIdleTime";

interface CheckpadCardProps {
  comanda: Comanda;
  areas: Area[]; // <-- Adicione a lista de áreas como prop
  onClick?: () => void;
}

export function CheckpadCard({ comanda, areas, onClick }: CheckpadCardProps) {
  const vazio =
    !comanda.customerName &&
    !comanda.contact &&
    (!comanda.subtotal || comanda.subtotal === 0);

  const nome =
    comanda.customerName ||
    comanda.mainIdentifier ||
    comanda.identifier ||
    `#${comanda.id}`;

  const mesa = comanda.checkpad?.identifier || "—";

  // --- LÓGICA ATUALIZADA ---
  // Encontra o nome da área usando o nome do modelo (ex: "Barraca")
  const areaName = useMemo(() => {
    const modelName = comanda.checkpad?.model;
    if (!modelName || !areas || areas.length === 0) {
      return modelName || "—"; // Retorna o nome do modelo se não achar
    }

    // Encontra a área que contém esse modelo
    const foundArea = areas.find((area) =>
      area.checkpadModels?.some((model) => model.name === modelName)
    );

    // Retorna o nome da área (ex: "Com mesa e flexivel") se achar
    return foundArea ? foundArea.name : modelName || "—";
  }, [comanda.checkpad?.model, areas]);
  // --- FIM DA LÓGICA ---

  return (
    <div
      onClick={onClick}
      className="
        w-[199px] h-[150px]
        rounded-lg p-3
        border cursor-pointer
        flex flex-col justify-between
        shadow-sm hover:shadow-md
        transition-all
        text-black
        box-border
      "
    >
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 text-[16px] font-semibold text-neutral-900">
        <MdReceipt className="text-[18px]" />
        <span>{nome}</span>
      </div>

      {!vazio && (
        <>
          {/* Corpo */}
          <div className="text-[13px] text-neutral-900 space-y-0.5 mt-1">
            {comanda.contact && (
              <div className="flex items-center gap-1">
                <MdPhone size={14} />
                <span>{comanda.contact}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <MdTableRestaurant size={14} />
              <span>Mesa {mesa}</span>
            </div>

            <div className="flex items-center gap-1">
              <MdLocationOn size={14} />
              {/* ATUALIZADO AQUI */}
              <span>{areaName}</span>
            </div>
          </div>

          {/* Rodapé (sem alterações) */}
          <div className="flex items-center justify-between text-[12px] font-medium text-neutral-900 mt-auto">
            {/* ... */}
          </div>
        </>
      )}
    </div>
  );
}