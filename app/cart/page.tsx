'use client';

import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { state, removeFromCart, updateQuantity } = useCart();

  const handleProceedToCheckout = () => {
    // Implement your checkout logic here
    alert('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {state.items.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    className="w-16 text-center border border-gray-300 rounded"
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Details Form</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter your address"
                  rows={3}
                  required
                ></textarea>
              </div>
            </form>
          </div>

          <div className="text-right">
            <button
              onClick={handleProceedToCheckout}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
