// constants/brands.ts

// Define the shape of a single brand color configuration
interface BrandConfig {
  bgColor: string;
  textColor: string;
}

// Define the shape of the entire brand configuration object
interface BrandColors {
  [key: string]: BrandConfig;
}

export const brandColors: BrandColors = {
  c6bank: {
    bgColor: 'bg-zinc-800',
    textColor: 'text-white',
  },
  sula: {
    bgColor: 'bg-white',
    textColor: 'text-blue-500',
  },
  inter: {
    bgColor: 'bg-orange-200',
    textColor: 'text-black',
  },
  default: {
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
  },
};

// Optional: Define a type for valid brand keys to use elsewhere
export type BrandKey = keyof typeof brandColors;
