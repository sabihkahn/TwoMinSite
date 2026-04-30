// src/store/useDashboardStore.ts
import { create } from "zustand";

interface Website {
  shopname: string;
  shoplogo: string;
  shopid: string;
}

interface DashboardState {
  websites: Website[];
  total: number;
  selectedWebsite: Website | null;
  analytics: any;
  loading: boolean;
  orders:any,
  products:any
  

  setorders: (orders: any) => void;
  setproducts: (products: any) => void;

  // Specific Setters
  setWebsites: (websites: Website[]) => void;
  setTotal: (total: number) => void;
  setSelectedWebsite: (website: Website | null) => void;
  setAnalytics: (analytics: any) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial State
  websites: [],
  total: 0,
  selectedWebsite: null,
  analytics: null,
  loading: true,
  orders:null,
  products:null,

  // Implementations
  setWebsites: (websites) => set({ websites }),
  setTotal: (total) => set({ total }),
  setSelectedWebsite: (selectedWebsite) => set({ selectedWebsite }),
  setAnalytics: (analytics) => set({ analytics }),
  setLoading: (loading) => set({ loading }),
  setorders:(orders)=> set({orders}),
  setproducts:(products)=>set({products})
}));