"use client";
import { useState } from "react";
import DropUpActions from "../atoms/dropComponents/dropUpActions";
import DropUpAtendentes from "../atoms/dropComponents/dropUpWaiters";
import DropUpFiltro from "../atoms/dropComponents/dropdownFilters";

export default function FooterComponent() {

  const [selectedStatus, setSelectedStatus] = useState("all"); // Valor padrão do DropUpFiltro
  const [selectedAtendente, setSelectedAtendente] = useState("leonercio"); // Valor padrão do DropUpAtendentes


  return (
    <footer className="w-full flex items-center justify-between px-6 py-3 bg-white border-t">
      
      {/* Left Filters */}
      <div className="flex items-center gap-4">
        
        {/* 4. SUBSTITUÍDO o dropdown de Status pelo componente DropUpFiltro */}
        <DropUpFiltro 
          onSelect={(value) => {
            console.log("Status selecionado:", value);
            setSelectedStatus(value);
          }} 
        />

        {/* 5. SUBSTITUÍDO o dropdown de Waiter pelo componente DropUpAtendentes */}
        <DropUpAtendentes 
          defaultValue={selectedAtendente} // Informa o valor padrão
          onSelect={(value) => {
            console.log("Atendente selecionado:", value);
            setSelectedAtendente(value);
          }} 
        />
      </div>

      {/* Right Buttons (Esta parte já estava correta) */}
      <div className="flex items-center gap-4">
        <DropUpActions onSelect={(v) => console.log("Ação:", v)} />
        <button className="bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700">
          Nova comanda
        </button>
      </div>
    </footer>
  );
}