"use client";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

import { usePathname, useRouter } from "next/navigation";
const Filters = () => {
  let queryparams;
  const router = useRouter()
  const pathname = usePathname()
  function checkhandler(checkBoxType, checkBoxValue) {
    // console.log(checkBoxType, checkBoxValue)
    if (typeof window !== "undefined") {
      queryparams = new URLSearchParams(window.location.search);

    }

    if (typeof window !== "undefined") {
      const value = queryparams.get(checkBoxType);
      // console.log(value)
      if (checkBoxValue === value) return true
      return false
    }

  }
  
  let filterobj = {
    category: [],
    rating: [],
    price: {
      min: "",
      max: ""
    }
  }

  const [filters, setFilters] = useState(filterobj)
  const [price, setPrice] = useState({ min: "", max: "" })

  function setfilterItems(key, value, type) {
    // console.log(key,value)
    if (key === "price") {
      setFilters(prevFilters => ({
        ...prevFilters,
        price: value
      }));
    }
    else if (!filters[key].includes(value) && (key !== "price")) {
      setFilters({ ...filters, [key]: [...filters[key], value] })
    }
    else if (filters[key].includes(value)) {
      let remove_filter = filters[key].filter((v) => v != value)
      setFilters((s) => ({ ...s, [key]: remove_filter }))


    }

  }
// console.log(pathname)
  async function searchFilters() {
    var appliedFilters = {}
    for (var key in filters) {
      if (filters[key].length > 0 || key == "price" && (filters[key].min || filters[key].max))
        appliedFilters[key] = filters[key] 
    }
    if(Object.entries(appliedFilters).length > 0){
      let jsonfilters = JSON.stringify(appliedFilters);
      queryparams.set("filters", jsonfilters)
      let params = queryparams.toString();
      router.push(`?${params}`)
    }
    else{
      router.push(`${pathname}`)
    }
  }
  // console.log(filters)
  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              min={100}
              onChange={(e) => setPrice({ ...price, min: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              min={price.min}
              onChange={(e) => setPrice({ ...price, max: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <button
              onClick={() => setfilterItems("price", price)}
              className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Category</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Electronics"
                className="h-4 w-4"
                defaultChecked={checkhandler("category", "Electronics")}
                checked={filters.category.includes("Electronics")}
                onChange={() => setfilterItems("category", "Electronics")}
              />
              <span className="ml-2 text-gray-500"> Electronics </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Laptops"
                className="h-4 w-4"
                defaultChecked={checkhandler("category", "Laptops")}
                checked={filters.category.includes("Laptops")}
                onChange={() => setfilterItems("category", "Laptops")}
              />
              <span className="ml-2 text-gray-500"> Laptops </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Toys"
                className="h-4 w-4"
                defaultChecked={checkhandler("category", "Toys")}
                checked={filters.category.includes("Toys")}
                onChange={() => setfilterItems("category", "Toys")}
              />
              <span className="ml-2 text-gray-500"> Toys </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Office"
                className="h-4 w-4"
                defaultChecked={checkhandler("category", "Office")}
                checked={filters.category.includes("Office")}
                onChange={() => setfilterItems("category", "Office")}
              />
              <span className="ml-2 text-gray-500"> Office </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Beauty"
                className="h-4 w-4"
                defaultChecked={checkhandler("category", "Beauty")}
                checked={filters.category.includes("Beauty")}
                onChange={() => setfilterItems("category", "Beauty")}
              />
              <span className="ml-2 text-gray-500"> Beauty </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Ratings</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkhandler("ratings", `${rating}`)}
                  onChange={() => setfilterItems("rating", rating)}
                />
                <span className="ml-2 text-gray-500">
                  {" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={rating}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />{" "}
                </span>
              </label>
            ))}
          </li>
        </ul>
        <button
          className="px-2  mt-2 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          onClick={searchFilters}
        >Search</button>
        <button onClick={()=>{
          router.push("/")
          setFilters(filterobj)

        }}
        className="px-2  mt-2 py-2 text-center w-full inline-block text-white bg-slate-600 border border-transparent rounded-md hover:bg-blue-700"
        >Clear</button>
      </div>
    </aside>
  )
}

export default Filters
