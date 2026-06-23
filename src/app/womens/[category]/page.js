import { redirect } from "next/navigation";

const CATEGORY_MAP = {
  bracelets: "Bracelets",
  earrings: "Earrings",
  necklaces: "Necklaces",
  rings: "Rings",
  charms: "Charms & Amulets",
  "charms-and-amulets": "Charms & Amulets",
};

export default async function WomensCategoryPage({ params }) {
  const { category } = await params;
  const mappedCategory = CATEGORY_MAP[category] || category;

  redirect(`/shop?category=${encodeURIComponent(mappedCategory)}`);
}
