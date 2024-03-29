/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useCart } from "../hooks/CartContext";

const fetcher = (url) => axios.get(url).then((res) => res.data);
function Image(props) {
  // Return an image element with the source and alt attributes
  return (
    <img
      loading="lazy"
      className="w-20 border shadow h-20 object-cover"
      src={props.src}
      alt={props.alt}
    />
  );
}
function Detail() {
  let { id } = useParams();
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const { cartItems, cartCount, addToCart } = useCart();
  const { data, isLoading, error } = useSWR(
    `https://dummyjson.com/products/${id}`,
    fetcher
  );
  if (isLoading) return <div> loading ....</div>;
  if (error) console.error(error.response.data.message);
  if (error) navigate("/");

  console.log(cartItems);
  console.log(cartCount);
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < data.stock) {
      setCount(count + 1);
    }
  };
  return (
    <main className="grid my-12 w-11/12 mx-auto md:grid-cols-2 gap-6">
      <section className="border p-2 w-full">
        <img
          loading="lazy"
          className="md:w-full md:h-[60vh]"
          src={data?.thumbnail}
          alt={data.title}
        />
        <div className="grid grid-flow-col gap-2 my-2">
          {data.images.map((image, index) => (
            <Image key={index} src={image} alt={index} />
          ))}
        </div>
      </section>

      <section className="px-12">
        <div className="flex flex-wrap  items-center gap-x-4">
          <h1 className="text-4xl">{data.title}</h1>
          <span>-</span>
          <h2 className="text-xl ">{data.brand}</h2>
        </div>
        <p className="py-4 leading-6">{data.description}</p>
        <div className="grid items-center grid-cols-3 gap-x-4">
          <span className="text-3xl font-serif">
            {data.price} <strong>$</strong>
          </span>
          <span>
            {data.rating} <strong>✨</strong>
          </span>
          <span>
            {data.stock} <strong>🏠</strong>
          </span>
        </div>
        <h1 className="mt-12 mb-4 capitalize">Items</h1>
        <div className="grid  grid-flow-col gap-3">
          <button
            onClick={handleDecrement}
            className="p-2 border rounded-full"
            disabled={count === 1}
          >
            -
          </button>
          <input
            className="border rounded-full px-3"
            onChange={(e) => setCount(e.target.value)}
            type="number"
            name="number"
            id="nummber"
            max={data.stock}
            value={count}
          />
          <button
            onClick={handleIncrement}
            className="p-2 border disabled:cursor-not-allowed rounded-full"
            disabled={count === data.stock}
          >
            +
          </button>
        </div>
        <div className="grid mt-12 gap-x-6 grid-cols-2">
          <button
            onClick={() => {
              if (count <= data.stock) {
                // Add the product to the cart
                addToCart({
                  id: data.id,
                  title: data.title,
                  price: data.price,
                  quantity: count,
                });
                // Handle placing an order with the selected quantity
                // You can add your logic here
              }
            }}
            disabled={count <= 0 || count > data.stock}
            className="border p-2 px-4 text-xl font-bold capitalize bg-slate-800 text-white rounded-md"
          >
            Add Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border p-2 px-4 text-xl font-bold capitalize rounded-md"
          >
            cancel
          </button>
        </div>
      </section>
    </main>
  );
}

export default Detail;
