import Link from "next/link";
import Image from "next/image";
import { fetchPosts } from "./lib/api";


export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <main className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Strapi POC</h1>
      <ul className="space-y-6">
        {posts.map((post: any) => {
          const cover = post.coverImage;
          return (
            <li key={post.id} className="border p-4 rounded">
              {cover && (
                <Image
                  src={cover.formats.thumbnail.url.startsWith("http")
                    ? cover.formats.thumbnail.url
                    : `${process.env.STRAPI_PUBLIC_URL}${cover.formats.thumbnail.url}`}
                  alt={cover.alternativeText || post.title}
                  width={800}
                  height={400}
                />
              )}
              <h2 className="text-xl font-semibold mt-4 mb-2">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p>{post.excerpt}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
