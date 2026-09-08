import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PlannerInputs {
  width: string;
  depth: string;
  budget: string;
  floors: string;
  familySize: string;
  style: "Modern" | "Luxury" | "Traditional" | "Minimalist" | "Japandi" | "Boho Chic";
  region: string;
  roomPriorities: string[];
}

interface Room {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  dimensions: string;
  sqFt: number;
  lightRating: "High" | "Medium" | "Soft";
  recommendedFurniture: string[];
  paintHex: string;
  paintName: string;
  recommendedTrade: string;
}

interface WorkerProfile {
  id: string;
  name: string;
  category: "Architect" | "Carpenter" | "Contractor" | "Electrician" | "Painter" | "Ceiling";
  role: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  dayRate: number;
  location: string;
  avatar: string;
  verified: boolean;
  specialties: string[];
  recentProject: string;
  bio: string;
}

interface SpaceSavingItem {
  id: string;
  name: string;
  category: string;
  spaceSaved: string;
  costEstimate: string;
  description: string;
  bestPlacement: string;
  craftsmanRequired: string;
}

interface ProductMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  dimensions: string;
  spaceFeature: string;
  craftsman: string;
}

// ─── Reveal Hook ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Counter Animation ────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Brand Logo Component ─────────────────────────────────────────────────────
function AuraLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1C1A17" />
        <circle cx="16" cy="20" r="7" stroke="#EFECE6" strokeWidth="2.5" />
        <circle cx="24" cy="20" r="7" stroke="#B88555" strokeWidth="2.5" />
        <path d="M16 13C19.866 13 23 16.134 23 20C23 23.866 19.866 27 16 27" stroke="#EFECE6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="font-display font-bold text-xl tracking-tight text-[#1C1A17]">
        AURA
      </span>
    </div>
  );
}

