const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi:1337';

export async function fetchPosts() {
  const res = await fetch(`${STRAPI_URL}/api/posts?populate=*`, { cache: 'no-store' });

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

// Função para buscar a configuração da marca do Strapi
export async function fetchBrandConfig(hostname: string | null) {
  
  // No Strapi, filtre pelo campo nome_dominio que você criou
//  const res = await fetch(`${STRAPI_URL}/api/brands?filters[domainName][$eq]=${hostname}`, {
//    cache: 'force-cache' // Cache a resposta para performance em produção
//  });
  const res = await fetch(`${STRAPI_URL}/api/brands?filters[domainName][$eq]=${hostname}&populate=*`);
  
  if (!res.ok) {
    console.error("Falha ao buscar config da marca:", res.statusText);
    // Retorna uma configuração padrão se der erro
    return {
        primaryColor: '#0070f3',
        logoUrl: '/default-logo.svg',
        name: 'Plataforma Default',
        menuItems: [],
        layoutClasses: ''
    };
  }

  const data = await res.json();
  const brandData = data.data[0];

  if (brandData) {
    return {
        primaryColor: brandData.primaryColor,
        logoUrl: brandData.logoImage.url,
        name: brandData.name,
        menuItems: brandData.MenuLinks || [],
        layoutClasses: brandData.layoutClasses || ''
    };
  }

  // Retorna padrão se o domínio não for encontrado no Strapi
  return {
    primaryColor: '#0070f3',
    logoUrl: '/default-logo.svg',
    name: 'Plataforma Default',
    menuItems: [],
    layoutClasses: ''
  };
}