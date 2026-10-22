import type { Pizza } from "../types/pizza";

export const pizzas: Pizza[] = [
  {
    id: "1",
    name: "Margherita",
    description: "Classic pizza with tomato, mozzarella and fresh basil.",
    price: 299,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    category: "Classic",
    rating: 4.8,
    available: true,
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Loaded with spicy pepperoni and melted mozzarella.",
    price: 399,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
    category: "Popular",
    rating: 4.9,
    available: true,
  },
  {
    id: "3",
    name: "BBQ Chicken",
    description: "Juicy chicken, BBQ sauce, onion and mozzarella.",
    price: 449,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    category: "Chicken",
    rating: 4.7,
    available: true,
  },
  {
    id: "4",
    name: "Veggie Delight",
    description: "Fresh vegetables, mozzarella and delicious tomato sauce.",
    price: 349,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
    category: "Vegetarian",
    rating: 4.6,
    available: true,
  },
];