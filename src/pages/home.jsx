import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { BiChevronsRight, BiChevronsLeft, BiSearch } from "react-icons/bi";
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
  function SkeletonLoading() {
    return (
      <div className="w-full">
        <div className="grid w-11/12 gap-12 mx-auto my-12 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="w-full border shadow-md animate-pulse">
              <div className="h-40 bg-gray-200"></div>
              <div className="bg-white p-4">
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex rounded-lg shadow w-5/12 border items-center mx-6 my-2">
        <input
          type="search"
          className="bg-purple-white outline-none  flex-1  rounded-lg border-0 p-3"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="text-purple-lighter">
          <BiSearch className="text-3xl" />
        </div>
      </div>

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
        <SkeletonLoading />
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
