export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#020306] text-gray-200 flex flex-col">
      {/* Logo en la parte superior */}
      <div className="w-full h-20 flex items-center justify-center border-b border-gray-900/60">
        <div className="text-2xl font-black text-white tracking-widest flex items-center gap-2">
          <span className="text-red-500">S</span>UMI
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Pie de página minimalista */}
      <div className="w-full border-t border-gray-900/60 py-6 px-4 text-center">
        <p className="text-xs text-gray-600 font-medium">
          © 2026 Sumi. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
