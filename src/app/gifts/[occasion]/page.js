import { redirect } from "next/navigation";

export default async function GiftOccasionPage() {
  redirect("/shop?category=Gifting");
}
