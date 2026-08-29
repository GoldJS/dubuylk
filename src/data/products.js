// src/data/products.js
// Add, edit, or remove products by editing this array.
// id must be unique and URL-safe (used in the product page link).

const products = [
  {
    id: "versace-eros-100",
    name: "Eros Pour Femme",
    brand: "Versace",
    category: "Perfume",
    description: "A bold, energetic fragrance with a blend of fresh mint and warm vanilla.",
    story: "",
    notes: "Mint, green apple, tonka bean, vanilla, cedarwood",
    price_aed: 320,
    size_ml: 100,
    image_url: "/images/ErosFemme.png",
    in_stock: true,
    featured: true,
  },
  // Add more products below, following the same shape:
  // {
  //   id: "versace-another-one",
  //   name: "...",
  //   brand: "Versace",
  //   category: "Perfume",
  //   description: "...",
  //   story: "",
  //   notes: "...",
  //   price_aed: 0,
  //   size_ml: 0,
  //   image_url: "...",
  //   in_stock: true,
  //   featured: false,
  // },
];

export default products;