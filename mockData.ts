import { Product } from './types';

export const CATEGORIES = ['Laptopy', 'Smartfony', 'Akcesoria', 'Monitory', 'Podzespoły'];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "UltraBook Pro X1",
    category: "Laptopy",
    price: 4599.00,
    description: "Lekki i wydajny ultrabook do pracy biurowej i grafiki.",
    image: "https://picsum.photos/id/1/400/300",
    stock: 15,
    isFeatured: true
  },
  {
    id: 2,
    name: "Gaming Beast Z9",
    category: "Laptopy",
    price: 8299.99,
    description: "Potężna maszyna gamingowa z najnowszą kartą RTX.",
    image: "https://picsum.photos/id/2/400/300",
    stock: 5
  },
  {
    id: 3,
    name: "SmartPhone Galaxy S25",
    category: "Smartfony",
    price: 3999.00,
    description: "Flagowy model z niesamowitym aparatem i ekranem AMOLED.",
    image: "https://picsum.photos/id/3/400/300",
    stock: 20,
    isFeatured: true
  },
  {
    id: 4,
    name: "EcoPhone 12",
    category: "Smartfony",
    price: 1299.00,
    description: "Budżetowy smartfon z wytrzymałą baterią.",
    image: "https://picsum.photos/id/4/400/300",
    stock: 50
  },
  {
    id: 5,
    name: "Monitor 4K Creator",
    category: "Monitory",
    price: 2100.00,
    description: "Profesjonalny monitor z odwzorowaniem kolorów 100% sRGB.",
    image: "https://picsum.photos/id/5/400/300",
    stock: 8
  },
  {
    id: 6,
    name: "Klawiatura Mechaniczna RGB",
    category: "Akcesoria",
    price: 349.00,
    description: "Klawiatura z przełącznikami Blue i podświetleniem.",
    image: "https://picsum.photos/id/6/400/300",
    stock: 100
  },
  {
    id: 7,
    name: "Mysz Bezprzewodowa",
    category: "Akcesoria",
    price: 129.00,
    description: "Ergonomiczna mysz do pracy.",
    image: "https://picsum.photos/id/7/400/300",
    stock: 45
  },
  {
    id: 8,
    name: "Dysk SSD 1TB NVMe",
    category: "Podzespoły",
    price: 450.00,
    description: "Superszybki dysk twardy nowej generacji.",
    image: "https://picsum.photos/id/8/400/300",
    stock: 30
  }
];