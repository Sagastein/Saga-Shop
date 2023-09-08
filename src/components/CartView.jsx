/* eslint-disable no-unused-vars */
import { useCart } from "../hooks/CartContext";
import { useCartVisibility } from "../hooks/useCartVisibility";
import { FaTimes } from "react-icons/fa";
const CartPage = () => {
  const { cartItems, addToCart, removeItem, clearCart } = useCart();
  const { isCartVisible, hideCart } = useCartVisibility();
  const updateQuantity = (item, newQuantity) => {
    addToCart({ ...item, quantity: newQuantity });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <main
      id="sage"
      className={`${
        isCartVisible
          ? "absolute min-h-screen overflow-hidden bg-black/80 z-50 inset-0"
          : "hidden"
      } flex justify-center items-center`}
    >
      <div className="w-11/12 md:w-1/2  shadow-sm rounded-lg shadow-white bg-white p-10  mx-auto mt-8">
        <div className="flex justify-end">
          <FaTimes
            onClick={hideCart}
            className="text-2xl cursor-pointer hover:text-blue-900 hover:scale-110"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex justify-between flex-wrap items-center mb-2">
                  <h2 className="text-lg capitalize tracking-wider font-semibold">
                    {item.title}
                  </h2>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex w-full border items-center">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="p-1 px-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item, parseInt(e.target.value))
                    }
                    className="mx-2 w-32 text-center border rounded-lg"
                  />
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="p-1 px-3 text-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2">${item.price} each</p>
                <p className="mt-2 font-semibold">
                  ${item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-xl font-semibold">
          Total: ${total.toFixed(2)}
        </div>
        <div className="my-4 flex gap-4">
          <button
            disabled={cartItems.length === 0}
            className="border disabled:opacity-10 p-2 px-4 text-xl font-bold capitalize bg-slate-800 text-white rounded-md"
          >
            place order
          </button>
          <button
            onClick={clearCart}
            disabled={cartItems.length === 0}
            className="border disabled:opacity-60 p-2 px-4 text-xl font-bold capitalize bg-red-600 text-white rounded-md"
          >
            clear Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
