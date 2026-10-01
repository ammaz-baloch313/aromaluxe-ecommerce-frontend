import React, { useState } from "react";
import "./Product.css";

function Product() {
  const products = [
    {
      id: 1,
      title: "Royal Oud Premium Men's Fragrance Collection",
      price: "Rs. 2500.00",
      image:
        "https://www.junaidjamshed.com/cdn/shop/files/gold_1_02e43d2c-4eee-4278-acd5-55fd72237af1.jpg?v=1776978926&width=1100",
      category: "men",
    },
    {
      id: 2,
      title: "Midnight Essence Luxury Perfume For Men",
      price: "Rs. 2500.00",
      image:
        "https://www.junaidjamshed.com/cdn/shop/files/502_2__3_e4992cb8-8698-4391-b162-a2f2832d6226.jpg?v=1776978926&width=1130",
      category: "men",
    },
    {
      id: 3,
      title: "Bold Signature Long Lasting Men's Scent",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=13",
      category: "men",
    },
    {
      id: 4,
      title: "Elite Noir Exclusive Fragrance For Men",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=14",
      category: "men",
    },
    {
      id: 5,
      title: "Blooming Rose Elegant Women's Perfume",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=15",
      category: "women",
    },
    {
      id: 6,
      title: "Golden Petals Luxury Fragrance For Women",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=16",
      category: "women",
    },
    {
      id: 7,
      title: "Velvet Blossom Premium Women's Collection",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=17",
      category: "women",
    },
    {
      id: 8,
      title: "Crystal Bloom Long Lasting Women's Scent",
      price: "Rs. 2500.00",
      image: "https://picsum.photos/400/500?random=18",
      category: "women",
    },
  ];

  const [category, setCategory] = useState("all");
  const [animate, setAnimate] = useState(false);

  // ==========================
  // CATEGORY
  // ==========================

  const handleCategory = (value) => {
    if (value === category) return;

    setAnimate(true);

    setTimeout(() => {
      setCategory(value);
      setAnimate(false);
    }, 250);
  };

  // ==========================
  // ADD TO CART
  // ==========================

  const addToCart = (product) => {
    let cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity =
        (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Header cart update
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Automatically open right sidebar
    window.dispatchEvent(
      new Event("openCart")
    );
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category === category
        );

  return (
    <>
      {/* ================= BANNER ================= */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/product-banner.jpg"
              className="d-block w-100"
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}

      <section className="featured-products py-5">
        <div className="container">

          {/* CATEGORY BUTTONS */}

          <div className="category-buttons mb-5">

            <button
              className={
                category === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategory("all")
              }
            >
              Show All
            </button>

            <button
              className={
                category === "men"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategory("men")
              }
            >
              Men
            </button>

            <button
              className={
                category === "women"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategory("women")
              }
            >
              Women
            </button>

          </div>

          {/* PRODUCT ROW */}

          <div
            className={`row g-4 ${
              animate
                ? "fade-out"
                : "fade-in"
            }`}
          >

            {filteredProducts.map(
              (product) => (
                <div
                  className="col-lg-3 col-md-6"
                  key={product.id}
                >

                  <div className="product-card">

                    {/* IMAGE */}

                    <div className="image-wrapper">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid"
                      />

                      <button
                        className="wishlist-btn"
                        type="button"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>

                    </div>

                    {/* PRODUCT INFO */}

                    <div className="product-info">

                      <h5>
                        {product.title}
                      </h5>

                      {/* RATING */}

                      <div className="rating">

                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>

                        <span>
                          (5.0)
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="price">
                        {product.price}
                      </div>

                      {/* ADD TO CART */}

                      <button
                        className="cart-btn"
                        type="button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add To Cart
                      </button>

                    </div>
                  </div>

                </div>
              )
            )}

          </div>

        </div>
      </section>
    </>
  );
}

export default Product;