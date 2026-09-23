import { Landing } from "@/components/landing/landing";
import { getRenderedPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getRenderedPosts();
  return <Landing posts={posts} />;
}
