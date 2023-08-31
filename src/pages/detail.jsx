/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
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
  const { data, isLoading } = useSWR(
    `https://dummyjson.com/products/${id}`,
    fetcher
  );
  if (isLoading) return <div> loading ....</div>;
  console.log(data);

  return (
    <main className="grid my-12 w-11/12 mx-auto grid-cols-2 gap-6">
      <section className="border p-2 w-full">
        <img
          loading="lazy"
          className="w-full h-[60vh]"
          src={data.thumbnail}
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
            onClick={() => setCount(count - 1)}
            className="p-2 border rounded-full"
          >
            -
          </button>
          <input
            className="border rounded-full px-3"
            type="number"
            name="number"
            id="nummber"
            value={count}
          />
          <button
            onClick={() => setCount(count + 1)}
            className="p-2 border rounded-full"
          >
            +
          </button>
        </div>
        <div className="grid mt-12 gap-x-6 grid-cols-2">
          <button className="border p-2 px-4 text-xl font-bold capitalize bg-slate-800 text-white rounded-md">
            place order
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