// ─── Navigation (Floating Pill Style from Screenshot 1) ───────────────────────
function Nav({
  onOpenConsultation,
  onOpenAiStudio,
}: {
  onOpenConsultation: () => void;
  onOpenAiStudio: () => void;
}) {
  const [productDropdown, setProductDropdown] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
      <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-[rgba(28,26,23,0.08)] shadow-md rounded-full px-5 py-3 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand */}
        <AuraLogo />

        {/* Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1C1A17]">
          <div className="relative" onMouseLeave={() => setProductDropdown(false)}>
            <button
              onClick={() => setProductDropdown(!productDropdown)}
              className="flex items-center gap-1.5 hover:text-[#B88555] transition-colors py-1"
            >
              <span>Product</span>
              <span className="text-xs opacity-60">▾</span>
            </button>
            {productDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#FAF8F5] border border-[rgba(28,26,23,0.1)] rounded-xl shadow-lg p-2 space-y-1">
                <a
                  href="#planner"
                  onClick={() => setProductDropdown(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-[#EFECE6] text-xs font-semibold text-[#1C1A17]"
                >
                  AI House Planner (2D Solver)
                </a>
                <a
                  href="#scanner"
                  onClick={() => setProductDropdown(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-[#EFECE6] text-xs font-semibold text-[#1C1A17]"
                >
                  Room &amp; Blueprint Scanner
                </a>
                <button
                  onClick={() => {
                    setProductDropdown(false);
                    onOpenAiStudio();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-lg hover:bg-[#EFECE6] text-xs font-semibold text-[#B88555]"
                >
                  AI Interior Studio ✦
                </button>
              </div>
            )}
          </div>

          <a href="#planner" className="hover:text-[#B88555] transition-colors">
            Planner
          </a>
          <a href="#scanner" className="hover:text-[#B88555] transition-colors">
            Space Optimizer
          </a>
          <a href="#workforce" className="hover:text-[#B88555] transition-colors flex items-center gap-1.5">
            <span>Workforce</span>
            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              Direct Hire
            </span>
          </a>
          <a href="#portfolio" className="hover:text-[#B88555] transition-colors">
            Portfolio
          </a>
          <a href="#services" className="hover:text-[#B88555] transition-colors">
            Services
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAiStudio}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1A17] hover:text-[#B88555] px-3 py-2 transition-colors"
          >
            <span>AI Studio</span>
            <span>↗</span>
          </button>
          <button
            onClick={onOpenConsultation}
            className="bg-[#B88555] hover:bg-[#A07144] text-[#FAF8F5] px-5 py-2.5 rounded-full font-medium text-xs md:text-sm transition-all shadow-sm active:scale-95"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Section (Exact Match to Screenshot 1 with fluted glass) ─────────────
function Hero({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 flex items-center bg-[#EBE5DC]">
      <div className="max-w-7xl mx-auto w-full relative rounded-3xl overflow-hidden shadow-2xl min-h-[640px] md:min-h-[720px] flex flex-col justify-between">
        {/* Background Image: Serene Warm Stone Architecture & Greenery */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&h=1100&fit=crop&auto=format"
            alt="Warm limestone interior with oval stone tub and lush palms"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Subtle warm tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent md:to-black/20" />
        </div>

        {/* Fluted Ribbed Glass Overlay on the Left (from Screenshot 1) */}
        <div className="absolute left-0 top-0 bottom-0 w-full sm:w-2/3 md:w-1/2 fluted-glass fluted-stripes pointer-events-none z-10 opacity-80" />

        {/* Hero Content (Left Column) */}
        <div className="relative z-20 p-8 md:p-16 max-w-xl flex flex-col justify-center flex-1">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-[#FAF8F5] px-3.5 py-1 rounded-full text-xs font-medium w-fit mb-6 border border-white/25">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Spatial Intelligence &amp; In-House Craft</span>
          </div>

          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] tracking-tight">
            Transform Your Space, Transform Your Life
          </h1>

          <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed font-normal">
            Upload your room photo or blueprint. Our neural engine detects space-saving multi-functional elements, generates code-compliant 2D floor plans, and directly pairs you with verified master craftsmen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="bg-white hover:bg-[#FAF8F5] text-[#1C1A17] font-semibold px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 text-sm"
            >
              Schedule a Consultation
            </button>
            <a
              href="#scanner"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium px-6 py-3.5 rounded-xl border border-white/30 transition-all text-sm"
            >
              Scan Room or Blueprint ↓
            </a>
          </div>
        </div>

        {/* Stats on Bottom Right (Exact match to Screenshot 1) */}
        <div className="relative z-20 p-8 md:p-12 self-end w-full flex justify-end">
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 flex flex-wrap items-center gap-8 md:gap-12 text-white">
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold leading-none">100+</div>
              <div className="text-xs text-white/80 font-medium mt-1">Success projects</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold leading-none">300+</div>
              <div className="text-xs text-white/80 font-medium mt-1">Materials</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <div className="font-display text-3xl md:text-4xl font-bold leading-none">100+</div>
              <div className="text-xs text-white/80 font-medium mt-1">Happy customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE A: "Build Interior with AI" Studio (From Screenshot 2) ───────────
const PRODUCT_MARKERS: ProductMarker[] = [
  {
    id: "m1",
    x: 42,
    y: 52,
    title: "L-Shaped Storage Sectional",
    dimensions: "108\" × 64\" with lift-up storage ottoman",
    spaceFeature: "Saves 24 sq ft closet volume • Est. ₹78,000",
    craftsman: "Master Modular Carpenter",
  },
  {
    id: "m2",
    x: 72,
    y: 65,
    title: "Nesting Teak Coffee Table",
    dimensions: "36\" dia (expands to 54\" dual tier)",
    spaceFeature: "Conceals 2 hidden cushioned stools • Est. ₹26,000",
    craftsman: "Master Modular Carpenter",
  },
  {
    id: "m3",
    x: 28,
    y: 38,
    title: "Fluted Oak Media Wall with Secret Pocket Desk",
    dimensions: "96\" W × 84\" H × 14\" D",
    spaceFeature: "Frees up 32 sq ft bedroom work space • Est. ₹85,000",
    craftsman: "Turnkey Civil Contractor",
  },
];

function AiStudioModal({
  isOpen,
  onClose,
  onOpenExport,
  onOpenShare,
  onHireTrade,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenExport: () => void;
  onOpenShare: () => void;
  onHireTrade: (trade: string, context: string) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(3);
  const [prompt, setPrompt] = useState(
    "Transform a realistic, lived-in contemporary living room into boho chic interior design, L-shaped sofa covered with patterned throws and textured pillows, a jute rug on the floor, macrame wall art, warm terracotta and beige color palette, hanging plants and pampas grass in vases, rattan side chair, low wooden table with space-saving nesting stools, fairy lights and lanterns for soft lighting, photorealistic rendering, cinematic mood, extremely high resolution."
  );
  const [selectedStyle, setSelectedStyle] = useState("Boho Chic");
  const [activeMarker, setActiveMarker] = useState<ProductMarker | null>(PRODUCT_MARKERS[0]);
  const [showMarkers, setShowMarkers] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[rgba(28,26,23,0.12)] max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(28,26,23,0.08)] flex items-center justify-between bg-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#28362B] text-white flex items-center justify-center text-sm font-bold">
              ✦
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-[#1C1A17]">Build interior with AI</h2>
              <p className="text-xs text-[#5E5851]">Spatial Room Transformation Engine</p>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                step === 1 ? "border-[#28362B] text-[#28362B]" : "border-transparent text-[#968F85]"
              }`}
            >
              <span>📷</span> <span>Photo</span>
            </button>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                step === 2 ? "border-[#28362B] text-[#28362B]" : "border-transparent text-[#968F85]"
              }`}
            >
              <span>📐</span> <span>Basic info</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                step === 3 ? "border-[#28362B] text-[#28362B]" : "border-transparent text-[#968F85]"
              }`}
            >
              <span>✦</span> <span>AI prompt</span>
            </button>
          </div>

          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#EFECE6] flex items-center justify-center text-xs font-bold text-[#1C1A17] hover:bg-[#E2DDD5]">
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
          {/* Left Column: AI Prompt & Parameters */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851]">
                  AI Synthesis Prompt
                </label>
                <span className="text-[10px] text-[#B88555] font-semibold">Auto-Enhanced</span>
              </div>
              <textarea
                rows={7}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-2xl p-4 text-xs font-normal text-[#1C1A17] leading-relaxed focus:outline-none focus:border-[#28362B] shadow-inner"
              />

              {/* Style Presets Quick Pick */}
              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
                  Style Mood
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Boho Chic", "Modern Minimalist", "Japandi", "Warm Luxury", "Industrial Loft"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedStyle(s);
                        setPrompt(
                          `Transform this room into a tranquil ${s} interior with space-saving modular joinery, natural warm textures, and clutter-free circulation paths.`
                        );
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedStyle === s
                          ? "bg-[#28362B] text-white"
                          : "bg-[#EFECE6] text-[#5E5851] hover:bg-[#E2DDD5]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Marker Details Drawer */}
            {activeMarker && (
              <div className="p-4 bg-[#EFECE6] rounded-2xl border border-[rgba(28,26,23,0.08)]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-[#B88555] font-bold">
                      Interactive Product Tag
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1C1A17]">{activeMarker.title}</h4>
                    <p className="text-xs text-[#5E5851] mt-0.5">{activeMarker.dimensions}</p>
                    <p className="text-xs text-emerald-800 font-semibold mt-1">✓ {activeMarker.spaceFeature}</p>
                  </div>
                  <button
                    onClick={() => onHireTrade(activeMarker.craftsman, activeMarker.title)}
                    className="bg-[#1C1A17] hover:bg-[#B88555] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Hire Craftsman ↗
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[rgba(28,26,23,0.08)]">
              <button
                onClick={onOpenExport}
                className="text-xs font-semibold text-[#1C1A17] hover:text-[#B88555] flex items-center gap-1"
              >
                <span>Export File Options</span>
                <span>↗</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenShare}
                  className="px-3.5 py-2 rounded-xl border border-[rgba(28,26,23,0.2)] text-xs font-semibold text-[#1C1A17] hover:bg-[#EFECE6]"
                >
                  Share
                </button>
                <button
                  onClick={() => alert("AI Concept Re-Synthesized with updated spatial constraints!")}
                  className="px-5 py-2 rounded-xl bg-[#28362B] hover:bg-[#1E2B22] text-white text-xs font-semibold transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Render with Clickable Hotspots */}
          <div className="lg:col-span-7 bg-black rounded-2xl overflow-hidden relative min-h-[380px] shadow-md flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&h=700&fit=crop&auto=format"
              alt="Rendered Boho Chic Interior"
              className="w-full h-full object-cover"
            />

            {/* Clickable Hotspot Markers */}
            {showMarkers &&
              PRODUCT_MARKERS.map((marker) => {
                const isSelected = activeMarker?.id === marker.id;
                return (
                  <button
                    key={marker.id}
                    onClick={() => setActiveMarker(marker)}
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <span className="relative flex h-6 w-6">
                      <span className="pin-pulse absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span
                        className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold shadow-lg transition-transform ${
                          isSelected ? "bg-[#B88555] text-white scale-110" : "bg-white text-[#1C1A17] hover:scale-105"
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                );
              })}

            {/* Marker Visibility Toggle Pill */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[11px] font-medium flex items-center gap-2 border border-white/20">
              <input
                type="checkbox"
                id="markerToggle"
                checked={showMarkers}
                onChange={(e) => setShowMarkers(e.target.checked)}
                className="accent-[#B88555]"
              />
              <label htmlFor="markerToggle" className="cursor-pointer">
                Product markers
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Export This File (From Screenshot 2) ──────────────────────────────
function ExportFileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [format, setFormat] = useState("PDF");
  const [resolution, setResolution] = useState("1920×1080");
  const [markersOverlay, setMarkersOverlay] = useState(true);
  const [includeFurnitureList, setIncludeFurnitureList] = useState(true);
  const [includePrompt, setIncludePrompt] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[rgba(28,26,23,0.12)] max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(28,26,23,0.08)]">
          <h3 className="font-display font-bold text-lg text-[#1C1A17]">Export this file</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#EFECE6] flex items-center justify-center text-xs font-bold text-[#1C1A17]">
            ✕
          </button>
        </div>

        {/* File Settings */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            File settings
          </label>
          <div className="flex gap-2">
            {["PDF", "JPG", "PNG", "TIFF", "WebP"].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  format === f ? "bg-[#28362B] text-white" : "bg-[#EFECE6] text-[#5E5851] hover:bg-[#E2DDD5]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            Resolution
          </label>
          <div className="flex gap-2">
            {["1920×1080", "3840×2160", "Custom"].map((r) => (
              <button
                key={r}
                onClick={() => setResolution(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  resolution === r ? "bg-[#28362B] text-white" : "bg-[#EFECE6] text-[#5E5851] hover:bg-[#E2DDD5]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Overlay product tags */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            Overlay product tags on image
          </label>
          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="overlay"
                checked={markersOverlay}
                onChange={() => setMarkersOverlay(true)}
                className="accent-[#28362B]"
              />
              <span>Show clickable product markers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="overlay"
                checked={!markersOverlay}
                onChange={() => setMarkersOverlay(false)}
                className="accent-[#28362B]"
              />
              <span>Hide all markers</span>
            </label>
          </div>
        </div>

        {/* Additional exports */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            Additional exports
          </label>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFurnitureList}
                onChange={(e) => setIncludeFurnitureList(e.target.checked)}
                className="accent-[#28362B]"
              />
              <span>Include furniture list (.PDF)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrompt}
                onChange={(e) => setIncludePrompt(e.target.checked)}
                className="accent-[#28362B]"
              />
              <span>Include AI prompt used for generation (.TXT)</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-[rgba(28,26,23,0.08)] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5E5851]">
            Cancel
          </button>
          <button
            onClick={() => {
              alert(`Exporting ${format} package (${resolution}) with specifications.`);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#28362B] text-white text-xs font-semibold hover:bg-[#1E2B22]"
          >
            Download Package
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: Share This File (From Screenshot 2) ───────────────────────────────
function ShareFileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("john.coltrane@gmail.com");
  const [permission, setPermission] = useState("View only");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[rgba(28,26,23,0.12)] max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(28,26,23,0.08)]">
          <h3 className="font-display font-bold text-lg text-[#1C1A17]">Share this file</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#EFECE6] flex items-center justify-center text-xs font-bold text-[#1C1A17]">
            ✕
          </button>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            Invite collaborator or contractor
          </label>
          <div className="flex items-center gap-2 bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-xs text-[#1C1A17] bg-transparent focus:outline-none"
            />
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="text-xs bg-[#EFECE6] text-[#1C1A17] rounded-lg px-2 py-1 font-semibold"
            >
              <option value="View only">View only</option>
              <option value="Can edit">Can edit</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
            Quick Assign to Verified In-House Trades
          </label>
          <div className="flex flex-wrap gap-2">
            {["Julian Vance (Carpenter)", "Elena Rostova (Architect)", "Marcus Sterling (Contractor)"].map((p) => (
              <button
                key={p}
                onClick={() => setEmail(`${p.split(" ")[0].toLowerCase()}@auraspaces.com`)}
                className="px-3 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD5] text-xs text-[#1C1A17] font-medium"
              >
                + {p}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[rgba(28,26,23,0.08)] flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5E5851]">
            Cancel
          </button>
          <button
            onClick={() => {
              alert(`Invitation sent to ${email} (${permission}).`);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#28362B] text-white text-xs font-semibold hover:bg-[#1E2B22]"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI HOUSE PLANNER ENGINE (PDF Requirement) ────────────────────────────────
const STYLE_PALETTES = {
  Modern: {
    colors: ["#F4F3EF", "#DFDCD5", "#9D9B96", "#3E3E3C", "#1E1E1D"],
    accent: "#3E3E3C",
    name: "Modern Architectural",
    desc: "Clean planar lines, neutral mineral tones, blackened steel, low-iron glass, and acoustic fluted panels.",
    lighting: "Recessed architectural downlights + flush magnetic linear profiles",
    materials: "Microcement floors, rift-cut white oak, honed basalt stone",
  },
  Luxury: {
    colors: ["#F9F6F0", "#E8D8BA", "#BFA069", "#4A3B2A", "#1D160F"],
    accent: "#BFA069",
    name: "Warm Continental Luxury",
    desc: "Calacatta gold marble, brushed champagne brass, fluted smoked oak, cashmere upholstery, and ambient warm coves.",
    lighting: "Concealed perimeter LED coffer illumination + mouth-blown bronze pendants",
    materials: "Bookmatched porcelain slabs, chevron walnut parquet, Italian nubuck",
  },
  Traditional: {
    colors: ["#F3EEE6", "#D7C2A5", "#9E6D47", "#5B3A1E", "#2D1B0D"],
    accent: "#9E6D47",
    name: "Heritage & Craftsmanship",
    desc: "Warm quarter-sawn oak, earthy lime washes, hand-forged patinated iron, and time-honored joinery detailing.",
    lighting: "Warm dimmable sconces + hand-spun ceramic pendant bowls",
    materials: "Reclaimed European oak, lime plaster walls, terracotta pavers",
  },
  Minimalist: {
    colors: ["#FAFAFA", "#ECEBE6", "#C8C6BE", "#82807A", "#262624"],
    accent: "#82807A",
    name: "Pure Monolithic Minimalist",
    desc: "Zero clutter, seamless hidden storage planes, continuous shadowline trims, and generous natural daylighting.",
    lighting: "Diffused indirect plaster-in architectural coves",
    materials: "Continuous seamless resin floors, matte lacquer, raw linen",
  },
  Japandi: {
    colors: ["#F5F2EB", "#DDD5C7", "#AFA08C", "#6E6152", "#2B2620"],
    accent: "#AFA08C",
    name: "Japandi Organic Harmony",
    desc: "Wabi-sabi balance of Scandinavian ergonomics and Japanese serenity. Low horizontal planes and cedar accents.",
    lighting: "Washi paper lantern sculptures + low-glare floor washes",
    materials: "Hinoki cypress, tatami texture, clay plaster, unbleached wool",
  },
  "Boho Chic": {
    colors: ["#FDFBF7", "#EFE5D9", "#D29B72", "#664228", "#2E1C12"],
    accent: "#D29B72",
    name: "Boho Chic Warmth",
    desc: "Organic rattan, textured macrame, warm terracotta clay, layered pampas greenery, and cozy low seating.",
    lighting: "Woven rattan lanterns + warm 2400K dimmable filaments",
    materials: "Natural jute rugs, solid teak, sun-washed linen, terracotta pavers",
  },
};

const REGION_COST: Record<string, { low: number; mid: number; high: number; label: string; currency: string; rateSymbol: string }> = {
  IN: { low: 1650, mid: 2750, high: 4500, label: "India (INR ₹ / sq ft)", currency: "INR", rateSymbol: "₹" },
  US: { low: 110, mid: 185, high: 295, label: "United States (USD $)", currency: "USD", rateSymbol: "$" },
  UK: { low: 95, mid: 165, high: 270, label: "United Kingdom (GBP £)", currency: "GBP", rateSymbol: "£" },
  EU: { low: 100, mid: 170, high: 260, label: "European Union (EUR €)", currency: "EUR", rateSymbol: "€" },
  AU: { low: 120, mid: 205, high: 320, label: "Australia (AUD A$)", currency: "AUD", rateSymbol: "A$" },
  PH: { low: 2200, mid: 3600, high: 5800, label: "Philippines (PHP ₱)", currency: "PHP", rateSymbol: "₱" },
  UAE: { low: 380, mid: 650, high: 1100, label: "United Arab Emirates (AED)", currency: "AED", rateSymbol: "AED " },
};

function formatCurrencyDisplay(amount: number, regionKey: string): string {
  const reg = REGION_COST[regionKey] || REGION_COST["IN"];
  if (reg.currency === "INR") {
    return "₹" + amount.toLocaleString("en-IN");
  }
  return reg.rateSymbol + amount.toLocaleString("en-US");
}

function formatIndianWords(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}


function generateFloorPlan(
  widthFt: number,
  depthFt: number,
  floors: number,
  familySize: number,
  style: keyof typeof STYLE_PALETTES,
  priorities: string[]
): Room[] {
  const palette = STYLE_PALETTES[style] || STYLE_PALETTES["Modern"];
  const pal = palette.colors;

  const SVG_W = 460;
  const SVG_H = 340;
  const pad = 18;
  const totalW = SVG_W - pad * 2;
  const totalH = SVG_H - pad * 2;

  const bedrooms = Math.min(Math.max(familySize <= 2 ? 1 : familySize <= 4 ? 2 : 3, 1), 3);
  const wantsOffice = priorities.includes("office");
  const wantsLargeKitchen = priorities.includes("kitchen");

  const livingW = Math.round(totalW * (wantsLargeKitchen ? 0.50 : 0.56));
  const kitchenW = totalW - livingW;
  const livingH = Math.round(totalH * 0.44);
  const bathH = Math.round(totalH * 0.22);
  const bedCount = wantsOffice ? bedrooms + 1 : bedrooms;
  const bedH = Math.round((totalH - livingH) / bedCount);
  const bedroomW = Math.round(totalW * 0.56);
  const utilityW = totalW - bedroomW;

  return [
    {
      id: "living",
      label: "Living & Salon",
      x: pad,
      y: pad,
      w: livingW,
      h: livingH,
      color: pal[0],
      dimensions: `${Math.round(widthFt * 0.55)}' × ${Math.round(depthFt * 0.45)}'`,
      sqFt: Math.round(widthFt * 0.55 * depthFt * 0.45),
      lightRating: "High",
      recommendedFurniture: [
        "Low-profile modular sectional with storage base",
        "Cantilevered oak floating media console",
        "Acoustic fluted slats with concealed wire routing",
      ],
      paintHex: pal[0],
      paintName: "Mineral Warm Alabaster",
      recommendedTrade: "Master Modular Carpenter",
    },
    {
      id: "kitchen",
      label: wantsLargeKitchen ? "Chef Island Kitchen" : "Kitchen",
      x: pad + livingW,
      y: pad,
      w: kitchenW,
      h: Math.round(livingH * (wantsLargeKitchen ? 0.65 : 0.55)),
      color: pal[1],
      dimensions: `${Math.round(widthFt * 0.45)}' × ${Math.round(depthFt * 0.26)}'`,
      sqFt: Math.round(widthFt * 0.45 * depthFt * 0.26),
      lightRating: "High",
      recommendedFurniture: [
        "Concealed pocket pantry with slide-in pocket doors",
        "Waterfall quartz island with recessed breakfast bar",
        "Ceiling flush magnetic track profile",
      ],
      paintHex: pal[1],
      paintName: "Travertine Warm Stone",
      recommendedTrade: "Turnkey Civil Contractor",
    },
    {
      id: "dining",
      label: "Dining Zone",
      x: pad + livingW,
      y: pad + Math.round(livingH * (wantsLargeKitchen ? 0.65 : 0.55)),
      w: kitchenW,
      h: livingH - Math.round(livingH * (wantsLargeKitchen ? 0.65 : 0.55)),
      color: pal[2],
      dimensions: `${Math.round(widthFt * 0.45)}' × ${Math.round(depthFt * 0.19)}'`,
      sqFt: Math.round(widthFt * 0.45 * depthFt * 0.19),
      lightRating: "Medium",
      recommendedFurniture: [
        "Telescoping extendable solid oak dining table (seats 4-8)",
        "Nesting cane back dining armchairs",
      ],
      paintHex: pal[2],
      paintName: "Warm Terracotta Sand",
      recommendedTrade: "Interior Space Architect",
    },
    ...Array.from({ length: bedrooms }, (_, i) => ({
      id: `bed-${i + 1}`,
      label: i === 0 ? "Master Suite" : `Bedroom ${i + 1}`,
      x: pad,
      y: pad + livingH + i * bedH,
      w: bedroomW,
      h: bedH,
      color: i === 0 ? pal[3] : pal[4],
      dimensions: `${Math.round(widthFt * 0.56)}' × ${Math.round((depthFt * 0.55) / bedrooms)}'`,
      sqFt: Math.round((widthFt * 0.56 * (depthFt * 0.55)) / bedrooms),
      lightRating: "High" as const,
      recommendedFurniture: [
        "Hydraulic lift under-bed storage frame",
        "Floor-to-ceiling concealed wardrobe with touch latches",
        "Floating nightstands with integrated wireless charging",
      ],
      paintHex: i === 0 ? pal[3] : pal[4],
      paintName: i === 0 ? "Smoked Walnut Accent" : "Soft Linen White",
      recommendedTrade: "Master Modular Carpenter",
    })),
    ...(wantsOffice
      ? [
          {
            id: "office",
            label: "Home Studio",
            x: pad,
            y: pad + livingH + bedrooms * bedH,
            w: bedroomW,
            h: totalH - (livingH + bedrooms * bedH),
            color: pal[1],
            dimensions: `${Math.round(widthFt * 0.56)}' × 8'`,
            sqFt: Math.round(widthFt * 0.56 * 8),
            lightRating: "High" as const,
            recommendedFurniture: [
              "Fold-down wall secretary desk with cable channels",
              "Acoustic felt wall organizer",
            ],
            paintHex: pal[1],
            paintName: "Focus Bone White",
            recommendedTrade: "False Ceiling & Acoustic Specialist",
          },
        ]
      : []),
    {
      id: "bath",
      label: "En-suite Bath",
      x: pad + bedroomW,
      y: pad + livingH,
      w: utilityW,
      h: bathH,
      color: pal[1],
      dimensions: `${Math.round(widthFt * 0.44)}' × 8'`,
      sqFt: Math.round(widthFt * 0.44 * 8),
      lightRating: "Soft",
      recommendedFurniture: [
        "Wall-hung floating double vanity with concealed plumbing",
        "Recessed mirror cabinet with anti-fog demister",
      ],
      paintHex: pal[1],
      paintName: "Waterproof Microcement Warm Grey",
      recommendedTrade: "Turnkey Civil Contractor",
    },
    {
      id: "powder",
      label: "Powder / WC",
      x: pad + bedroomW,
      y: pad + livingH + bathH,
      w: utilityW,
      h: Math.round(bathH * 0.65),
      color: pal[0],
      dimensions: `${Math.round(widthFt * 0.44)}' × 5'`,
      sqFt: Math.round(widthFt * 0.44 * 5),
      lightRating: "Soft",
      recommendedFurniture: ["Concealed in-wall cistern WC", "Compact resin corner handwash basin"],
      paintHex: pal[0],
      paintName: "Pure Chalk",
      recommendedTrade: "Turnkey Civil Contractor",
    },
    {
      id: "outdoor",
      label: floors > 1 ? "Panoramic Balcony" : "Courtyard & Garden",
      x: pad + bedroomW,
      y: pad + livingH + bathH + Math.round(bathH * 0.65),
      w: utilityW,
      h: totalH - (livingH + bathH + Math.round(bathH * 0.65)),
      color: pal[2],
      dimensions: `${Math.round(widthFt * 0.44)}' × 12'`,
      sqFt: Math.round(widthFt * 0.44 * 12),
      lightRating: "High",
      recommendedFurniture: [
        "Folding teak bistro armchairs",
        "Vertical herb trellis planter with drip irrigation",
      ],
      paintHex: pal[2],
      paintName: "Weatherproof Mineral Umber",
      recommendedTrade: "Lime Wash & Paint Artist",
    },
  ];
}

interface PlannerResult {
  inputs: PlannerInputs;
  rooms: Room[];
  totalSqFt: number;
  costLow: number;
  costMid: number;
  costHigh: number;
  flowScore: number;
  palette: (typeof STYLE_PALETTES)["Modern"];
}

function FloorPlanSVG({
  rooms,
  selectedRoom,
  onSelectRoom,
}: {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (r: Room) => void;
}) {
  return (
    <svg
      viewBox="0 0 490 370"
      className="w-full h-auto select-none architect-grid border border-[rgba(28,26,23,0.15)] rounded-2xl bg-[#FAF8F5] shadow-inner"
    >
      <rect x="14" y="14" width="462" height="342" fill="none" stroke="#1C1A17" strokeWidth="2.5" rx="4" />
      <rect x="18" y="18" width="454" height="334" fill="none" stroke="#968F85" strokeWidth="0.75" strokeDasharray="4 2" />

      {rooms.map((r) => {
        const isSelected = selectedRoom?.id === r.id;
        return (
          <g
            key={r.id}
            onClick={() => onSelectRoom(r)}
            className="cursor-pointer transition-transform group"
          >
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={r.color}
              stroke={isSelected ? "#B88555" : "#1C1A17"}
              strokeWidth={isSelected ? "2.5" : "1"}
              rx="2"
              className="transition-all duration-200"
              style={{
                fillOpacity: isSelected ? 1 : 0.85,
                filter: isSelected ? "drop-shadow(0 4px 8px rgba(184,133,85,0.25))" : "none",
              }}
            />

            {/* Door swing arc */}
            <path
              d={`M ${r.x + 4} ${r.y + r.h - 4} A 16 16 0 0 1 ${r.x + 20} ${r.y + r.h - 4}`}
              fill="none"
              stroke="#968F85"
              strokeWidth="0.6"
              strokeDasharray="2 1.5"
            />
            <line x1={r.x + 4} y1={r.y + r.h - 4} x2={r.x + 4} y2={r.y + r.h - 20} stroke="#1C1A17" strokeWidth="0.9" />

            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2 - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={r.w < 80 || r.h < 40 ? "7.5" : "9.5"}
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight={isSelected ? "700" : "600"}
              fill={isSelected ? "#B88555" : "#1C1A17"}
            >
              {r.label}
            </text>

            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2 + 9}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={r.w < 80 || r.h < 40 ? "6.5" : "7.5"}
              fontFamily="DM Mono, monospace"
              fill="#5E5851"
            >
              {r.dimensions}
            </text>

            {isSelected && (
              <circle cx={r.x + r.w - 10} cy={r.y + 10} r="4" fill="#B88555" stroke="#FAF8F5" strokeWidth="1" />
            )}
          </g>
        );
      })}

      {/* Compass */}
      <g transform="translate(450, 32)">
        <circle cx="0" cy="0" r="13" fill="#FAF8F5" stroke="#968F85" strokeWidth="0.75" />
        <polygon points="0,-11 3,0 0,2 -3,0" fill="#1C1A17" />
        <text x="0" y="-13" textAnchor="middle" fontSize="7.5" fontFamily="Plus Jakarta Sans" fontWeight="bold" fill="#1C1A17">
          N
        </text>
      </g>
    </svg>
  );
}

function AIPlannerSection({
  onSelectWorkerForRoom,
}: {
  onSelectWorkerForRoom: (trade: string, roomName: string) => void;
}) {
  const [inputs, setInputs] = useState<PlannerInputs>({
    width: "42",
    depth: "32",
    budget: "3500000",
    floors: "2",
    familySize: "4",
    style: "Modern",
    region: "IN",
    roomPriorities: ["kitchen", "office"],
  });

  const [result, setResult] = useState<PlannerResult | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePriority = (p: string) => {
    setInputs((prev) => ({
      ...prev,
      roomPriorities: prev.roomPriorities.includes(p)
        ? prev.roomPriorities.filter((item) => item !== p)
        : [...prev.roomPriorities, p],
    }));
  };

  const handleRegionChange = (newRegion: string) => {
    let adjustedBudget = inputs.budget;
    const currentNum = parseFloat(inputs.budget) || 0;
    if (newRegion === "IN" && (currentNum < 500000 || inputs.region !== "IN")) {
      adjustedBudget = "3500000";
    } else if (newRegion !== "IN" && inputs.region === "IN" && currentNum > 500000) {
      adjustedBudget = "180000";
    }
    setInputs((prev) => ({ ...prev, region: newRegion, budget: adjustedBudget }));
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const w = parseFloat(inputs.width) || 42;
      const d = parseFloat(inputs.depth) || 32;
      const floorsNum = parseInt(inputs.floors) || 2;
      const totalSqFt = Math.round(w * d * floorsNum);
      const reg = REGION_COST[inputs.region] || REGION_COST["IN"];
      const rooms = generateFloorPlan(
        w,
        d,
        floorsNum,
        parseInt(inputs.familySize) || 4,
        inputs.style,
        inputs.roomPriorities
      );

      const newResult: PlannerResult = {
        inputs,
        rooms,
        totalSqFt,
        costLow: Math.round(totalSqFt * reg.low),
        costMid: Math.round(totalSqFt * reg.mid),
        costHigh: Math.round(totalSqFt * reg.high),
        flowScore: 94,
        palette: STYLE_PALETTES[inputs.style] || STYLE_PALETTES["Modern"],
      };

      setResult(newResult);
      setSelectedRoom(rooms[0]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const currentRegion = REGION_COST[inputs.region] || REGION_COST["IN"];

  return (
    <section id="planner" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B88555] font-bold block mb-2">
            Section 01 / Rule-Based Architecture Engine
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#1C1A17] tracking-tight">
            AI House Planner &amp; 2D Layout Solver
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#5E5851] leading-relaxed">
          Input your land plot dimensions, budget, and lifestyle priorities. Our rule-based constraint engine calculates natural daylight, adjacencies, and regional construction estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] p-6 md:p-8 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(28,26,23,0.08)]">
            <span className="font-display font-bold text-sm text-[#1C1A17]">Land &amp; Family Parameters</span>
            <span className="text-xs text-[#B88555] font-mono font-bold">Rule Engine v2.4</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#5E5851] block mb-1">Land Width (ft)</label>
              <input
                type="number"
                value={inputs.width}
                onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 text-sm font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5E5851] block mb-1">Land Depth (ft)</label>
              <input
                type="number"
                value={inputs.depth}
                onChange={(e) => setInputs({ ...inputs, depth: e.target.value })}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#5E5851]">
                  Budget ({currentRegion.currency === "INR" ? "INR ₹" : currentRegion.currency})
                </label>
                {currentRegion.currency === "INR" && (
                  <span className="text-[10px] font-bold text-[#B88555] bg-[#FAF3EC] px-1.5 py-0.5 rounded-md border border-[#B88555]/20">
                    {formatIndianWords(parseFloat(inputs.budget) || 0)}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#968F85]">
                  {currentRegion.rateSymbol}
                </span>
                <input
                  type="number"
                  step={currentRegion.currency === "INR" ? "100000" : "5000"}
                  value={inputs.budget}
                  onChange={(e) => setInputs({ ...inputs, budget: e.target.value })}
                  className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl pl-8 pr-3 py-2 text-sm font-medium focus:outline-none focus:border-[#1C1A17]"
                />
              </div>
              {currentRegion.currency === "INR" && (
                <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-0.5 text-[11px]">
                  <span className="text-[10px] text-[#968F85] font-semibold">Presets:</span>
                  {[
                    { label: "₹25L", val: "2500000" },
                    { label: "₹35L", val: "3500000" },
                    { label: "₹50L", val: "5000000" },
                    { label: "₹75L", val: "7500000" },
                    { label: "₹1Cr", val: "10000000" },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => setInputs({ ...inputs, budget: chip.val })}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                        inputs.budget === chip.val
                          ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                          : "bg-white text-[#5E5851] border-[rgba(28,26,23,0.1)] hover:border-[#1C1A17]"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5E5851] block mb-1">Region / Norms</label>
              <select
                value={inputs.region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 text-sm font-medium"
              >
                {Object.entries(REGION_COST).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#5E5851] block mb-1">Floors</label>
              <select
                value={inputs.floors}
                onChange={(e) => setInputs({ ...inputs, floors: e.target.value })}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 text-sm font-medium"
              >
                <option value="1">1 Floor (Bungalow)</option>
                <option value="2">2 Floors (Duplex)</option>
                <option value="3">3 Floors (Multi-Level)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#5E5851] block mb-1">Family Size</label>
              <select
                value={inputs.familySize}
                onChange={(e) => setInputs({ ...inputs, familySize: e.target.value })}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 text-sm font-medium"
              >
                {["1", "2", "3", "4", "5", "6+"].map((n) => (
                  <option key={n} value={n}>{n} Residents</option>
                ))}
              </select>
            </div>
          </div>

          {/* Style Presets */}
          <div>
            <label className="text-xs font-semibold text-[#5E5851] block mb-1.5">Design Style</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(STYLE_PALETTES) as Array<keyof typeof STYLE_PALETTES>).map((s) => (
                <button
                  key={s}
                  onClick={() => setInputs({ ...inputs, style: s })}
                  className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                    inputs.style === s
                      ? "bg-[#1C1A17] text-white"
                      : "bg-white text-[#5E5851] border border-[rgba(28,26,23,0.1)] hover:border-[#1C1A17]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 bg-[#1C1A17] hover:bg-[#B88555] text-white rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            {loading ? "Synthesizing Space Layout…" : "Generate Concept Layout →"}
          </button>
        </div>

        {/* Display Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <>
              {/* Floor plan card */}
              <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#1C1A17]">2D Concept Floor Plan</h3>
                    <p className="text-xs text-[#5E5851]">Click any room to inspect dimensions &amp; furnishings</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Flow Score: {result.flowScore}%
                  </span>
                </div>

                <FloorPlanSVG
                  rooms={result.rooms}
                  selectedRoom={selectedRoom}
                  onSelectRoom={setSelectedRoom}
                />

                {/* Selected Room Details */}
                {selectedRoom && (
                  <div className="mt-4 p-4 bg-[#EFECE6] rounded-2xl border border-[rgba(28,26,23,0.08)] animate-fadeIn">
                    <div className="flex items-start justify-between pb-3 border-b border-[rgba(28,26,23,0.08)]">
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#1C1A17]">
                          {selectedRoom.label} ({selectedRoom.dimensions} • {selectedRoom.sqFt} sq ft)
                        </h4>
                        <span className="text-xs text-[#B88555] font-medium">Daylight Rating: {selectedRoom.lightRating}</span>
                      </div>
                      <button
                        onClick={() => onSelectWorkerForRoom(selectedRoom.recommendedTrade, selectedRoom.label)}
                        className="text-xs font-semibold bg-[#1C1A17] hover:bg-[#B88555] text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Hire {selectedRoom.recommendedTrade} ↗
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                      <div>
                        <span className="font-bold text-[#5E5851] block mb-1">Space-Saving Furniture Recommendation:</span>
                        <ul className="space-y-1">
                          {selectedRoom.recommendedFurniture.map((f, i) => (
                            <li key={i} className="text-[#1C1A17] flex items-center gap-1.5">
                              <span className="text-[#B88555] font-bold">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-[#5E5851] block mb-1">Wall Spec &amp; Paint Finish:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-7 h-7 rounded-lg border border-black/15 shadow-xs" style={{ background: selectedRoom.paintHex }} />
                          <div>
                            <span className="font-semibold text-[#1C1A17] block">{selectedRoom.paintName}</span>
                            <span className="text-[10px] text-[#968F85] font-mono">{selectedRoom.paintHex}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Regional Cost Breakdown */}
              <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#1C1A17]">
                      Cost Estimation — {currentRegion.label}
                    </h3>
                    <p className="text-xs text-[#5E5851]">
                      Calculated for {result.totalSqFt.toLocaleString()} sq ft total built-up area
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#EFECE6] px-3 py-1 rounded-full text-[#1C1A17]">
                    {result.totalSqFt} sq ft
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#EFECE6] rounded-2xl">
                    <div className="font-display font-bold text-base md:text-lg text-[#1C1A17]">
                      {formatCurrencyDisplay(result.costLow, inputs.region)}
                    </div>
                    {inputs.region === "IN" && (
                      <div className="text-[10px] font-bold text-[#5E5851] bg-white/70 rounded px-1.5 py-0.5 mt-1 inline-block">
                        {formatIndianWords(result.costLow)}
                      </div>
                    )}
                    <div className="text-xs text-[#5E5851] font-medium mt-1">Economy Spec</div>
                    <div className="text-[10px] text-[#968F85]">{currentRegion.rateSymbol}{currentRegion.low}/sq ft</div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border-2 border-[#B88555] rounded-2xl shadow-xs">
                    <div className="font-display font-bold text-base md:text-lg text-[#B88555]">
                      {formatCurrencyDisplay(result.costMid, inputs.region)}
                    </div>
                    {inputs.region === "IN" && (
                      <div className="text-[10px] font-bold text-[#B88555] bg-[#FAF3EC] rounded px-1.5 py-0.5 mt-1 inline-block">
                        {formatIndianWords(result.costMid)}
                      </div>
                    )}
                    <div className="text-xs text-[#B88555] font-bold mt-1">Architectural Standard</div>
                    <div className="text-[10px] text-[#B88555]">{currentRegion.rateSymbol}{currentRegion.mid}/sq ft</div>
                  </div>
                  <div className="p-3 bg-[#EFECE6] rounded-2xl">
                    <div className="font-display font-bold text-base md:text-lg text-[#1C1A17]">
                      {formatCurrencyDisplay(result.costHigh, inputs.region)}
                    </div>
                    {inputs.region === "IN" && (
                      <div className="text-[10px] font-bold text-[#5E5851] bg-white/70 rounded px-1.5 py-0.5 mt-1 inline-block">
                        {formatIndianWords(result.costHigh)}
                      </div>
                    )}
                    <div className="text-xs text-[#5E5851] font-medium mt-1">Bespoke Luxury</div>
                    <div className="text-[10px] text-[#968F85]">{currentRegion.rateSymbol}{currentRegion.high}/sq ft</div>
                  </div>
                </div>

                {/* Budget Comparison Card */}
                {(() => {
                  const b = parseFloat(inputs.budget) || 0;
                  if (!b) return null;
                  const isUnder = b < result.costLow;
                  const isStandard = b >= result.costMid;
                  return (
                    <div className={`mt-3.5 p-3 rounded-xl text-xs flex items-center justify-between ${
                      isUnder
                        ? "bg-amber-50 border border-amber-200 text-amber-900"
                        : "bg-emerald-50 border border-emerald-200 text-emerald-900"
                    }`}>
                      <span>
                        {isUnder ? "⚠️ Budget Notice:" : "✓ Budget Feasibility:"}{" "}
                        Your budget of <strong>{formatCurrencyDisplay(b, inputs.region)}</strong>{" "}
                        {inputs.region === "IN" ? `(${formatIndianWords(b)})` : ""}{" "}
                        {isUnder
                          ? `is under the estimated Economy build cost (${formatCurrencyDisplay(result.costLow, inputs.region)}). Consider optimizing dimensions or selecting Economy finishes.`
                          : isStandard
                          ? `comfortably covers Architectural Standard finishes with full turnkey fit-out!`
                          : `covers Economy Spec construction.`}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Legal Disclaimer */}
              <div className="p-4 bg-[#1C1A17] text-white rounded-2xl text-center text-xs">
                ⚠️ Conceptual Design Output Only — Recommend licensed architect &amp; structural engineer review before construction.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE B: AI SPACE SCANNER & BLUEPRINT OPTIMIZER ─────────────────────────
const PRESET_SPACES = [
  {
    id: "studio",
    title: "Compact Urban Studio (350 sq ft)",
    dimensions: "18' × 19'",
    spaceGained: "+42 sq ft floor space",
    beforeImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=540&fit=crop&auto=format",
    afterImg: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=540&fit=crop&auto=format",
    description: "Cramped single-room studio with bed crowding the central circulation path. Lacks dedicated work & dining space.",
  },
  {
    id: "living",
    title: "Narrow Living Room (16' × 12')",
    dimensions: "16' × 12'",
    spaceGained: "+34 sq ft floor space",
    beforeImg: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=540&fit=crop&auto=format",
    afterImg: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=540&fit=crop&auto=format",
    description: "Awkward long geometry with bulky traditional seating blocking patio access and daylighting.",
  },
];

const SPACE_SAVING_ITEMS: SpaceSavingItem[] = [
  {
    id: "murphy",
    name: "Hydraulic Wall-Bed with Integrated Drop-Down Desk",
    category: "Multi-Functional Joinery",
    spaceSaved: "38 sq ft",
    costEstimate: "₹85,000 - ₹1,45,000",
    description: "During the day, effortlessly folds up flush into a fluted oak panel wall, revealing a 6-foot ergonomic work desk.",
    bestPlacement: "North / Window-adjacent bedroom wall",
    craftsmanRequired: "Master Modular Carpenter",
  },
  {
    id: "sectional",
    name: "3-Piece Modular Sectional with Under-Seat Storage Ottomans",
    category: "Seating & Storage",
    spaceSaved: "24 sq ft",
    costEstimate: "₹65,000 - ₹95,000",
    description: "Reconfigurable modules with pneumatic lift-tops storing spare duvets and cushions out of sight.",
    bestPlacement: "Living room perimeter axis",
    craftsmanRequired: "Master Modular Carpenter",
  },
  {
    id: "pocket-door",
    name: "Concealed Acoustic Pocket Sliding Glass Partition",
    category: "Architectural Hardware",
    spaceSaved: "14 sq ft clearance",
    costEstimate: "₹45,000 - ₹75,000",
    description: "Eliminates conventional door swing radials, allowing 100% unimpeded walking flow.",
    bestPlacement: "Kitchen to dining boundary",
    craftsmanRequired: "Turnkey Civil Contractor",
  },
  {
    id: "floating-credenza",
    name: "Cantilevered Floating Media Credenza & Slatted Wall",
    category: "Vertical Elevation",
    spaceSaved: "18 sq ft clearance",
    costEstimate: "₹52,000 - ₹82,000",
    description: "Hung directly from wall studs. Maintaining continuous floor visibility makes rooms feel 35% larger.",
    bestPlacement: "Primary entertainment wall",
    craftsmanRequired: "Master Modular Carpenter",
  },
];

function SpaceScannerSection({
  onHireTrade,
}: {
  onHireTrade: (trade: string, context: string) => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SPACES[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1200);
  };

  return (
    <section id="scanner" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[rgba(28,26,23,0.1)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B88555] font-bold block mb-2">
            Section 02 / AI Photo &amp; Blueprint Scanner
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#1C1A17] tracking-tight">
            Space-Saving Furniture &amp; Blueprint Detection
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#5E5851] leading-relaxed">
          Upload any photo of your room or an architectural blueprint. Our neural engine maps walls, circulation paths, and automatically suggests fitted space-saving furniture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload & Scenario Picker */}
        <div className="lg:col-span-4 space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 border-2 border-dashed border-[rgba(28,26,23,0.2)] hover:border-[#B88555] bg-[#FAF8F5] rounded-3xl text-center cursor-pointer transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) triggerScan();
              }}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#EFECE6] group-hover:scale-110 flex items-center justify-center mx-auto mb-3 text-[#B88555] font-bold text-xl transition-transform">
              ↑
            </div>
            <h4 className="font-display font-bold text-sm text-[#1C1A17]">Upload Room Photo or Blueprint</h4>
            <p className="text-xs text-[#5E5851] mt-1">Drag and drop JPG, PNG, or Blueprint PDF</p>
            <span className="mt-3 inline-block text-xs font-semibold text-[#B88555]">Browse Files ↗</span>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[rgba(28,26,23,0.08)] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E5851] block mb-2">
              Or Try Pre-Loaded Spaces
            </span>
            {PRESET_SPACES.map((space) => (
              <button
                key={space.id}
                onClick={() => {
                  setSelectedPreset(space);
                  triggerScan();
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all ${
                  selectedPreset.id === space.id
                    ? "bg-[#28362B] text-white border-[#28362B]"
                    : "bg-white text-[#1C1A17] border-[rgba(28,26,23,0.1)] hover:border-[#1C1A17]"
                }`}
              >
                <div className="text-xs font-bold">{space.title}</div>
                <div className={`text-[11px] mt-0.5 ${selectedPreset.id === space.id ? "text-white/80" : "text-[#5E5851]"}`}>
                  {space.spaceGained}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visualizer Before/After Wipe (8 cols) */}
        <div className="lg:col-span-8 bg-[#FAF8F5] p-6 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#1C1A17]">
              Before vs. After Space-Saving Transformation
            </h3>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {selectedPreset.spaceGained}
            </span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md select-none">
            {/* After layer */}
            <img src={selectedPreset.afterImg} alt="Optimized Room" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium z-10">
              AI Space-Saving Concept
            </div>

            {/* Before layer clipped */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img src={selectedPreset.beforeImg} alt="Original Cluttered Room" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: "100%", minWidth: "100%" }} />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                Original Room
              </div>
            </div>

            {/* Slider divider */}
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none z-20" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1C1A17] text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-md">
                ⇄
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          {/* Detected Furniture Items */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#1C1A17] mb-3">
              Detected Modern Space-Saving Interventions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPACE_SAVING_ITEMS.map((item) => (
                <div key={item.id} className="p-4 bg-[#EFECE6] rounded-2xl border border-[rgba(28,26,23,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-display font-bold text-xs text-[#1C1A17]">{item.name}</h5>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.spaceSaved}
                      </span>
                    </div>
                    <p className="text-xs text-[#5E5851] mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[rgba(28,26,23,0.08)] flex items-center justify-between text-xs">
                    <span className="text-[#968F85] font-semibold">{item.costEstimate}</span>
                    <button
                      onClick={() => onHireTrade(item.craftsmanRequired, item.name)}
                      className="font-semibold text-[#B88555] hover:text-[#1C1A17]"
                    >
                      Hire Craftsman ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE C: DIRECT HIRE IN-HOUSE WORKFORCE PLATFORM ───────────────────────
const WORKFORCE_ROSTER: WorkerProfile[] = [
  {
    id: "w1",
    name: "Julian Vance",
    category: "Carpenter",
    role: "Master Architectural Joiner & Modular Cabinetmaker",
    experience: 14,
    rating: 4.98,
    reviewsCount: 142,
    dayRate: 3200,
    location: "Bangalore & Hyderabad",
    avatar: "https://images.unsplash.com/photo-1547609434-b732edfee020?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Murphy Bed Fabrication", "Fluted Oak Paneling", "Concealed Hardware", "Pocket Pantries"],
    recentProject: "Bespoke Walnut Joinery, Indiranagar Residence",
    bio: "Specializing in ultra-compact modular furniture systems and zero-clearance hidden cabinetry.",
  },
  {
    id: "w2",
    name: "Elena Rostova",
    category: "Architect",
    role: "Principal Interior Architect & Spatial Planner",
    experience: 12,
    rating: 4.96,
    reviewsCount: 98,
    dayRate: 5500,
    location: "Mumbai & NCR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Constraint Solving", "Vastu & Code Norms", "Structural Adjacencies", "CAD Feasibility"],
    recentProject: "Duplex Space Expansion & Lightwell, Bandra West",
    bio: "Certified interior architect focused on maximizing usable volume and daylight in compact urban homes.",
  },
  {
    id: "w3",
    name: "Marcus Sterling",
    category: "Contractor",
    role: "Turnkey Civil Contractor & Construction Lead",
    experience: 18,
    rating: 4.94,
    reviewsCount: 215,
    dayRate: 4500,
    location: "Bangalore & Chennai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Drywall Partitions", "Load-Bearing Wall Openings", "On-Time Guarantee", "Site Logistics"],
    recentProject: "Complete 3-Floor Villa Renovation, Whitefield",
    bio: "Oversees turnkey execution from civil masonry to final finishes, guaranteeing strict timeline adherence.",
  },
  {
    id: "w4",
    name: "Devon Chen",
    category: "Electrician",
    role: "Smart Home & Architectural Lighting Specialist",
    experience: 10,
    rating: 4.99,
    reviewsCount: 126,
    dayRate: 2800,
    location: "Hyderabad & Pune",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Magnetic Track Profiles", "Smart Scene Automation", "Concealed LED Coves", "Zero-Footprint Lighting"],
    recentProject: "Architectural Lighting Overhaul, Jubilee Hills",
    bio: "Dedicated to eliminating floor clutter through ceiling-flush magnetic profiles and mood-tuned illumination.",
  },
  {
    id: "w5",
    name: "Sofia Larsson",
    category: "Painter",
    role: "Lime Wash & Venetian Plaster Artist",
    experience: 9,
    rating: 4.97,
    reviewsCount: 88,
    dayRate: 2400,
    location: "Mumbai & Goa",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Microcement Floors", "Roman Clay Walls", "Matte Lime Wash", "Texture Reflection"],
    recentProject: "Wabi-Sabi Plaster Application, Alibaug Villa",
    bio: "Crafting breathable, tactile mineral wall finishes that softly diffuse natural sunlight across living spaces.",
  },
  {
    id: "w6",
    name: "Kavita Nair",
    category: "Ceiling",
    role: "False Ceiling & Acoustic Paneling Craftsman",
    experience: 11,
    rating: 4.95,
    reviewsCount: 104,
    dayRate: 2600,
    location: "Bangalore & Kochi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
    verified: true,
    specialties: ["Drop Shadowline Ceilings", "Slatted Timber Baffles", "Concealed AC Grilles", "Acoustic Attenuation"],
    recentProject: "Minimalist Acoustic Ceiling Integration, Koramangala",
    bio: "Specialist in integrating air-conditioning ducting, curtain pockets, and acoustic damping inside false ceilings.",
  },
];

