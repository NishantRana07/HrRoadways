import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 px-4 py-2 rounded-md 
                 bg-gray-300 dark:bg-gray-700 
                 text-gray-900 dark:text-gray-100 
                 transition-colors duration-300"
    >
      {isDarkMode ? (
        <>
          <SunIcon className="h-5 w-5" /> 
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5" /> 
        </>
      )}
    </button>
  );
}
