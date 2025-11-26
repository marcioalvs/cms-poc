const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi:1337';

export async function fetchPosts() {
  const res = await fetch(`${STRAPI_URL}/api/posts?populate=*`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await res.json();
//  return data.data; // Strapi padrão: { data, meta }
  return data.data; // Strapi padrão: { data, meta }

}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  const data = await res.json();
  return data.data[0] || null;
}