function WorkforceSection({
  onHireWorker,
}: {
  onHireWorker: (worker: WorkerProfile) => void;
}) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? WORKFORCE_ROSTER : WORKFORCE_ROSTER.filter((w) => w.category === filter);

  return (
    <section id="workforce" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[rgba(28,26,23,0.1)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B88555] font-bold block mb-2">
            Section 03 / In-House Verified Workforce
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#1C1A17] tracking-tight">
            Directly Hire Verified Trades
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#5E5851] leading-relaxed">
          Once satisfied with your AI space design, hire our accredited in-house team directly. No intermediaries — seamless transition from digital blueprint to master craft on site.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Architect", "Carpenter", "Contractor", "Electrician", "Painter", "Ceiling"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === f ? "bg-[#1C1A17] text-white" : "bg-[#FAF8F5] text-[#5E5851] hover:bg-[#EFECE6]"
            }`}
          >
            {f === "All" ? "All Specialists" : `${f}s`}
          </button>
        ))}
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((worker) => (
          <div key={worker.id} className="bg-[#FAF8F5] p-6 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm flex flex-col justify-between hover:border-[#B88555] transition-all hover:shadow-md">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img src={worker.avatar} alt={worker.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display font-bold text-base text-[#1C1A17]">{worker.name}</h4>
                    <span className="text-xs text-[#B88555]">✓</span>
                  </div>
                  <p className="text-xs text-[#B88555] font-medium mt-0.5">{worker.role}</p>
                  <p className="text-xs text-[#968F85] mt-1">
                    ★ {worker.rating} ({worker.reviewsCount} jobs) • {worker.experience} yrs exp
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#5E5851] leading-relaxed mb-4">{worker.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {worker.specialties.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-[#EFECE6] text-[10px] font-medium text-[#1C1A17]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(28,26,23,0.08)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#968F85] block">Day Rate</span>
                <span className="font-display font-bold text-base text-[#1C1A17]">₹{worker.dayRate.toLocaleString("en-IN")} / day</span>
              </div>
              <button
                onClick={() => onHireWorker(worker)}
                className="bg-[#28362B] hover:bg-[#1E2B22] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Hire Directly ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES & PORTFOLIO (DEVUN SPEC) ────────────────────────────────────────
function ServicesAndPortfolio() {
  const SERVICES = [
    {
      num: "01",
      title: "Interior Design & Space Planning",
      desc: "Comprehensive space planning for homes and compact apartments. Visually enlarge rooms with multi-functional furniture.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&h=480&fit=crop&auto=format",
    },
    {
      num: "02",
      title: "Turnkey Renovation & Execution",
      desc: "Full project lifecycle management. We visit the site, inspect construction against AI drawings, and guarantee delivery.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=480&fit=crop&auto=format",
    },
    {
      num: "03",
      title: "Material Selection & Millwork",
      desc: "Curating solid European oak, fluted plaster, and porcelain surfaces to create harmonious, timeless environments.",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&h=480&fit=crop&auto=format",
    },
  ];

  return (
    <section id="services" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-[rgba(28,26,23,0.1)]">
      <div className="mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B88555] font-bold block mb-2">
          Section 04 / Architectural Services
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-[#1C1A17] tracking-tight">
          Crafting Living Environments
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((s) => (
          <div key={s.num} className="bg-[#FAF8F5] p-6 rounded-3xl border border-[rgba(28,26,23,0.08)] shadow-sm space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="font-mono text-xs font-bold text-[#B88555]">{s.num}</span>
            <h3 className="font-display font-bold text-lg text-[#1C1A17]">{s.title}</h3>
            <p className="text-xs text-[#5E5851] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DIRECT HIRE CONSULTATION MODAL ───────────────────────────────────────────
function ConsultationModal({
  isOpen,
  onClose,
  initialWorker,
  context,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialWorker: WorkerProfile | null;
  context?: string;
}) {
  const [workerId, setWorkerId] = useState<string>(initialWorker?.id || WORKFORCE_ROSTER[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [days, setDays] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialWorker) setWorkerId(initialWorker.id);
    setSubmitted(false);
  }, [initialWorker, isOpen]);

  if (!isOpen) return null;

  const current = WORKFORCE_ROSTER.find((w) => w.id === workerId) || WORKFORCE_ROSTER[0];
  const total = current.dayRate * days;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[rgba(28,26,23,0.12)] max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(28,26,23,0.08)]">
          <div>
            <h3 className="font-display font-bold text-xl text-[#1C1A17]">Schedule a Consultation</h3>
            <p className="text-xs text-[#5E5851]">Lock quote with verified in-house craftsmen</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#EFECE6] flex items-center justify-center text-xs font-bold text-[#1C1A17]">
            ✕
          </button>
        </div>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            {context && (
              <div className="p-3 bg-[#EFECE6] rounded-xl text-[#5E5851]">
                Project Scope: <strong className="text-[#1C1A17]">{context}</strong>
              </div>
            )}

            <div>
              <label className="font-bold text-[#5E5851] block mb-1">Select Specialist</label>
              <select
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 font-semibold text-[#1C1A17]"
              >
                {WORKFORCE_ROSTER.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.role}) — ₹{w.dayRate.toLocaleString("en-IN")}/day
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#5E5851] block mb-1">Duration (Days)</label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5 font-semibold text-[#1C1A17]"
                >
                  {[1, 2, 3, 5, 7, 10, 14, 21].map((d) => (
                    <option key={d} value={d}>{d} Days</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-[#5E5851] block mb-1">Est. Labor Total</label>
                <div className="p-2.5 bg-white border border-[rgba(28,26,23,0.15)] rounded-xl font-display font-bold text-sm text-[#B88555]">
                  ₹{total.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#5E5851] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deepika Reddy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5"
                />
              </div>
              <div>
                <label className="font-bold text-[#5E5851] block mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[rgba(28,26,23,0.15)] rounded-xl p-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B88555] hover:bg-[#A07144] text-white rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98"
            >
              Confirm Consultation Booking ↗
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 text-2xl flex items-center justify-center mx-auto font-bold">
              ✓
            </div>
            <h4 className="font-display font-bold text-lg text-[#1C1A17]">Booking Confirmed!</h4>
            <p className="text-xs text-[#5E5851] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. We have assigned <strong>{current.name}</strong> to your project. Our site supervisor will contact you at <strong>{phone}</strong> within 2 hours.
            </p>
            <div className="p-3 bg-[#EFECE6] rounded-xl text-xs font-mono max-w-xs mx-auto text-left">
              Ref: #AURA-IN-{Math.floor(100000 + Math.random() * 900000)} • Total: ₹{total.toLocaleString("en-IN")}
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-xl bg-[#1C1A17] text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1C1A17] text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-lg bg-[#B88555] flex items-center justify-center text-white font-bold text-sm">
                ✦
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-white">AURA</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-xs">
              AI-powered space planning, photo &amp; blueprint optimization, and direct hiring of master interior craftsmen.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">AI Products</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#planner" className="hover:text-white">2D Concept House Planner</a></li>
              <li><a href="#scanner" className="hover:text-white">Room Photo Space Scanner</a></li>
              <li><a href="#scanner" className="hover:text-white">Blueprint CAD Optimizer</a></li>
              <li><a href="#planner" className="hover:text-white">Regional Cost Estimator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">Verified Trades</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#workforce" className="hover:text-white">Master Modular Joiners</a></li>
              <li><a href="#workforce" className="hover:text-white">Interior Space Architects</a></li>
              <li><a href="#workforce" className="hover:text-white">Turnkey Civil Contractors</a></li>
              <li><a href="#workforce" className="hover:text-white">Smart Lighting Engineers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-white mb-3">Studio Contact</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Bangalore • Mumbai • Hyderabad • Delhi NCR<br />
              hello@auraspaces.com<br />
              +91 80 4961 8200
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 AURA Spaces Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Architectural Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APPLICATION COMPONENT ───────────────────────────────────────────────
export default function App() {
  useReveal();

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);
  const [consultationContext, setConsultationContext] = useState<string | undefined>(undefined);

  const [aiStudioOpen, setAiStudioOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleOpenConsultation = (worker?: WorkerProfile, context?: string) => {
    setSelectedWorker(worker || null);
    setConsultationContext(context);
    setConsultationOpen(true);
  };

  const handleHireTrade = (trade: string, context: string) => {
    const match = WORKFORCE_ROSTER.find((w) =>
      w.role.toLowerCase().includes(trade.toLowerCase()) ||
      w.category.toLowerCase().includes(trade.toLowerCase())
    );
    setSelectedWorker(match || null);
    setConsultationContext(context);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EBE5DC]">
      {/* Floating Pill Nav from Screenshot 1 */}
      <Nav
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenAiStudio={() => setAiStudioOpen(true)}
      />

      {/* Hero with Fluted Glass Overlay and Stats from Screenshot 1 */}
      <Hero onOpenConsultation={() => handleOpenConsultation()} />

      {/* Floating Quick Bar for AI Studio */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-30">
        <div className="bg-[#28362B] text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
              ✦
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">AURA AI Interior Studio</h3>
              <p className="text-xs text-white/80">
                Web application that instantly transforms your room into a fully designed, space-saving interior.
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiStudioOpen(true)}
            className="bg-white text-[#1C1A17] font-semibold text-xs px-6 py-3 rounded-full hover:bg-[#FAF8F5] transition-all shadow-md flex-shrink-0"
          >
            Launch AI Studio Studio ↗
          </button>
        </div>
      </div>

      {/* Section 01: Core AI House Planner (from PDF documentation) */}
      <AIPlannerSection
        onSelectWorkerForRoom={(trade, room) =>
          handleHireTrade(trade, `From 2D Floor Plan: ${room}`)
        }
      />

      {/* Section 02: AI Room & Blueprint Scanner with Space-Saving Optimizer */}
      <SpaceScannerSection
        onHireTrade={(trade, context) => handleHireTrade(trade, context)}
      />

      {/* Section 03: Direct Hire Verified In-House Workforce */}
      <WorkforceSection onHireWorker={(w) => handleOpenConsultation(w)} />

      {/* Section 04: Architectural Services & Portfolio */}
      <ServicesAndPortfolio />

      {/* Footer */}
      <Footer />

      {/* Modal: "Build Interior with AI" (Screenshot 2) */}
      <AiStudioModal
        isOpen={aiStudioOpen}
        onClose={() => setAiStudioOpen(false)}
        onOpenExport={() => setExportModalOpen(true)}
        onOpenShare={() => setShareModalOpen(true)}
        onHireTrade={handleHireTrade}
      />

      {/* Modal: Export This File (Screenshot 2) */}
      <ExportFileModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      {/* Modal: Share This File (Screenshot 2) */}
      <ShareFileModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Modal: Schedule a Consultation / Direct Hire */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialWorker={selectedWorker}
        context={consultationContext}
      />
    </div>
  );
}
