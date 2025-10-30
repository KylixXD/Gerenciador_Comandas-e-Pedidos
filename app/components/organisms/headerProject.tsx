import { DropDown } from "@/app/components/atoms/dropDownAreas";
import { ToggleButtons } from "@/app/components/atoms/toggleButton";
import { SearchInput } from "@/app/components/atoms/searchInput";
import { HelpButton } from "@/app/components/atoms/helpButton";

interface HeaderProps {
  view: "comandas" | "locais";
  setView: (view: "comandas" | "locais") => void;
}

export function Header({ view, setView }: HeaderProps) {
  return (
    <header className="w-full bg-gray-50 border-b">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-2">
          <DropDown />
        </div>

        <div className="flex items-center gap-3">
          {/* 🔸 Agora o Header apenas recebe as props */}
          <ToggleButtons view={view} setView={setView} />
          <SearchInput />
          <HelpButton />
        </div>
      </div>
    </header>
  );
}
