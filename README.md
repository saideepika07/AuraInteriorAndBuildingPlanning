# 🏛️ AURA — AI Interior & Architectural Spatial Planner

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Storage-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-Multimodal_Vision-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> **A luxury architectural spatial planner and generative AI interior design platform converted into a production-ready MERN + Firebase full-stack architecture.** Built with React 19, TypeScript, Tailwind CSS v4, Express.js, MongoDB Atlas, Firebase Auth/Storage, and Google Gemini Multimodal Vision, AURA combines parametric 2D vector CAD blueprint generation, interactive isometric 3D dollhouse visualization, customizable 1–4 BHK typologies with 100% attached en-suite washrooms, whole-building water infrastructure planning with verified plumbers, and automated spatial optimization into an editorial, magazine-grade interface.

---

## 📑 Table of Contents

- [🌟 Key Highlights & Philosophy](#-key-highlights--philosophy)
- [✨ Comprehensive Feature Breakdown](#-comprehensive-feature-breakdown)
  - [1. Parametric 2D House Planner & CAD Floor Plan Engine](#1-parametric-2d-house-planner--cad-floor-plan-engine)
  - [2. 1 BHK, 2 BHK, 3 BHK, 4 BHK Typology Selector](#2-1-bhk-2-bhk-3-bhk-4-bhk-typology-selector)
  - [3. 100% Attached Washrooms (En-Suite for Every Bedroom)](#3-100-attached-washrooms-en-suite-for-every-bedroom)
  - [4. Whole-Building Water Infrastructure & "Plumbers" Workforce Column](#4-whole-building-water-infrastructure--plumbers-workforce-column)
  - [5. Interactive Isometric 3D Dollhouse View](#5-interactive-isometric-3d-dollhouse-view)
  - [6. Multimodal AI Room & Blueprint Scanner (Gemini Vision)](#6-multimodal-ai-room--blueprint-scanner-gemini-vision)
  - [7. Dual-Theme Blueprint Comparison Engine (Original vs. Redesigned)](#7-dual-theme-blueprint-comparison-engine-original-vs-redesigned)
  - [8. AI Interior Studio (Prompt Engineering + Flux Diffusion)](#8-ai-interior-studio-prompt-engineering--flux-diffusion)
  - [9. Automated Chief Architect AI Floor Plan Audit](#9-automated-chief-architect-ai-floor-plan-audit)
  - [10. Verified In-House Workforce Marketplace (Direct Hire)](#10-verified-in-house-workforce-marketplace-direct-hire)
  - [11. Devun Architectural Cost & Timeline Calculator](#11-devun-architectural-cost--timeline-calculator)
  - [12. Collison Signature Architectural Showcase](#12-collison-signature-architectural-showcase)
  - [13. Curated Architectural Portfolio & High-Res Lightbox](#13-curated-architectural-portfolio--high-res-lightbox)
  - [14. Comprehensive Architectural Services Section](#14-comprehensive-architectural-services-section)
  - [15. Multi-Format Exporter & Real-Time Share Engine](#15-multi-format-exporter--real-time-share-engine)
  - [16. Consultation Booking Engine](#16-consultation-booking-engine)
- [🏗️ Full-Stack MERN + Firebase Architecture](#️-full-stack-mern--firebase-architecture)
  - [Backend REST API (Express.js MVC)](#backend-rest-api-expressjs-mvc)
  - [MongoDB Atlas Schemas (Mongoose)](#mongodb-atlas-schemas-mongoose)
  - [Firebase Integration (Auth & Storage)](#firebase-integration-auth--storage)
- [💻 Tech Stack & Tooling](#-tech-stack--tooling)
- [📁 Project Directory Structure](#-project-directory-structure)
- [🚀 Getting Started & Local Setup](#-getting-started--local-setup)
- [🔑 Environment Variables & API Configuration](#-environment-variables--api-configuration)
- [🎨 Design System & Aesthetics](#-design-system--aesthetics)
- [📄 License](#-license)

---

## 🌟 Key Highlights & Philosophy

- **End-to-End Full-Stack Architecture**: Converted from a standalone client into a production-grade **MERN + Firebase** web application with a modular MVC Express backend, MongoDB Atlas database persistence, Firebase authentication & storage, and automated API proxying.
- **Bridging Vision & Physical Execution**: Seamlessly connects high-level spatial AI concepts with actual civil engineering, MEP plumbing grids, verified trade contractors, and localized cost estimation.
- **100% Attached Washrooms (Zero Detached / Separate Baths)**: Every bedroom across 1 BHK, 2 BHK, 3 BHK, and 4 BHK layouts is engineered with its own dedicated attached en-suite washroom with direct private access.
- **Whole-Building Water Infrastructure**: Integrates dedicated master sanitary plumbers for end-to-end building water connection, overhead gravity tanks, sump integration, hydro-pneumatic booster pumps, and balanced pressure grids.
- **Editorial Luxury Aesthetic**: Inspired by high-end architectural publications (*Architectural Digest*, *Devun*, *Collison*), featuring fluted ribbed glass, offset hairline framing, custom serif & display typography, and warm tactile limestone palettes.
- **Zero Hallucination Tolerance**: Uses structured JSON schemas, temperature clamping, model fallbacks, and resilient architectural defaults for guaranteed production stability.

---

## ✨ Comprehensive Feature Breakdown

### 1. Parametric 2D House Planner & CAD Floor Plan Engine
- **Configurable Plot Parameters**:
  - Plot dimensions: Width (15 – 80 ft) & Depth (20 – 100 ft)
  - Multi-floor planning (Ground Floor, G+1 Duplex, G+2 Triplex)
  - Budget Tier: ₹15 Lakhs to ₹1.5+ Crores (with automated currency formatting and Indian numbering system conversions)
  - Family configuration (Couple, Nuclear, Joint Family, Multi-Gen)
  - Architectural Aesthetic: **Modern**, **Luxury**, **Traditional**, **Minimalist**, **Japandi**, **Boho Chic**
  - Regional context adaptation (Bangalore, Mumbai, Delhi NCR, Hyderabad, Chennai, Kerala, Kolkata)
  - Plot Facing / Vastu Orientation (North, East, South, West)
  - Parking specifications (1 Car + 2 Bikes, 2 Cars Portico, Compact, None)
- **Vector CAD Rendering (`<FloorPlanSVG />`)**:
  - Dynamically renders boundary walls, interior partition dry-walls, and room zones mathematically on an SVG coordinate grid.
  - Generates accurate door-swing clearance arcs, window apertures, dimension callouts (e.g. `16' × 14'`), and square footages.
  - Includes bespoke furniture silhouettes, natural light ingress ratings (High / Medium / Soft), curated paint palette hex codes, and associated craft trades.

### 2. 1 BHK, 2 BHK, 3 BHK, 4 BHK Typology Selector
- **Interactive Typology Selector**:
  - Four distinct typology cards: `1 BHK`, `2 BHK`, `3 BHK`, and `4 BHK`.
  - Displays instant active selection with dark pill indicator (`bg-[#1C1A17] text-white`) and status tag `[Active BHK Selected]`.
  - Subtitle specifications: `1 Bed • 1 Attached Bath`, `2 Beds • 2 Attached Baths`, `3 Beds • 3 Attached Baths`, `4 Beds • 4 Attached Baths`.
  - Immediate dynamic recomputation of room zones, circulation paths, light ingress ratings, and total square footage.

### 3. 100% Attached Washrooms (En-Suite for Every Bedroom)
- **Zero Separate / Common Corridor Bathrooms**:
  - Designed specifically so that **every bedroom features its own direct attached washroom (en-suite)**.
  - Direct private bedroom doorway with zero corridor transit for maximum privacy.
  - **Single Floor Configurations**:
    - `1 BHK`: Master Bedroom Suite + Master Bedroom Attached Washroom (En-suite).
    - `2 BHK`: Bedroom 1 + Attached Washroom & Bedroom 2 + Attached Washroom.
    - `3 BHK`: Bedroom 1 + Attached Washroom, Bedroom 2 + Attached Washroom & Bedroom 3 + Attached Washroom.
    - `4 BHK`: All 4 bedrooms equipped with individual private en-suite washrooms.
  - **Duplex / Multi-Floor Configurations**:
    - Ground floor master/parents bedroom has direct attached en-suite bath.
    - First floor upper suites and master bedrooms each have dedicated attached en-suite baths.
  - **Visual Inspector Badges**:
    - Room Inspector displays: `🔒 100% Private Attached Washroom (En-Suite)` when inspecting any washroom.
    - Room Inspector displays: `🚿 Direct Attached Washroom Connected` when inspecting any bedroom.
    - Header indicator tag: `🚿 100% Attached Washrooms`.

### 4. Whole-Building Water Infrastructure & "Plumbers" Workforce Column
- **Dedicated "Plumbers" Filter Tab**:
  - Added **"Plumbers"** to the category filter bar in the In-House Verified Workforce section:
    `[All Specialists]  [Architects]  [Plumbers]  [Carpenters]  [Contractors]  [Electricians]  [Painters]  [Ceilings]`
  - Clicking **"Plumbers"** filters the workforce roster to verified master sanitary engineers.
- **Master Sanitary Engineer Profiles**:
  - **Vikramaditya Sharma**: *Master Sanitary Engineer & Whole-Building Water Infrastructure Lead*
    - Specialties: Whole-Building Water Supply, Overhead Tank & Sump Integration, Hydro-Pneumatic Pressure Booster, Concealed CPVC/PPR Piping Grid, Zero-Leak Sanitary Manifolds, Central Hot/Cold Recirculation Ring.
    - Rate: ₹3,100 / day • 16 yrs exp • ★ 4.98 (182 jobs).
  - **Tariq Mansoor**: *Central Water Metering & Multi-Floor Hydraulic Lead*
    - Specialties: Municipal Main Inflow Tie-In, Acoustic Cast Iron Drainage, Water Softening & RO Filtration, Leak-Free Wall-Hung Cisterns, Rainwater Harvesting Integration.
    - Rate: ₹2,900 / day • 13 yrs exp • ★ 4.96 (124 jobs).
- **Floor Plan to Plumber Direct Pairing**:
  - Attached washrooms across all floor plans specify `recommendedTrade: "Master Sanitary Plumber"`.
  - Clicking **"Hire Master Sanitary Plumber ↗"** from the washroom inspector opens direct consultation booking with the plumber profile pre-selected.
  - Quick-assign in the team collaboration modal includes `+ Vikramaditya Sharma (Plumber)`.
  - Footer Verified Trades includes `Whole-Building Sanitary Plumbers`.

### 5. Interactive Isometric 3D Dollhouse View
- **Isometric Projection (`<Isometric3DDollhouse />`)**:
  - Converts 2D floor coordinates into an interactive 3D spatial dollhouse model.
  - Interactive camera orbit angles (Isometric 45°, Front Elevation, Top-Down Plan).
  - Depth-extruded partition walls, wood-grain floor texturing, ambient shadow occlusions, and room selection inspect modes.

### 6. Multimodal AI Room & Blueprint Scanner (Gemini Vision)
- **Image & Blueprint Ingestion**:
  - Accepts camera captures or uploads of real-world rooms or scanned 2D architectural blueprints/CAD drafts.
  - Automatically identifies whether the upload is an interior photograph or a 2D technical layout using Gemini Multimodal Vision (`gemini-3.6-flash`).
- **Spatial Diagnostics & Reclamation**:
  - Analyzes spatial bottlenecks, intrusive door-swing clearances, and redundant partition walls.
  - Identifies specific space-saving opportunities (e.g. converting swing doors to concealed cavity pocket sliders, installing load-bearing lintels).
  - Calculates and displays exact square footage reclaimed (e.g., `+52 sq ft Reclaimed`).
  - Pins interactive pinpoint product markers (`<ProductMarker />`) with dimensions, craftsman requirements, and space features.

### 7. Dual-Theme Blueprint Comparison Engine (Original vs. Redesigned)
- **Before vs. After Comparison**: Side-by-side interactive comparison between the original inefficient blueprint and the AI-redesigned space-saving layout.
- **Theme Switcher**:
  - **Vellum Blueprint**: Warm sepia architectural draft paper with precise charcoal drafting lines.
  - **Cyan Blueprint**: Classic high-contrast blueprint blue with cyan and white technical schematics.
- **Demolition & Modification Logs**: Detailed list of trade actions (e.g., civil contractor partition demolition, master carpenter pocket slider installation).

### 8. AI Interior Studio (Prompt Engineering + Flux Diffusion)
- **Two-Stage Generation Pipeline**:
  1. **Stage 1 (Gemini AI Prompt Synthesis)**: Ingests raw client notes, dimensions, and selected style to synthesize an ultra-detailed, editorial prompt containing lighting, camera angle, and material specifics.
  2. **Stage 2 (Flux Diffusion Engine)**: Dispatches the enhanced prompt to render high-definition (1280×854, 8K editorial quality) photorealistic interior renders via Pollinations AI.
- Preset room selectors (Living Great Room, Master Bedroom, Minimalist Kitchen, Spa Washroom, Home Office).

### 9. Automated Chief Architect AI Floor Plan Audit
- **Instant Plan Scoring**: Evaluates the currently configured floor plan and returns an overall score (0 – 100).
- **Circulation & Ergonomics**: Grades circulation as *Optimal*, *Moderate*, or *Needs Revision*.
- **Structural & MEP Insights**: Assesses plumbing stack alignment between wet areas (kitchen/baths) and natural daylight ingress.
- **Cost Reduction Advisory**: Actionable construction cost-saving strategies (e.g., standardizing window module sizes, drywall partitions).
- **Vastu Compliance Notes**: Directional harmony feedback for main entrances, kitchen zones, and prayer alcoves.

### 10. Verified In-House Workforce Marketplace (Direct Hire)
- **Curated Trade Directory**:
  - Architects, Master Sanitary Plumbers, Master Carpenters, Turnkey Civil Contractors, Licensed Electricians, Texture Painters, False Ceiling Specialists.
- **Profile Details**: Verification badges, years of experience, average star ratings, customer review counts, transparent daily rates (₹/day), portfolio projects, and specializations.
- Direct hiring modal integration with one-click contractor reservation.

### 11. Devun Architectural Cost & Timeline Calculator
- Interactive modal with real-time estimation based on square footage (400 – 5,000+ sq ft) and finish tier:
  - **Minimalist**: Essential clean lines, modular ply, and standard hardware.
  - **Warm Luxury**: European oak veneers, brushed brass, concealed lighting, quartz countertops.
  - **Monolithic Bespoke**: Bookmatched Italian marble, solid teak joinery, motorized pocket systems.
- Transparent itemized cost breakdown: Millwork & Carpentry (45%), Civil & Wet Works (35%), Project Management & Supervision (20%), plus estimated turnaround time.

### 12. Collison Signature Architectural Showcase
- Curated gallery of signature architectural fixtures and custom millwork:
  - **01 Kitchens**: Culinary monoliths with Roman travertine surfaces and flush integrated appliances.
  - **02 Seating**: Sculptural solid turned oak stools and Belgian bouclé chairs.
  - **03 Tables**: Fluted travertine pedestal dining tables and monolithic console slabs.
  - **04 Storage**: Integrated ceiling-height wardrobes with pocket workstations.
  - **05 Lighting**: Patinated bronze balance pendants and architectural grazing luminaires.
  - **06 Washrooms**: Honed limestone floating vanities with concealed wall-hung spouts.
- Interactive live CAD wireframe line drawings illustrating each collection item.

### 13. Curated Architectural Portfolio & High-Res Lightbox
- High-resolution project case studies:
  - *Sauna Design (Kyiv)*: Wellness & spa architecture with thermo-treated Nordic aspen and basalt stone.
  - *Apartment Design (Mykolaiv)*: Modern minimalism with smoked oak and travertine slabs.
  - *Country House (Lviv)*: Monolithic stone residence with double-height timber glazing.
  - *Penthouse (Odesa)*: Coastal penthouse with expansive open-plan entertaining spaces.
- Interactive multi-image lightbox modal (`<PortfolioLightboxModal />`) with image gallery carousel and material specifications.

### 14. Comprehensive Architectural Services Section
- **Four Core Offerings**:
  1. *Interior Design*: Spatial expansion and modern functional aesthetics.
  2. *Architecture & Renovation*: Complete structural modernization and turnkey redesigns.
  3. *Bespoke Furniture Manufacturing*: Custom woodworking, solid timber framing, and unique joinery.
  4. *Turnkey Project Supervision*: End-to-end site management and construction QA.

### 15. Multi-Format Exporter & Real-Time Share Engine
- **Export Options (`<ExportFileModal />`)**:
  - **Vector Blueprint (SVG)**: Scalable technical CAD diagram ready for vector editors (Figma, Illustrator, AutoCAD).
  - **High-Res Floor Plan (PNG)**: 300 DPI raster preview with dimensions and legend.
  - **Architectural Specification (JSON)**: Machine-readable JSON payload containing room coordinates, sq ft metrics, materials, and trade allocations.
  - **Executive Summary (Print / PDF)**: Formatted architectural brief ready for print or PDF generation.
- **Collaborative Sharing (`<ShareFileModal />`)**: Real-time project URL generation, QR code sharing, and one-click copy functionality.

### 16. Consultation Booking Engine
- Multi-step interactive booking modal (`<ConsultationModal />`) allowing clients to submit plot details, desired architectural aesthetic, budget tier, and preferred consultation mode (On-Site Survey, Virtual 3D Walkthrough, or Studio Meeting).

---

## 🏗️ Full-Stack MERN + Firebase Architecture

```
                                  ┌────────────────────────┐
                                  │   React 19 Frontend    │
                                  │ (Vite :8443 / :5173)   │
                                  └───────────┬────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │                                               │
             Firebase Client SDK                            Vite Proxy /api
          (Auth & Direct Storage)                     (Token in Authorization header)
                      │                                               │
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌────────────────────────┐
         │     Firebase Cloud      │                     │   Express REST API     │
         │ - Email / Google Auth   │                     │    (Node.js :5000)     │
         │ - Blueprint & Renders   │                     └────────────┬───────────┘
         └─────────────────────────┘                                  │
                                              ┌───────────────────────┼───────────────────────┐
                                              ▼                       ▼                       ▼
                                     ┌─────────────────┐    ┌─────────────────┐     ┌─────────────────┐
                                     │  MongoDB Atlas  │    │  Firebase Admin │     │  Google Gemini  │
                                     │   (Mongoose)    │    │ (Token Verify)  │     │ (Vision & LLM)  │
                                     └─────────────────┘    └─────────────────┘     └─────────────────┘
```

### Backend REST API (Express.js MVC)

The backend is built with Node.js and Express in a modular MVC folder structure:

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Public | Server health check, uptime, and database connection status |
| `/api/auth/sync` | `POST` | Public / Auth | Upsert user record synced with Firebase Authentication |
| `/api/auth/me` | `GET` | Private | Retrieve authenticated user profile |
| `/api/plans` | `GET` | Public / Query | Fetch house plans (filterable by `bhkType`, `facing`, `floors`) |
| `/api/plans/:id` | `GET` | Public | Fetch a single house plan by ID |
| `/api/plans` | `POST` | Private | Create a new custom house plan |
| `/api/plans/:id` | `PUT` | Private | Update an existing house plan |
| `/api/plans/:id` | `DELETE` | Private | Delete a saved house plan |
| `/api/architects` | `GET` | Public | Fetch verified architect directory |
| `/api/workers` | `GET` | Public | Fetch trade workers (filter by `category=Plumber`, `Carpenter`, etc.) |
| `/api/workers/:id`| `GET` | Public | Fetch single worker profile & specialties |
| `/api/bookings` | `POST` | Public / Auth | Create a consultation booking for architects or trades |
| `/api/bookings/my`| `GET` | Private | Get current user's consultation bookings |
| `/api/projects` | `GET` | Private | List user's saved AI interior studio renders |
| `/api/projects` | `POST` | Private | Save AI interior render to user portfolio |
| `/api/projects/:id`| `DELETE` | Private | Delete saved AI interior project |
| `/api/ai/audit` | `POST` | Public | Evaluate floor plan circulation, structural, and trade allocations |
| `/api/upload` | `POST` | Private | Upload blueprints and room scan images |

### MongoDB Atlas Schemas (Mongoose)

1. **User (`server/models/User.js`)**:
   - `firebaseUid` (unique, indexed), `email`, `displayName`, `photoURL`, `role` (`client`, `architect`, `worker`, `admin`), `phone`, `createdAt`.
2. **HousePlan (`server/models/HousePlan.js`)**:
   - `userId`, `title`, `plotWidth`, `plotDepth`, `bhkType` (`1 BHK`, `2 BHK`, `3 BHK`, `4 BHK`), `facing` (`North`, `East`, `South`, `West`), `floors`, `budgetTier`, `rooms` array (coordinates, dimensions, sqFt, attached washroom specs, paint palette, recommended trade), `totalSqFt`, `isPublic`.
3. **Architect (`server/models/Architect.js`)**:
   - `architectId`, `name`, `firm`, `experience`, `rating`, `reviewsCount`, `consultationFee`, `location`, `avatar`, `specialties`, `bio`, `verified`.
4. **Worker (`server/models/Worker.js`)**:
   - `workerId`, `name`, `category` (`Architect`, `Plumber`, `Carpenter`, `Contractor`, `Electrician`, `Painter`, `Ceiling`), `role`, `experience`, `rating`, `reviewsCount`, `dayRate`, `location`, `avatar`, `specialties`, `recentProject`, `bio`, `verified`.
5. **Booking (`server/models/Booking.js`)**:
   - `userId`, `planId`, `clientName`, `email`, `phone`, `tradeType`, `workerId`, `architectId`, `consultationDate`, `consultationMode`, `budgetTier`, `status` (`pending`, `confirmed`, `completed`, `cancelled`), `notes`.
6. **SavedProject (`server/models/SavedProject.js`)**:
   - `userId`, `title`, `prompt`, `imageUrl`, `style`, `roomType`, `dimensions`, `estimatedCost`, `aspectRatio`, `tags`.

### Firebase Integration (Auth & Storage)

- **Firebase Authentication**:
  - Email/Password and Google Sign-In supported on the client (`src/services/firebase.ts`).
  - Seamless sync with backend database via `/api/auth/sync`.
  - Backend token verification middleware (`server/middleware/authMiddleware.js`) via Firebase Admin SDK.
- **Firebase Storage**:
  - Secure cloud storage for user-uploaded blueprint scans, room photos, and AI interior studio renders.
  - Direct secure uploads or backend multipart stream uploads (`server/middleware/uploadMiddleware.js`).

---

## 💻 Tech Stack & Tooling

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Modern concurrent rendering, clean component lifecycle |
| **Frontend Language** | **TypeScript 5.7** | Strict typing across architectural models and AI interfaces |
| **Styling** | **Tailwind CSS v4** | Next-gen zero-config CSS engine with native `@tailwindcss/vite` |
| **Build Tool** | **Vite 8** | Instant HMR and fast optimized production bundling |
| **Backend Runtime** | **Node.js 20.x** | High-performance asynchronous JavaScript runtime |
| **Backend Framework**| **Express.js 4.21** | REST API with modular MVC routes, controllers, and middleware |
| **Database** | **MongoDB Atlas + Mongoose** | Cloud document database with typed schemas for users, plans, and trades |
| **Authentication** | **Firebase Auth** | Email/Password and Google OAuth authentication with JWT verification |
| **Cloud Storage** | **Firebase Storage** | Cloud asset storage for blueprints and generated 8K renders |
| **AI Vision & LLM** | **Google Gemini API** | `gemini-3.6-flash` multimodal vision and floor plan auditing |
| **Image Synthesis** | **Pollinations AI / Flux** | High-fidelity architectural diffusion image generation |
| **Typography** | **Google Fonts** | *Cinzel*, *Cormorant Garamond*, *Outfit*, *Plus Jakarta Sans*, *DM Mono* |

---

## 📁 Project Directory Structure

```text
AuraInteriorAndBuildingPlanning/
├── client/                               # Standalone Frontend Client Package
│   ├── src/                              # React 19 source code
│   │   ├── components/                   # Portfolio, services, calculator, lightbox components
│   │   ├── services/                     # api.ts, firebase.ts, gemini.ts
│   │   ├── App.tsx                       # Complete interactive application
│   │   ├── index.css                     # Tailwind CSS v4 styling
│   │   └── main.tsx                      # React entrypoint
│   ├── package.json                      # Client dependencies & scripts
│   ├── vite.config.ts                    # Client Vite configuration
│   └── tsconfig.json                     # TypeScript configuration
├── server/                               # Node.js + Express MVC Backend
│   ├── config/
│   │   ├── db.js                         # MongoDB Atlas Mongoose connection
│   │   └── firebase.js                   # Firebase Admin SDK & Storage configuration
│   ├── controllers/
│   │   ├── authController.js             # User sync & profile management
│   │   ├── housePlanController.js        # Save/edit/delete/query house plans
│   │   ├── architectController.js        # Architect roster & profiles
│   │   ├── workerController.js           # Trade workers (Plumbers, Electricians, etc.)
│   │   ├── bookingController.js          # Consultation bookings
│   │   ├── projectController.js          # Saved AI interior projects
│   │   ├── aiController.js               # Gemini Vision & audit gateway
│   │   └── uploadController.js           # Blueprint & interior image uploads
│   ├── middleware/
│   │   ├── authMiddleware.js             # Firebase token verification
│   │   ├── uploadMiddleware.js           # Multer memory storage & MIME filter
│   │   └── errorMiddleware.js            # Standardized JSON error & 404 handler
│   ├── models/
│   │   ├── User.js                       # User collection
│   │   ├── HousePlan.js                  # House Plans collection (1–4 BHK, en-suites)
│   │   ├── Architect.js                  # Architects collection
│   │   ├── Worker.js                     # Workers collection (Plumber, Carpenter, etc.)
│   │   ├── Booking.js                    # Consultation Bookings collection
│   │   └── SavedProject.js               # Saved AI Interior Projects collection
│   ├── routes/
│   │   ├── authRoutes.js                 # /api/auth
│   │   ├── housePlanRoutes.js            # /api/plans
│   │   ├── architectRoutes.js            # /api/architects
│   │   ├── workerRoutes.js               # /api/workers
│   │   ├── bookingRoutes.js              # /api/bookings
│   │   ├── projectRoutes.js              # /api/projects
│   │   ├── aiRoutes.js                   # /api/ai
│   │   └── uploadRoutes.js               # /api/upload
│   ├── seeds/
│   │   └── seedData.js                   # Initial seeder for architects and verified workforce
│   ├── package.json                      # Backend dependencies & scripts
│   ├── server.js                         # Express entry point (:5000)
│   ├── .env.example                      # Backend environment variable template
│   └── .env                              # Server environment secrets
├── src/                                  # Root Frontend (active Figma Make preview)
│   ├── components/                       # Shared UI components
│   ├── services/
│   │   ├── api.ts                        # Unified REST API client (/api)
│   │   ├── firebase.ts                   # Firebase Auth (Email/Google) & Storage
│   │   └── gemini.ts                     # AI services routing via Express
│   ├── App.tsx                           # Root app wired to backend APIs
│   ├── index.css                         # Tailwind CSS v4 styling
│   └── main.tsx                          # React entrypoint
├── index.html                             # Vite HTML shell with metadata
├── package.json                           # Root dependencies, concurrently & dev scripts
├── tsconfig.json                          # Root TypeScript configuration
├── vite.config.ts                         # Root Vite config with API proxy to port 5000
├── .gitignore                             # Git ignore rules
└── README.md                              # Complete architectural & technical documentation
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js**: v18.0 or newer (v20+ recommended)
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- **Firebase Account**: Free [Firebase Console](https://console.firebase.google.com/) project (Authentication & Storage)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saideepika07/AuraInteriorAndBuildingPlanning.git
   cd AuraInteriorAndBuildingPlanning
   ```

2. **Install Root & Server Dependencies**:
   ```bash
   # Install root frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configure Environment Variables**:
   - In the root directory, create `.env.local`:
     ```env
     VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     ```
   - In the `server/` directory, copy `.env.example` to `.env`:
     ```bash
     cp server/.env.example server/.env
     ```
     Configure your database connection and keys:
     ```env
     PORT=5000
     NODE_ENV=development
     CLIENT_URL=http://localhost:8443
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aura_spaces?retryWrites=true&w=majority
     GEMINI_API_KEY=your_google_gemini_api_key_here
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     ```

4. **Seed the Database (Optional)**:
   Populate MongoDB Atlas with verified architects and trade workers:
   ```bash
   cd server
   npm run seed
   cd ..
   ```

5. **Start Both Backend and Frontend**:
   ```bash
   # Option 1: Run both concurrently from root
   npm run dev:all

   # Option 2: Run separately in two terminals
   # Terminal 1 (Backend):
   cd server && npm run dev

   # Terminal 2 (Frontend):
   npm run dev
   ```

   - **Frontend App**: Open [http://localhost:8443](http://localhost:8443) (or `http://localhost:5173`)
   - **Backend API**: Running at [http://localhost:5000](http://localhost:5000)
   - **Health Check**: Open [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Environment Variables & API Configuration

| Variable | Location | Required | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | `server/.env` | Optional (default `5000`) | Port for the Express REST API |
| `MONGO_URI` | `server/.env` | **Required for DB** | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | `server/.env` / `.env.local` | **Recommended** | Google Gemini API key for vision blueprint scanning and room audits |
| `FIREBASE_PROJECT_ID` | `server/.env` / `.env.local` | Optional | Firebase Project ID for Auth and Cloud Storage |
| `FIREBASE_STORAGE_BUCKET`| `server/.env` / `.env.local` | Optional | Bucket for uploaded blueprints and generated interior images |

> **Graceful Offline Mode**: If MongoDB or Firebase are not yet configured with live credentials, AURA runs in **graceful development fallback mode**. The frontend uses in-memory mock stores, verified rosters, and offline Gemini spatial planners without breaking the UI.

---

## 🎨 Design System & Aesthetics

- **Curated Color Palette**:
  - `Sand 50 – 400`: Tactile limestone backgrounds (`#FAF8F5`, `#F6F3ED`, `#EFECE6`, `#EBE5DC`).
  - `Earth 400 – 900`: Deep charcoal and volcanic stone typography (`#1C1A17`, `#23201C`, `#5E5851`).
  - `Accent Camel & Bronze`: Subtle luxury highlights (`#B88555`, `#A07144`, `#C59B67`).
  - `Blueprint Cyan & Emerald`: Active status indicators and vector schematics (`#0284C7`, `#34D399`).
- **Signature UI Utilities**:
  - `.fluted-glass`: Ribbed fluted glass reflection with `backdrop-filter: blur(12px)`.
  - `.fluted-stripes`: Fine vertical reeded glass lines matching luxury European shower and partition glazing.
  - `.architect-frame`: Hairline architectural offset borders reminiscent of physical blueprints.
  - `.text-outline-light` & `.text-outline-dark`: Editorial outline lettering with `-webkit-text-stroke`.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for your architectural and interior planning applications.
