import "./globals.css";
import { headers } from 'next/headers';
import { fetchBrandConfig } from "./lib/api";
import { brandColors, BrandKey } from './lib/brands';
import Image from 'next/image';
import Link from 'next/link';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = headers();
  const hostname = (await heads).get('host');
  
  // Await na busca dos dados da marca no servidor
  const brandConfig = await fetchBrandConfig(hostname);
  const colors = brandColors[brandConfig.name as BrandKey] || brandColors.default;
  let divClasses = colors.bgColor + ' ' + colors.textColor || '';
  divClasses += ' flex flex-col min-h-screen';

  return (
    <html lang="pt-BR">
      <body>
        <div className={`${divClasses}`}>
          <header className="p-4 flex justify-between items-center">
            <Link href="/">
              <Image 
                src={`${process.env.STRAPI_PUBLIC_URL}${brandConfig.logoUrl}`} 
                alt={brandConfig.name + ' Logo'} 
                width={150} 
                height={50} 
              />
            </Link>
            <nav>
              <ul className="flex space-x-4">
                {brandConfig.menuItems.map((item: any) => (
                  <li key={item.id}>
                    <Link href={item.url} className="hover:text-gray-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main className="max-w-4xl mx-auto py-8">
              {children}
          </main>
          <footer className="p-4 mt-auto">
            <p className="text-center">© 2025 PoC Strapi</p>
          </footer>            
        </div>
      </body>
    </html>
  );
}
