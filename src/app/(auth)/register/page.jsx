import RegistrationForm from "@/components/registerPage/RegistrationForm";

// Architectural SVG Illustration — left hero panel

function ArchitecturalIllustration() {
  return (
    <svg
      viewBox="0 0 500 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[480px]"
      aria-hidden="true"
    >
      {/* ── Blueprint grid ── */}
      <g stroke="#C89B3C" strokeOpacity="0.10" strokeWidth="0.5">
        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((x) => (
          <line key={`gv${x}`} x1={x} y1="0" x2={x} y2="560" />
        ))}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 560].map(
          (y) => (
            <line key={`gh${y}`} x1="0" y1={y} x2="500" y2={y} />
          ),
        )}
      </g>

      {/* ── Main apartment tower (centre) ── */}
      {/* Tower body */}
      <rect
        x="155"
        y="100"
        width="190"
        height="350"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      {/* Mechanical floor lines */}
      {[155, 205, 255, 305, 355, 405].map((y) => (
        <line
          key={`fl${y}`}
          x1="155"
          y1={y}
          x2="345"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
      ))}
      {/* Vertical centre divider */}
      <line
        x1="250"
        y1="100"
        x2="250"
        y2="450"
        stroke="#C89B3C"
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />

      {/* Window grid — left bay */}
      {[115, 165, 215, 265, 315, 365, 415].map((y) => (
        <rect
          key={`wl${y}`}
          x="170"
          y={y}
          width="30"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}
      {/* Window grid — right bay */}
      {[115, 165, 215, 265, 315, 365, 415].map((y) => (
        <rect
          key={`wr${y}`}
          x="300"
          y={y}
          width="30"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}

      {/* Parapet / rooftop band */}
      <rect
        x="155"
        y="84"
        width="190"
        height="18"
        stroke="#C89B3C"
        strokeOpacity="0.5"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Roof masts */}
      <line
        x1="200"
        y1="84"
        x2="200"
        y2="66"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
      <line
        x1="250"
        y1="84"
        x2="250"
        y2="52"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <line
        x1="300"
        y1="84"
        x2="300"
        y2="66"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
      <rect
        x="234"
        y="44"
        width="32"
        height="10"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Penthouse box */}
      <rect
        x="210"
        y="64"
        width="80"
        height="22"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Grand entrance arch */}
      <path
        d="M215 450 L215 490 Q215 510 250 510 Q285 510 285 490 L285 450"
        stroke="#C89B3C"
        strokeOpacity="0.65"
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="215"
        y1="450"
        x2="285"
        y2="450"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.5"
      />
      {/* Door handle */}
      <circle cx="272" cy="482" r="3" fill="#C89B3C" fillOpacity="0.55" />

      {/* Steps */}
      <line
        x1="205"
        y1="513"
        x2="295"
        y2="513"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <line
        x1="198"
        y1="519"
        x2="302"
        y2="519"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.5"
      />
      <line
        x1="192"
        y1="525"
        x2="308"
        y2="525"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />

      {/* ── Corner tick marks on main tower ── */}
      <path
        d="M151 96 L155 96 L155 100"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M345 96 L349 96"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M345 450 L349 450"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M151 450 L155 450 L155 454"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />

      {/* ── Secondary tower (right, recessed) ── */}
      <rect
        x="360"
        y="180"
        width="110"
        height="270"
        stroke="#C89B3C"
        strokeOpacity="0.28"
        strokeWidth="0.7"
        fill="none"
      />
      {[230, 280, 330, 380].map((y) => (
        <line
          key={`rt${y}`}
          x1="360"
          y1={y}
          x2="470"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.15"
          strokeWidth="0.5"
        />
      ))}
      {[190, 240, 290, 340, 390].map((y) =>
        [375, 410, 445].map((x) => (
          <rect
            key={`rb${y}_${x}`}
            x={x}
            y={y}
            width="18"
            height="14"
            rx="1"
            stroke="#C89B3C"
            strokeOpacity="0.28"
            strokeWidth="0.5"
            fill="none"
          />
        )),
      )}

      {/* ── Low villa left ── */}
      <rect
        x="20"
        y="290"
        width="110"
        height="160"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.6"
        fill="none"
      />
      {/* Pitched roof */}
      <polyline
        points="10,290 75,248 140,290"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Villa windows */}
      {[310, 360].map((y) =>
        [35, 75].map((x) => (
          <rect
            key={`vw${y}_${x}`}
            x={x}
            y={y}
            width="24"
            height="20"
            rx="1"
            stroke="#C89B3C"
            strokeOpacity="0.28"
            strokeWidth="0.5"
            fill="none"
          />
        )),
      )}
      {/* Villa door */}
      <rect
        x="57"
        y="390"
        width="26"
        height="60"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M57 390 Q57 380 70 380 Q83 380 83 390"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.5"
        fill="none"
      />

      {/* ── Floor plan panel (bottom-left) ── */}
      <g transform="translate(18, 488)" opacity="0.52">
        <rect
          x="0"
          y="0"
          width="110"
          height="64"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="64"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="36"
          x2="50"
          y2="36"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        {/* Kitchen counter */}
        <rect
          x="6"
          y="6"
          width="20"
          height="26"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="12"
          cy="14"
          r="3"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="22"
          cy="14"
          r="3"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bath */}
        <rect
          x="6"
          y="40"
          width="20"
          height="18"
          rx="3"
          stroke="#C89B3C"
          strokeOpacity="0.25"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bed */}
        <rect
          x="56"
          y="6"
          width="48"
          height="34"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="56"
          y="6"
          width="48"
          height="10"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Living sofa */}
        <rect
          x="56"
          y="48"
          width="48"
          height="12"
          rx="2"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* ── Key motif (bottom-right) ── */}
      <g transform="translate(395, 488)" opacity="0.6">
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="6"
          stroke="#C89B3C"
          strokeOpacity="0.35"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="27"
          y="13"
          width="44"
          height="6"
          rx="1.5"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="55"
          y="7"
          width="5"
          height="12"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="64"
          y="9"
          width="5"
          height="10"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
      </g>

      {/* ── Dimension annotation lines ── */}
      <line
        x1="155"
        y1="540"
        x2="345"
        y2="540"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="155"
        y1="535"
        x2="155"
        y2="545"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />
      <line
        x1="345"
        y1="535"
        x2="345"
        y2="545"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />

      {/* ── Compass rose (top-right) ── */}
      <circle cx="460" cy="60" r="2" fill="#C89B3C" fillOpacity="0.45" />
      <circle
        cx="460"
        cy="60"
        r="10"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        fill="none"
      />
      <line
        x1="460"
        y1="46"
        x2="460"
        y2="74"
        stroke="#C89B3C"
        strokeOpacity="0.22"
        strokeWidth="0.5"
      />
      <line
        x1="446"
        y1="60"
        x2="474"
        y2="60"
        stroke="#C89B3C"
        strokeOpacity="0.22"
        strokeWidth="0.5"
      />
    </svg>
  );
}

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#FCFCFA] flex flex-col lg:flex-row">
      {/* ── LEFT: Architectural Hero ────────────────────────────────────────── */}
      <div
        className="relative hidden lg:w-[52%] lg:flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, #2C3A3C 0%, #3E4E50 50%, #334446 100%)",
        }}
      >
        {/* Top-left corner bracket mark */}
        <div className="absolute top-0 left-0 w-14 h-14 opacity-30">
          <svg viewBox="0 0 56 56" fill="none">
            <path
              d="M0 0 L56 0 L56 3.5 L3.5 3.5 L3.5 56 L0 56 Z"
              fill="#C89B3C"
            />
          </svg>
        </div>
        {/* Bottom-right corner bracket mark */}
        <div className="absolute bottom-0 right-0 w-14 h-14 opacity-20">
          <svg viewBox="0 0 56 56" fill="none">
            <path
              d="M56 56 L0 56 L0 52.5 L52.5 52.5 L52.5 0 L56 0 Z"
              fill="#C89B3C"
            />
          </svg>
        </div>

        {/* Nav bar */}
        <div className="relative z-10 px-8 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#C89B3C] flex items-center justify-center">
              <span className="text-[#C89B3C] font-semibold text-sm leading-none">
                N
              </span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Nestrix
            </span>
          </div>
          <a
            href="/login"
            className="text-xs text-[#C89B3C] border border-[#C89B3C]/50 px-3 py-1.5 hover:border-[#C89B3C] transition-all duration-200 tracking-wide"
          >
            Sign in
          </a>
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
          <ArchitecturalIllustration />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-8 pb-10">
          <div className="w-8 h-px bg-[#C89B3C] mb-5" />
          <h1 className="text-white text-2xl lg:text-[1.65rem] font-semibold leading-snug tracking-tight max-w-xs">
            Start Your
            <br />
            <span className="text-[#C89B3C]">Rental Journey</span>
          </h1>
          <p className="mt-3 text-sm text-white/52 leading-relaxed max-w-[280px]">
            Join Nestrix and explore trusted properties, secure bookings, and
            seamless rental experiences.
          </p>

          {/* Feature pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Verified listings", "Secure payments", "24/7 support"].map(
              (f) => (
                <span
                  key={f}
                  className="text-xs text-[#C89B3C] border border-[#C89B3C]/30 px-2.5 py-1 rounded-[4px]"
                >
                  {f}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Registration Form ────────────────────────────────────────── */}
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
