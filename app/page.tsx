'use client'; // Isso precisa ser um Client Component para usar o useBrand()
import Link from "next/link";
import Image from "next/image";
import { fetchPosts } from "./lib/api";

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <ul className="space-y-6">
      {posts.map((post: any) => {
        const cover = post.coverImage;
        return (
          <li key={post.id} className="border p-4 rounded">
            {cover && (
              <Image
                src={cover.formats.small.url.startsWith("http")
                  ? cover.formats.small.url
                  : `${process.env.STRAPI_PUBLIC_URL}${cover.formats.small.url}`}
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
  );
}
