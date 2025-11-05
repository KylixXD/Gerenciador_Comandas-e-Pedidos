"use client";

import React from "react";
import { Mesa } from "@/app/features/mesas/mesasSlice";
import {
  MdTableRestaurant,
  MdLocationOn,
  MdTimer,
  MdRoomService,
  MdReceipt,
} from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { maskForIdleTime } from "@/app/features/maskData/maskForIdleTime";
import { getInitialsName } from "@/app/features/maskData/getInitialsName";
import { toBrazilianCurrencyFromCents } from "@/app/features/maskData/convertMoneyReais";

interface MesaCardProps {
  mesa: Mesa;
  onClick?: () => void;
}

export function TableCard({ mesa, onClick }: MesaCardProps) {

  const statusColor =
    mesa.activity === "inactive"
      ? "border-red-400 bg-red-50"
      : mesa.activity === "active"
      ? "border-green-300 bg-green-50"
      : "border-gray-200 bg-gray-50";

   const tableEmpty =
    !mesa.authorName &&
    !mesa.customerIdentifier &&
    (!mesa.subtotal || mesa.subtotal === 0);

  return (
    <div
      onClick={onClick}
      className={`
        ${statusColor}
        w-[199px] h-[150px]
        rounded-lg p-3
        border cursor-pointer
        flex flex-col justify-between
        shadow-sm hover:shadow-md
        transition-all
        text-black
        box-border
      `}
    >
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 text-[16px] font-semibold text-neutral-900">
        <MdTableRestaurant className="text-[18px]" />
        <span>{mesa.identifier}</span>
      </div>
      {!tableEmpty && (
        <>
          {/* Informações principais */}
          <div className="text-[13px] text-neutral-900 space-y-0.5 mt-1">
            <div className="flex items-center gap-1">
              <MdReceipt size={14} />
              <span>{mesa.customerIdentifier || "0"}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiAccountCircleFill size={14} />
              <span>{mesa.authorName || "Não identificado"}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdLocationOn size={14} />
              <span>{mesa.model || "Não identificado"}</span>
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex items-center justify-between text-[12px] font-medium text-neutral-900 mt-auto">
            <div className="flex items-center gap-1">
              <MdTimer size={14} />
              <span>{maskForIdleTime(mesa.idleTime ?? 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdRoomService size={14} />
              <span>{getInitialsName(mesa.authorName)}</span>
            </div>
            <div className="font-semibold">
              <span>{toBrazilianCurrencyFromCents(mesa.subtotal ?? 0)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
