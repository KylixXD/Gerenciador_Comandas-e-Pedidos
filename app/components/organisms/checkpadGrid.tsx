"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComandas } from "@/app/features/comandas/comandasSlice";
import { fetchAreas } from "@/app/features/areas/areasSlice"; 
import { RootState, AppDispatch } from "@/store";
import { CheckpadCard } from "@/app/components/molecules/checkpadCard";

export function CheckpadGrid() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { data: comandas, loading: loadingComandas, error: errorComandas } = useSelector(
    (state: RootState) => state.comandas
  );

  const { data: areas, loading: loadingAreas, error: errorAreas } = useSelector(
    (state: RootState) => state.areas 
  );

  useEffect(() => {
    if (comandas.length === 0) {
      dispatch(fetchComandas());
    }
    if (areas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [dispatch, comandas.length, areas.length]); 

  if (loadingComandas || loadingAreas) return <p>Carregando dados...</p>;
  
  if (errorComandas) return <p>{errorComandas}</p>;
  if (errorAreas) return <p>{errorAreas}</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-start items-start">
      {comandas.map((comanda) => (
        <CheckpadCard 
          key={comanda.id} 
          comanda={comanda} 
          areas={areas} 
        />
      ))}
    </div>
  );
}