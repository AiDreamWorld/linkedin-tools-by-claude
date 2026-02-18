import type { Metadata } from "next";
import ToolsDirectory from "./ToolsDirectory";

export const metadata: Metadata = {
  title: "All LinkedIn Tools – LinkForge | 40+ Free Tools",
  description: "Browse all 40+ free LinkedIn tools on LinkForge. Search by name or filter by category: Profile, Content, Outreach, Career, and Visual tools.",
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
