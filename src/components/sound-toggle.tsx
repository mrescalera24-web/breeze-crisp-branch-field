import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { houseAudio } from "@/lib/house-audio";

export function SoundToggle() {
  const [muted, setMuted] = useState(houseAudio.muted);
  const [live, setLive] = useState(houseAudio.started);

  useEffect(() => {
    return houseAudio.subscribe(() => {
      setMuted(houseAudio.muted);
      setLive(houseAudio.started);
    });
  }, []);

  async function onToggle() {
    const was = houseAudio.started;
    await houseAudio.start();
    if (!was) {
      houseAudio.setMuted(false);
      return;
    }
    houseAudio.toggle();
  }

  const silent = !live || muted;

  return (
    <button
      type="button"
      onClick={() => void onToggle()}
      className="relative inline-flex size-10 items-center justify-center rounded-sm border border-border bg-bg/70 text-fg backdrop-blur-sm"
      aria-label={silent ? "Turn sound on" : "Turn sound off"}
    >
      {silent ? <VolumeX className="size-4" /> : <Volume2 className="size-4 text-gold" />}
    </button>
  );
}
