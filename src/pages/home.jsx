import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { BiChevronsRight, BiChevronsLeft } from "react-icons/bi";
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24;

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "furniture",
    "tops",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  // Create URLs for different fetch scenarios
  const allProductsUrl = `https://dummyjson.com/products?skip=${
    (currentPage - 1) * itemsPerPage
  }&limit=${itemsPerPage}`;
  const categoryUrl = selectedCategory
    ? `https://dummyjson.com/products/category/${selectedCategory}`
    : null;
  const searchUrl = searchQuery
    ? `https://dummyjson.com/products/search?q=${searchQuery}&skip=${
        (currentPage - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    : null;

  const currentUrl = searchUrl || categoryUrl || allProductsUrl;

  const { data, error, isValidating } = useSWR(currentUrl, fetcher);
  if (error) return <div>Error while fetching data</div>;
  const products = data ? data.products : [];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="my-4 border p-1 rounded-md w-10/12 mx-auto"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="flex overflow-x-auto space-x-2 p-2">
        <button
          className={`category-button ${
            selectedCategory === "" ? "active" : ""
          }`}
          onClick={() => handleCategoryFilter("")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isValidating ? (
        <div className="h-screen text-center">Loading...</div>
      ) : (
        <main className="grid w-11/12 gap-4 mx-auto my-12 md:grid-cols-2 lg:grid-cols-4">
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
      )}
      <div className="w-full flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        >
          <BiChevronsLeft className="text-3xl hover:text-blue-700" />
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={products.length < itemsPerPage}
          className={`pagination-button ${
            products.length < itemsPerPage ? "disabled" : ""
          }`}
        >
          <BiChevronsRight className="text-3xl hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
}

export default Home;
