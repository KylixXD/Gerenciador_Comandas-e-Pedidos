"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMesas } from "@/app/features/mesas/mesasSlice";
import { RootState, AppDispatch } from "@/store/index";
import { TableCard } from "@/app/components/molecules/tableCard";

export function TableGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: mesas, loading, error } = useSelector(
    (state: RootState) => state.mesas
  );

  useEffect(() => {
    dispatch(fetchMesas());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Carregando mesas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!mesas.length) return <p className="text-center text-gray-400">Nenhuma mesa encontrada.</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-start items-start">
      {mesas.map((mesa) => (
        <TableCard
          key={mesa.id}
          mesa={mesa}
          onClick={() => console.log(`Clicou na mesa ${mesa.identifier}`)}
        />
      ))}
    </div>
  );
}

