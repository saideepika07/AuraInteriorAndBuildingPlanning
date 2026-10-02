import { useState, useRef } from "react";
import type { HousePlan, FloorBlueprint } from "../data/housePlansData";

interface Blueprint2DViewerProps {
  plan: HousePlan;
  onClose: () => void;
  onRequestConsultation: (plan: HousePlan) => void;
  onOpen3DView: (plan: HousePlan) => void;
}

export default function Blueprint2DViewer({
  plan,
  onClose,
  onRequestConsultation,
  onOpen3DView,
}: Blueprint2DViewerProps) {
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showFurniture, setShowFurniture] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeFloor: FloorBlueprint = plan.floorsData[activeFloorIndex] || plan.floorsData[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.5, Math.max(0.6, Number((prev + delta).toFixed(1)))));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSVG = () => {
    const svgEl = document.getElementById("blueprint-canvas-svg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.name.replace(/\s+/g, "_")}_${activeFloor.floorLevel.replace(/\s+/g, "_")}_Blueprint.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRoomColor = (type: string) => {
    switch (type) {
      case "living":
        return "#EAE6DF";
      case "master_bed":
      case "bedroom":
        return "#F3EFEA";
      case "kitchen":
        return "#E5DFD5";
      case "dining":
        return "#ECE7DE";
      case "bath":
        return "#DEE6E8";
      case "parking":
        return "#DCD8CF";
      case "courtyard":
      case "terrace":
      case "balcony":
        return "#E1E8DC";
      case "utility":
      case "foyer":
        return "#EDE9E1";
      default:
        return "#F6F3ED";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[10000] bg-[#181614]/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-fadeIn select-none ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      <div className="w-full max-w-7xl h-[95vh] bg-[#FAF8F5] border border-[rgba(28,24,20,0.18)] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top CAD Header Bar */}
        <div className="px-5 py-3.5 bg-[#181614] text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#B88555] flex items-center justify-center text-white font-bold text-sm">
              📐
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">{plan.name}</h3>
                <span className="text-[10px] font-mono uppercase bg-[#B88555]/30 text-amber-300 px-2 py-0.5 rounded border border-[#B88555]/50">
                  {plan.variation}
                </span>
                <span className="text-[10px] font-mono text-white/70">
                  {plan.plotSizeSqYd} sq yd ({plan.plotDimensions.lengthFt}&apos; × {plan.plotDimensions.widthFt}&apos;) • {plan.bhk} BHK • {plan.floors}
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono">
                CAD Scale: 1:100 (Architectural Vector) • Built-up: {activeFloor.builtUpAreaSqFt} sq ft • North: 000°
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpen3DView(plan)}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
            >
              <span>3D Visualization</span>
              <span>↗</span>
            </button>

            <button
              onClick={() => onRequestConsultation(plan)}
              className="px-4 py-1.5 rounded-xl bg-[#B88555] hover:bg-[#A07144] text-xs font-semibold text-white shadow-sm transition-all"
            >
              Request Consultation ↗
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-colors ml-2"
              title="Close Blueprint"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Floor Selection & CAD View Options Bar */}
        <div className="px-5 py-2.5 bg-[#EFECE6] border-b border-[rgba(28,24,20,0.08)] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Floor Level Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[rgba(28,24,20,0.1)]">
            <span className="text-[10px] font-mono text-[#8E867B] uppercase px-2">Floor:</span>
            {plan.floorsData.map((f, idx) => (
              <button
                key={f.floorLevel}
                onClick={() => {
                  setActiveFloorIndex(idx);
                  resetView();
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeFloorIndex === idx
                    ? "bg-[#181614] text-white shadow-xs"
                    : "text-[#575149] hover:text-[#181614]"
                }`}
              >
                {f.floorLevel}
              </button>
            ))}
          </div>

          {/* Toggle View Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`px-3 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showDimensions
                  ? "bg-white text-[#181614] border-[#B88555]"
                  : "bg-transparent text-[#8E867B] border-[rgba(28,24,20,0.15)]"
              }`}
            >
              📏 Dimensions {showDimensions ? "ON" : "OFF"}
            </button>

            <button
              onClick={() => setShowFurniture(!showFurniture)}
              className={`px-3 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showFurniture
                  ? "bg-white text-[#181614] border-[#B88555]"
                  : "bg-transparent text-[#8E867B] border-[rgba(28,24,20,0.15)]"
              }`}
            >
              🛋 Furniture {showFurniture ? "ON" : "OFF"}
            </button>

            {/* Zoom & Canvas Controls */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[rgba(28,24,20,0.1)]">
              <button
                onClick={() => handleZoom(-0.2)}
                className="w-7 h-7 rounded-lg hover:bg-[#EFECE6] flex items-center justify-center font-bold text-sm"
                title="Zoom Out"
              >
                -
              </button>
              <span className="w-12 text-center font-mono text-[11px] font-semibold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom(0.2)}
                className="w-7 h-7 rounded-lg hover:bg-[#EFECE6] flex items-center justify-center font-bold text-sm"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={resetView}
                className="px-2 py-1 text-[10px] font-mono text-[#575149] hover:text-[#181614]"
                title="Reset View"
              >
                Reset
              </button>
            </div>

            {/* Print & Download Buttons */}
            <button
              onClick={handleDownloadSVG}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[rgba(28,24,20,0.15)] font-semibold text-xs text-[#181614] transition-colors"
              title="Download Vector SVG Blueprint"
            >
              📥 Download SVG
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[rgba(28,24,20,0.15)] font-semibold text-xs text-[#181614] transition-colors"
              title="Print Architectural Drawing Sheet"
            >
              🖨 Print Sheet
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[rgba(28,24,20,0.15)] text-xs text-[#181614]"
              title="Toggle Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>

        {/* CAD Canvas Area with Pan & Zoom */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 overflow-hidden relative bg-[#F7F4EE] flex items-center justify-center cursor-grab ${
            isPanning ? "cursor-grabbing" : ""
          }`}
          style={{
            backgroundImage: `radial-gradient(rgba(28, 24, 20, 0.12) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        >
          {/* North Direction Compass */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-[rgba(28,24,20,0.15)] shadow-md pointer-events-none flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full border border-[rgba(28,24,20,0.2)] flex items-center justify-center relative">
              <span className="font-mono font-bold text-[10px] text-rose-600 absolute -top-1">N</span>
              <div className="w-0.5 h-6 bg-gradient-to-t from-[#181614] to-rose-600 rounded-full" />
            </div>
            <span className="text-[9px] font-mono text-[#8E867B] uppercase tracking-widest font-bold">North</span>
          </div>

          {/* Scale & Room Legend Bar */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[rgba(28,24,20,0.15)] shadow-md pointer-events-none text-[11px] text-[#575149] space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#181614]">{activeFloor.floorLevel}</span>
              <span>• Built-up: <strong>{activeFloor.builtUpAreaSqFt} sq.ft</strong></span>
              <span>• Carpet: <strong>{activeFloor.carpetAreaSqFt} sq.ft</strong></span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-[#8E867B]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#EAE6DF] border border-[rgba(28,24,20,0.2)]" />
                Living
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F3EFEA] border border-[rgba(28,24,20,0.2)]" />
                Bedrooms
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E5DFD5] border border-[rgba(28,24,20,0.2)]" />
                Kitchen
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DEE6E8] border border-[rgba(28,24,20,0.2)]" />
                Bathrooms
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DCD8CF] border border-[rgba(28,24,20,0.2)]" />
                Parking
              </span>
            </div>
          </div>

          {/* Interactive Transform Container */}
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transition: isPanning ? "none" : "transform 0.15s ease-out",
            }}
            className="w-[840px] h-[560px] p-6 bg-white border-2 border-[#181614] shadow-2xl relative"
          >
            {/* Architectural Border & Title Block */}
            <div className="absolute inset-2 border border-[#181614] pointer-events-none" />
            <div className="absolute inset-3 border border-[rgba(28,24,20,0.3)] border-dashed pointer-events-none" />

            {/* Vector Blueprint Drawing */}
            <svg
              id="blueprint-canvas-svg"
              viewBox="0 0 800 520"
              className="w-full h-full"
            >
              <defs>
                {/* Wall Hatch Pattern */}
                <pattern id="wall-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#181614" strokeWidth="1.2" />
                </pattern>
                {/* Tile Grid for Bath/Utility */}
                <pattern id="bath-tile" width="12" height="12" patternUnits="userSpaceOnUse">
                  <rect width="12" height="12" fill="#DEE6E8" stroke="#BDCCD0" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Setback dashed boundary */}
              <rect
                x="15"
                y="15"
                width="770"
                height="490"
                fill="none"
                stroke="#B88555"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <text x="25" y="30" fill="#B88555" fontSize="10" fontFamily="monospace" fontWeight="bold">
                PLOT BOUNDARY: {plan.plotDimensions.lengthFt}&apos;0&quot; × {plan.plotDimensions.widthFt}&apos;0&quot; ({plan.plotSizeSqYd} SQ. YDS)
              </text>

              {/* Rooms Generation */}
              {activeFloor.rooms.map((room) => {
                const rx = 35 + (room.x / 100) * 730;
                const ry = 40 + (room.y / 100) * 440;
                const rw = (room.w / 100) * 730;
                const rh = (room.h / 100) * 440;
                const color = getRoomColor(room.type);

                return (
                  <g key={room.id} className="transition-opacity hover:opacity-90">
                    {/* Room Wall Footprint */}
                    <rect
                      x={rx}
                      y={ry}
                      width={rw}
                      height={rh}
                      fill={color}
                      stroke="#181614"
                      strokeWidth="2.5"
                    />

                    {/* Inner Accent Line */}
                    <rect
                      x={rx + 3}
                      y={ry + 3}
                      width={rw - 6}
                      height={rh - 6}
                      fill="none"
                      stroke="rgba(28,24,20,0.15)"
                      strokeWidth="0.8"
                    />

                    {/* Room Label & Dimensions */}
                    <text
                      x={rx + rw / 2}
                      y={ry + rh / 2 - 8}
                      textAnchor="middle"
                      fill="#181614"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="system-ui"
                    >
                      {room.name.toUpperCase()}
                    </text>

                    {showDimensions && (
                      <text
                        x={rx + rw / 2}
                        y={ry + rh / 2 + 8}
                        textAnchor="middle"
                        fill="#575149"
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {room.dimensions} ({room.areaSqFt} SQ FT)
                      </text>
                    )}

                    {/* Metric Sub-dimension */}
                    {showDimensions && (
                      <text
                        x={rx + rw / 2}
                        y={ry + rh / 2 + 20}
                        textAnchor="middle"
                        fill="#8E867B"
                        fontSize="8"
                        fontFamily="monospace"
                      >
                        [{room.metricDimensions}]
                      </text>
                    )}

                    {/* Furniture Icons Simulation */}
                    {showFurniture && room.furnitureIcons && (
                      <text
                        x={rx + 10}
                        y={ry + rh - 10}
                        fill="#8E867B"
                        fontSize="8.5"
                        fontFamily="system-ui"
                      >
                        ✦ {room.furnitureIcons.join(" • ")}
                      </text>
                    )}

                    {/* Door Arc Simulation */}
                    <circle
                      cx={rx + 14}
                      cy={ry + 14}
                      r="12"
                      fill="none"
                      stroke="#181614"
                      strokeWidth="1.2"
                      strokeDasharray="2,2"
                    />
                    <line
                      x1={rx}
                      y1={ry + 14}
                      x2={rx + 14}
                      y2={ry + 14}
                      stroke="#181614"
                      strokeWidth="1.8"
                    />
                  </g>
                );
              })}

              {/* Staircase Steps */}
              {activeFloor.staircase.w > 0 && (
                <g>
                  {(() => {
                    const sx = 35 + (activeFloor.staircase.x / 100) * 730;
                    const sy = 40 + (activeFloor.staircase.y / 100) * 440;
                    const sw = (activeFloor.staircase.w / 100) * 730;
                    const sh = (activeFloor.staircase.h / 100) * 440;
                    const stepCount = 10;
                    const stepH = sh / stepCount;

                    return (
                      <g>
                        <rect x={sx} y={sy} width={sw} height={sh} fill="#ECE7DE" stroke="#181614" strokeWidth="2.5" />
                        {Array.from({ length: stepCount }).map((_, i) => (
                          <line
                            key={`step-${i}`}
                            x1={sx}
                            y1={sy + i * stepH}
                            x2={sx + sw}
                            y2={sy + i * stepH}
                            stroke="#181614"
                            strokeWidth="1"
                          />
                        ))}
                        <line x1={sx + sw / 2} y1={sy} x2={sx + sw / 2} y2={sy + sh} stroke="#B88555" strokeWidth="1.8" />
                        <text x={sx + sw / 2} y={sy + sh / 2} textAnchor="middle" fill="#B88555" fontSize="10" fontWeight="bold" fontFamily="monospace">
                          {activeFloor.staircase.direction} ➔
                        </text>
                        <text x={sx + sw / 2} y={sy + 14} textAnchor="middle" fill="#181614" fontSize="8" fontWeight="bold" fontFamily="monospace">
                          STAIRS (18 RISERS)
                        </text>
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>

            {/* Bottom Title Block (Architectural Standard) */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#FAF8F5] border-t-2 border-[#181614] pt-2 px-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-[#575149]">
              <div>
                <span className="font-bold text-[#181614]">PROJECT: {plan.name.toUpperCase()}</span> •{" "}
                <span>VARIATION: {plan.variation}</span> •{" "}
                <span>STYLE: {plan.designStyle}</span>
              </div>
              <div>
                <span>VASTU: {plan.vastuScore}</span> •{" "}
                <span>CIRCULATION SCORE: {plan.circulationRating}/10</span> •{" "}
                <span>DWG NO: AURA-2D-{plan.id.slice(-6).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Architectural Disclaimer (Section 19) */}
        <div className="px-5 py-2.5 bg-amber-50/90 border-t border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2.5">
          <span className="text-amber-700 font-bold text-sm">⚠️</span>
          <p className="leading-snug">
            <strong>Architectural &amp; Regulatory Disclaimer:</strong> This floor plan represents a conceptual and preliminary design layout. Final construction blueprints, structural reinforcement calculations, ground setback clearances, FAR/FSI limits, and MEP schematics must be reviewed, stamped, and approved by a qualified licensed architect and civil engineer in accordance with applicable local building municipal regulations before execution.
          </p>
        </div>
      </div>
    </div>
  );
}
