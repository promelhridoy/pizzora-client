export type PizzaSize = {
  label: string;
  price: number;
};

export type Pizza = {
  _id: string;
  name: string;
  description: string;
  category: "veg" | "non-veg" | "specialty";
  image?: string;
  available: boolean;
  sizes: PizzaSize[];
  rating?: number;
  reviewCount?: number;
};