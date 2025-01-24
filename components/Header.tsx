'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from '@/context/SearchContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Header() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { state } = useCart();

  return (
    <header>
      <div className="bg-black w-full h-11 flex justify-center items-center relative max-lg:hidden">
        <p className="text-white text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <a href="#">
            <span className="font-bold ml-2 border-b-2">Shop Now</span>
          </a>
        </p>
        <div className="absolute right-36 flex items-center justify-center gap-3">
          <p className="text-white text-sm">English</p>
          <FontAwesomeIcon className="text-white" icon={faAngleDown} />
        </div>
      </div>

      <div className="w-full h-20 border-b-2 flex justify-around items-end bg-white max-lg:h-auto max-lg:flex-wrap">
        <div className="h-1/2 w-full flex justify-around items-center mb-2 max-lg:flex-col max-lg:gap-2">
          <h1 className="text-2xl font-bold">TrendLine</h1>

          <div className="flex gap-10">
            <Link href={'/'}> <p className="font-bold">Home</p></Link>
            <p className="font-bold">Contact</p>
            <p className="font-bold">About</p>
            <p className="font-bold">FAQ</p>
          </div>

          <div className="flex w-64 justify-between items-center">
            <div className="flex w-56 h-8 bg-gray-50 items-center">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="What are you looking for?"
                className="w-full border-none bg-transparent px-4 py-1 text-xs text-gray-900 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update global search query
              />
              <button className="m-2 rounded fill-black">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>

            <Link href="/cart">
              <button className="relative">
                <FontAwesomeIcon icon={faCartShopping} />
                {state.items.length > 0 && (
                  <span className="absolute bottom-2 right--1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    {state.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
