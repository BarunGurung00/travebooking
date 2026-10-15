import { MapPinned, Hotel, Compass, Bus, User, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SectionConfig = {
  key: string;
  label: string;
  category: string | null;
  icon: LucideIcon;
};

export const SECTIONS: SectionConfig[] = [
  { key: "Tourism",    label: "Overview",   category: null,        icon: MapPinned },
  { key: "Hotels",     label: "Hotels",     category: "hotel",     icon: Hotel },
  { key: "Treks",      label: "Treks",      category: "trek",      icon: Compass },
  { key: "Transports", label: "Transport",  category: "transport", icon: Bus },
  { key: "Guides",     label: "Guides",     category: "guide",     icon: User },
  { key: "Permits",    label: "Permits",    category: "permit",    icon: ScrollText },
];

export function getSectionByKey(key: string): SectionConfig | undefined {
  return SECTIONS.find((s) => s.key.toLowerCase() === key.toLowerCase());
}