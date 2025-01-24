'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';

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

export default function ProductPage() {
  const params = useParams(); // Unwrap params
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = `*[_type == "products" && _id == $id][0]`;
        const fetchedProduct: Product | null = await client.fetch(query, { id: params?.id });
        if (!fetchedProduct) {
          router.push('/404'); // Redirect to a 404 page if product not found
        } else {
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchProduct();
  }, [params, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return null; // Avoid rendering anything if no product is found (handled by redirect)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 flex justify-center">
            {product.image && (
              <Image
                src={urlFor(product.image).width(600).height(600).url()}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-2">{product.category}</p>
            <p className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
            {product.discountPercent && (
              <p className="mt-2 text-red-500 font-bold">
                {product.discountPercent}% Off!
              </p>
            )}
            <p className="mt-4 text-gray-700">{product.description}</p>
            {product.colors && (
              <div className="mt-4">
                <p className="font-semibold">Available Colors:</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="block w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
            {product.sizes && (
              <div className="mt-4">
                <p className="font-semibold">Available Sizes:</p>
                <p>{product.sizes.join(', ')}</p>
              </div>
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>
                addToCart({ id: product._id, name: product.name, price: product.price })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
