import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InquiryKind = "offer" | "trade" | "order";

export type Inquiry = {
  id: string;
  kind: InquiryKind;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  slug?: string;
  amount?: number;
};

type InquiryState = {
  items: Inquiry[];
  add: (inquiry: Omit<Inquiry, "id" | "createdAt">) => Inquiry;
};

export const useInquiries = create<InquiryState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (inquiry) => {
        const row: Inquiry = {
          ...inquiry,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set({ items: [row, ...get().items] });
        return row;
      },
    }),
    { name: "after-hours-inquiries" },
  ),
);
