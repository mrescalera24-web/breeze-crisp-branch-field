import { createFileRoute } from "@tanstack/react-router";
import { HouseGallery } from "@/components/house-gallery";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HouseGallery />;
}
