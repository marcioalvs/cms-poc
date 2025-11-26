//"use client"; // Required if using Next.js 13+ app router
import Image from "next/image";
import { fetchPostBySlug } from "../../lib/api";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {

  const { slug } = await params; 
  const post = await fetchPostBySlug(slug);

  if (!post) return <div>Post '{params.slug}' não encontrado</div>;

  const cover = post.coverImage;
  const gallery = post.mediaGallery || [];

  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {cover && (
        <Image
          src={cover.formats.large.url.startsWith("http")
            ? cover.formats.large.url
            : `${process.env.STRAPI_PUBLIC_URL}${cover.formats.large.url}`}
          alt={cover.alternativeText || post.title}
          width={800}
          height={400}
        />
      )}

    <article>
      {post && post.content ? (
        <BlocksRenderer content={post.content} />
      ) : (
        <p>No content found for this post.</p>
      )}
    </article>    

      {gallery.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Galeria</h2>
          <div className="grid grid-cols-2 gap-4">
            {gallery.map((item: any) => {
              const m = item;
              const url = m.url.startsWith("http")
                ? m.url
                : `${process.env.STRAPI_PUBLIC_URL}${m.url}`;
              if (m.mime.startsWith("image/")) {
                return (
                  <Image
                    key={m.formats.thumbnail.url}
                    src={url}
                    alt={m.alternativeText || ""}
                    width={400}
                    height={300}
                  />
                );
              }
              if (m.mime.startsWith("video/")) {
                return (
                  <video key={m.url} controls className="w-full h-auto">
                    <source src={url} type={m.mime} />
                  </video>
                );
              }
              return null;
            })}
          </div>
        </section>
      )}
    </main>
  );
}