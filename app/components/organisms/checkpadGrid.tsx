"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComandas } from "@/app/features/comandas/comandasSlice";
import { RootState, AppDispatch } from "@/store";
import { CheckpadCard } from "@/app/components/molecules/checkpadCard";

export function CheckpadGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: comandas, loading, error } = useSelector(
    (state: RootState) => state.comandas
  );

  useEffect(() => {
    dispatch(fetchComandas());
  }, [dispatch]);

  if (loading) return <p>Carregando comandas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {comandas.map((comanda) => (
        <CheckpadCard key={comanda.id} comanda={comanda} />
      ))}
    </div>
  );
}
