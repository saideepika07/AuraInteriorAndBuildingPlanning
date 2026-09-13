// AURA Spaces Unified REST API Client
// Interfaces with the Express.js MVC Backend (/api)

const API_BASE_URL =
  (typeof window !== "undefined" && (window as any).__API_BASE_URL__) ||
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "/api";

// Helper for authorized headers
function getHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const activeToken =
    token ||
    (typeof window !== "undefined"
      ? window.localStorage.getItem("AURA_FIREBASE_ID_TOKEN")
      : null);

  if (activeToken) {
    headers["Authorization"] = `Bearer ${activeToken}`;
  }

  return headers;
}

// ─── AUTH API ─────────────────────────────────────────────────────────────────
export const authApi = {
  async syncUser(userData: {
    firebaseUid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/auth/sync`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async updateProfile(updates: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return res.json();
  },
};

// ─── HOUSE PLANS API ──────────────────────────────────────────────────────────
export const housePlanApi = {
  async getPlans(userId?: string) {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const res = await fetch(`${API_BASE_URL}/plans${query}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getPlanById(id: string) {
    const res = await fetch(`${API_BASE_URL}/plans/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async savePlan(planData: any) {
    const res = await fetch(`${API_BASE_URL}/plans`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(planData),
    });
    return res.json();
  },

  async updatePlan(id: string, updates: any) {
    const res = await fetch(`${API_BASE_URL}/plans/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async deletePlan(id: string) {
    const res = await fetch(`${API_BASE_URL}/plans/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },
};

// ─── ARCHITECTS API ───────────────────────────────────────────────────────────
export const architectApi = {
  async getArchitects(filter?: { location?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filter?.location) params.append("location", filter.location);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetch(`${API_BASE_URL}/architects?${params.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getArchitectById(id: string) {
    const res = await fetch(`${API_BASE_URL}/architects/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },
};

// ─── WORKERS API ──────────────────────────────────────────────────────────────
export const workerApi = {
  async getWorkers(filter?: { category?: string; location?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filter?.category && filter.category !== "All") params.append("category", filter.category);
    if (filter?.location) params.append("location", filter.location);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetch(`${API_BASE_URL}/workers?${params.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getWorkerById(id: string) {
    const res = await fetch(`${API_BASE_URL}/workers/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },
};

// ─── CONSULTATION BOOKINGS API ────────────────────────────────────────────────
export const bookingApi = {
  async createBooking(bookingPayload: {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    workerId: string;
    workerName: string;
    workerRole?: string;
    workerCategory?: string;
    days: number;
    dayRate: number;
    scopeContext?: string;
    notes?: string;
    userId?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(bookingPayload),
    });
    return res.json();
  },

  async getBookings(userId?: string, phone?: string) {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (phone) params.append("phone", phone);

    const res = await fetch(`${API_BASE_URL}/bookings?${params.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getBookingById(id: string) {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },
};

// ─── SAVED AI INTERIOR PROJECTS API ───────────────────────────────────────────
export const projectApi = {
  async saveProject(projectPayload: any) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(projectPayload),
    });
    return res.json();
  },

  async getProjects(userId?: string) {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
    const res = await fetch(`${API_BASE_URL}/projects${query}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async getProjectById(id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async updateProject(id: string, updates: any) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  async deleteProject(id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },
};

// ─── AI ASSISTANCE API ────────────────────────────────────────────────────────
export const aiApi = {
  async getHealth() {
    const res = await fetch(`${API_BASE_URL}/ai/health`);
    return res.json();
  },

  async analyzeRoom(base64Data: string, mimeType = "image/jpeg", roomContext = "space photo or architectural blueprint") {
    const res = await fetch(`${API_BASE_URL}/ai/analyze-room`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ base64Data, mimeType, roomContext }),
    });
    return res.json();
  },

  async enhancePrompt(params: {
    userNotes: string;
    style: string;
    roomType?: string;
    dimensions?: string;
    budget?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/ai/enhance-prompt`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async auditFloorPlan(planInfo: any) {
    const res = await fetch(`${API_BASE_URL}/ai/audit-floorplan`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(planInfo),
    });
    return res.json();
  },
};

// ─── UPLOAD API ───────────────────────────────────────────────────────────────
export const uploadApi = {
  async uploadBlueprint(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("AURA_FIREBASE_ID_TOKEN")
        : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/upload/blueprint`, {
      method: "POST",
      headers,
      body: formData,
    });
    return res.json();
  },

  async uploadInterior(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {};
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("AURA_FIREBASE_ID_TOKEN")
        : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/upload/interior`, {
      method: "POST",
      headers,
      body: formData,
    });
    return res.json();
  },
};

export default {
  auth: authApi,
  plans: housePlanApi,
  architects: architectApi,
  workers: workerApi,
  bookings: bookingApi,
  projects: projectApi,
  ai: aiApi,
  upload: uploadApi,
};
