'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import { useSearch } from '@/context/SearchContext';

// Image URL Builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// Type Definitions
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  category: string;
  discountPercent?: number;
  new?: boolean;
  colors?: string[];
  sizes?: string[];
}

export default function ProductsPage() {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch Products on Mount
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: Product[] = await client.fetch(`*[_type == "products"]`);
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  // Filter Products by Search Query
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 max-sm:p-0 cursor-pointer">
              {product.image && (
                <div className="flex items-center justify-center">
                  <Image
                    src={urlFor(product.image).width(300).height(300).url()}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              )}
              <div className='max-sm:p-4'>
              <h2 className="max-sm:text-sm text-xl font-semibold mt-4 max-sm:mt-0">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="mt-2 text-gray-800">${product.price.toFixed(2)}</p>
              {product.new && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded">
                  New
                </span>
              )}
              {product.discountPercent && product.discountPercent > 0 && (
                <p className="text-red-500 font-bold">
                  {product.discountPercent}% Off!
                </p>
              )}
              <div className="mt-2 flex gap-2">
                {product.colors?.map((color, index) => (
                  <span
                    key={index}
                    className="block max-sm:w-3 max-sm:h-3 w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold">Sizes:</p>
                <p>{product.sizes?.join(', ')}</p>
              </div>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
