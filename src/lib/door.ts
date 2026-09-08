import { create } from "zustand";

const KEY = "casa-door";

type DoorState = {
  closed: boolean;
  hydrate: () => void;
  open: () => void;
};

export const useDoor = create<DoorState>((set) => ({
  closed: true,
  hydrate: () => {
    try {
      if (sessionStorage.getItem(KEY) === "open") set({ closed: false });
    } catch {
      /* private mode — keep the door closed until they enter */
    }
  },
  open: () => {
    try {
      sessionStorage.setItem(KEY, "open");
    } catch {
      /* private mode */
    }
    set({ closed: false });
  },
}));
