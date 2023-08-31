import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Home() {
  const { data, isLoading } = useSWR(
    "https://dummyjson.com/products?skip=0&limit=60",
    fetcher
  );
  if (isLoading) return <div> loading ....</div>;
  const products = data.products;
  console.log(products);
  return (
    <main className="grid w-11/12 gap-12 mx-auto my-12 grid-cols-4">
      {products.map((item) => (
        <Link
          to={"detail/" + item.id}
          className="w-full cursor-pointer hover:shadow-xl border shadow-md"
          key={item.id}
        >
          <section>
            <div>
              <img
                loading="lazy"
                className="h-32 w-full object-cover"
                src={item.thumbnail}
                alt="img"
              />
            </div>
            <div className="bg-white p-4">
              <p>
                <span>{item.title}</span> -
                <span className="p-1 ml-2 capitalize text-sm rounded bg-slate-800 text-white">
                  {item.category}
                </span>
              </p>
              <p className="my-2">
                <span className="font-bold">{item.price} $</span> -
                <span>{item.rating} ✨</span>
              </p>
            </div>
          </section>
        </Link>
      ))}
    </main>
  );
}

export default Home;
