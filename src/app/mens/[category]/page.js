import { redirect } from "next/navigation";

const CATEGORY_MAP = {
  bracelets: "Bracelets",
  earrings: "Earrings",
  necklaces: "Necklaces",
  rings: "Rings",
  pendants: "Pendants",
  accessories: "Accessories",
};

export default async function MensCategoryPage({ params }) {
  const { category } = await params;
  const mappedCategory = CATEGORY_MAP[category] || category;

  redirect(`/shop?category=${encodeURIComponent(mappedCategory)}`);
}
