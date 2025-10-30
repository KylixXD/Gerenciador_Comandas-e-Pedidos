"use client";
import { useState } from "react";

interface ToggleButtonsProps {
  view: "comandas" | "locais";
  setView: (v: "comandas" | "locais") => void;
}

export function ToggleButtons({ view, setView}: ToggleButtonsProps) {
  return (
    <div className="inline-flex bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setView("comandas")}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          view === "comandas"
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Comandas
      </button>
      <button
        onClick={() => setView("locais")}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          view === "locais"
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Locais
      </button>
    </div>
  );
}
