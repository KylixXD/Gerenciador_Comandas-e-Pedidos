"use client";

import { FaClock, FaUser, FaTable, FaMoneyBillAlt } from "react-icons/fa";
import { Comanda } from "@/app/features/comandas/comandasSlice"; // importa o tipo
import { MdReceipt } from "react-icons/md";

interface CheckpadCardProps {
  comanda: Comanda;
}

export function CheckpadCard({ comanda }: CheckpadCardProps) {
  return (
    <div className="w-[199px] h-[150px] rounded-lg p-3 border cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md transition-all text-black box-border">
      <div>
        <h2 className="font-bold text-sm flex items-center gap-1">
          <MdReceipt /> {comanda.customerIdentifier || comanda.id}
        </h2>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <FaUser /> {comanda.customerName || "—"}
        </p>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <FaClock /> {comanda.createdAt ? "Ativa" : "—"}
        </p>
      </div>

      <div className="text-xs text-gray-800 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <FaMoneyBillAlt /> R${comanda.subtotal?.toLocaleString() || "0,00"}
        </span>
      </div>
    </div>
  );
}


// "use client";

// import React from "react";
// import { Mesa } from "@/app/features/mesas/mesasSlice";
// import {
//   MdTableRestaurant,
//   MdAccessTime,
//   MdPerson,
//   MdLocationOn,
// } from "react-icons/md";
// import { AiOutlineTag } from "react-icons/ai";
// import { GiCook } from "react-icons/gi";

// interface MesaCardProps {
//   mesa: Mesa;
//   onClick?: () => void;
// }

// export function TableCard({ mesa, onClick }: MesaCardProps) {
//   const statusColor =
//     mesa.activity === "active"
//       ? "border-red-400 bg-red-50"
//       : mesa.activity === "empty"
//       ? "border-green-300 bg-green-50"
//       : "border-gray-200 bg-gray-50";

//   return (
//     <div
//       onClick={onClick}
//       className={`
//         ${statusColor}
//         w-[199px] h-[150px]
//         rounded-[8px] p-[12px]
//         border cursor-pointer
//         flex flex-col justify-between
//         shadow-sm hover:shadow-md
//         transition-all
//         text-black
//         box-border
//       `}
//     >
//       {/* Cabeçalho */}
//       <div className="flex items-center gap-2 text-[16px] font-semibold text-gray-800">
//         <MdTableRestaurant className="text-[18px]" />
//         <span>{mesa.identifier}</span>
//       </div>

//       {/* Informações principais */}
//       <div className="text-[13px] text-gray-700 space-y-[2px] mt-1">
//         <div className="flex items-center gap-1">
//           <AiOutlineTag size={14} />
//           <span>{mesa.customerIdentifier || "—"}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <MdPerson size={14} />
//           <span>{mesa.authorName || "—"}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <MdLocationOn size={14} />
//           <span>{mesa.model || "—"}</span>
//         </div>
//       </div>

//       {/* Rodapé */}
//       <div className="flex items-center justify-between text-[12px] font-medium text-gray-800 mt-auto">
//         <div className="flex items-center gap-1">
//           <MdAccessTime size={14} />
//           <span>{mesa.idleTime ?? 0}min</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <GiCook size={14} />
//           <span>LG</span>
//         </div>
//         <div className="font-semibold">
//           R$ {mesa.subtotal?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) ?? "0,00"}
//         </div>
//       </div>
//     </div>
//   );
// }
