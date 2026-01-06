export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        {/* Spinning ring */}
        <div className="w-16 h-16 border-4 border-racing-red/20 border-t-racing-red rounded-full animate-spin" />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-racing-red font-bold text-xl">S</span>
        </div>
      </div>
    </div>
  );
}
