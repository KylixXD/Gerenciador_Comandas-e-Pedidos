import { MagnifyingGlassIcon  } from "@heroicons/react/24/outline";


export  function SearchInput() {
  return (
    <div className="flex items-center bg-white border rounded-md px-3 py-2 shadow-sm">
    <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 mr-2" />
    <input
      type="text"
      placeholder="Cliente, mesa, comanda"
      className="text-sm text-gray-700 outline-none w-48"
    />
  </div>
  )
}
