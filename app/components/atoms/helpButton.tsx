import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";


export function HelpButton(){
    return(
        <button className="p-2 rounded-md bg-white border shadow-sm hover:bg-gray-50">
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600" />
        </button>
    )
}