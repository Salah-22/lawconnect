"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type EventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type SetCategoryType = React.Dispatch<React.SetStateAction<string>>;
type SetSubcategoryType = React.Dispatch<React.SetStateAction<string>>;

const handleCategoryChange = (
  e: EventType,
  setCategory: SetCategoryType,
  setSubcategory: SetSubcategoryType
) => {
  setCategory(e.target.value);
  setSubcategory("");
};

const Search = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const router = useRouter();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = [
      name && `name=${encodeURIComponent(name)}`,
      category &&
        category.toLowerCase() !== "all" &&
        `category=${encodeURIComponent(category)}`,
      subcategory &&
        subcategory.toLowerCase() !== "all" &&
        `subcategory=${encodeURIComponent(subcategory)}`,
    ]
      .filter(Boolean)
      .join("&");

    router.push(`/products/?${queryString}`);
  };
  return (
    <form
      className="flex items-center justify-center mb-4 w-full"
      action=""
      onSubmit={submitHandler}
    >
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input
            type="search"
            placeholder="Search"
            id="form1"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-0">
          <select
            className="form-select"
            id="room_type_field"
            value={category}
            onChange={(e) =>
              handleCategoryChange(e, setCategory, setSubcategory)
            }
          >
            {["All", "Books", "Course"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {category && category !== "All" && (
          <div className="mb-0">
            <select
              className="form-select"
              id="subcategory_field"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              {category === "Books" ? (
                <>
                  <option value="">All</option>
                  <option value="Public Law">Public Law</option>
                  <option value="Private Law">Private Law</option>
                </>
              ) : category === "Course" ? (
                <>
                  <option value="">All</option>
                  <option value="Public Law">Public Law</option>
                  <option value="Private Law">Private Law</option>
                </>
              ) : null}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary" data-mdb-ripple-init>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
