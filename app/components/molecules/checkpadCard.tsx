"use client";

import {
  MdReceipt,
  MdPhone,
  MdTableRestaurant,
  MdLocationOn,
  MdTimer,
  MdRoomService,
} from "react-icons/md";
import { Comanda } from "@/app/features/comandas/comandasSlice";

interface CheckpadCardProps {
  comanda: Comanda;
  onClick?: () => void;
}

export function CheckpadCard({ comanda, onClick }: CheckpadCardProps) {
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
  const area = comanda.checkpad?.model || "—";

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
              <span>{area}</span>
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex items-center justify-between text-[12px] font-medium text-neutral-900 mt-auto">
            <div className="flex items-center gap-1">
              <MdTimer size={14} />
              <span>{comanda.idleTime ?? 0}min</span>
            </div>
            <div className="flex items-center gap-1">
              <MdRoomService size={14} />
              <span>LG</span>
            </div>
            <div className="font-semibold">
              R$
              {comanda.subtotal?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              }) ?? "0,00"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
