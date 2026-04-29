
const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative w-16 h-16">
        {/* Outer Ring - Spinning and Blurred */}
        <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
        
        {/* Inner Pulsing Core */}
        <div className="absolute inset-2 bg-yellow-400/10 rounded-full backdrop-blur-sm flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Sleek Text with Letter Spacing */}
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-400 animate-pulse">
        System Loading
      </span>
    </div>
  );
};

export default LoadingComponent;