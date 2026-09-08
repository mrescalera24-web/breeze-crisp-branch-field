import { create } from "zustand";

export const ROOM_ASSETS = [
  "/scenes/room/card.jpg",
  "/scenes/room/marble.jpg",
  "/scenes/room/velvet.jpg",
  "/scenes/room/graffiti.jpg",
  "/scenes/room/jesus.jpg",
] as const;

export function preloadRoom() {
  return Promise.all(
    ROOM_ASSETS.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  );
}

type RoomLoad = {
  ready: boolean;
  markReady: () => void;
};

export const useRoomLoad = create<RoomLoad>((set) => ({
  ready: false,
  markReady: () => set({ ready: true }),
}));
