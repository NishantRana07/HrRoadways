export default function ThemeWrapper({ children }) {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {children}
    </div>
  );
}
