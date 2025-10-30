"use client";

import React from "react";
import { Mesa } from "@/app/features/mesas/mesasSlice";
import {
  MdTableRestaurant,
  MdAccessTime,
  MdPerson,
  MdLocationOn,
  MdTimer,
  MdRoomService,
  MdOutlineAccountCircle,
  MdReceipt,
} from "react-icons/md";
import { AiOutlineTag } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { RiAccountCircleFill } from "react-icons/ri";

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
      <div className="flex items-center gap-2 text-[16px] font-semibold text-gray-800">
        <MdTableRestaurant className="text-[18px]" />
        <span>{mesa.identifier}</span>
      </div>
      {!tableEmpty && (
        <>
          {/* Informações principais */}
          <div className="text-[13px] text-gray-700 space-y-0.5 mt-1">
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
          <div className="flex items-center justify-between text-[12px] font-medium text-gray-800 mt-auto">
            <div className="flex items-center gap-1">
              <MdTimer size={14} />
              <span>{mesa.idleTime ?? 0}min</span>
            </div>
            <div className="flex items-center gap-1">
              <MdRoomService size={14} />
              <span>LG</span>
            </div>
            <div className="font-semibold">
              R$
              {mesa.subtotal?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              }) ?? "0,00"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
