import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services | 4AT Consulting",
  description:
    "Explore 4AT Consulting's hybrid accounting, advisory, automation, and finance transformation services.",
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
