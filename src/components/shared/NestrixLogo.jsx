const NestrixLogo = () => {
  return (
    <div className="flex items-center gap-2.5">
      {/* Logomark: stylised N inside a box */}
      <div className="w-8 h-8 border border-[#C89B3C] flex items-center justify-center">
        <span className="text-[#C89B3C] font-semibold text-sm tracking-tight leading-none">
          N
        </span>
      </div>
      <span className="text-foreground font-semibold text-lg tracking-tight">
        Nestrix
      </span>
    </div>
  );
};

export default NestrixLogo;
