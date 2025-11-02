"use client";

import { Header } from "@/app/components/organisms/headerProject";
import { TableGrid } from "@/app/components/organisms/tableGrid";
import { CheckpadGrid } from "@/app/components/organisms/checkpadGrid";
import { useState } from "react";

export default function HomePage() {
  const [view, setView] = useState<"comandas" | "locais">("comandas");

  return (
    <main className="flex min-h-screen bg-gray-100">
      <aside className="w-20 bg-orange-500" />

      <section className="flex-1 flex flex-col bg-gray-100">
        <Header view={view} setView={setView} />

        <div className="flex-1 overflow-y-auto px-8 py-4">
          {view === "comandas" ? <CheckpadGrid /> : <TableGrid />}
        </div>
      </section>
    </main>
  );
}
