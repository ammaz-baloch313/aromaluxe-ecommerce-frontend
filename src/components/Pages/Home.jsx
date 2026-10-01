import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // FETCH PRODUCTS FROM API
  // ==========================

  useEffect(() => {
    fetch("https://inside-dev.com/api/fragrance")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("API DATA:", data);

        // API response ke structure ke according
        // pehle 4 products show honge
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Products load nahi ho sake.");
        setLoading(false);
      });
  }, []);

  // ==========================
  // ADD TO CART
  // ==========================

  const addToCart = (product) => {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (error) {
      cart = [];
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: updatedCart,
      })
    );

    window.dispatchEvent(
      new CustomEvent("openCart", {
        detail: updatedCart,
      })
    );
  };

  return (
    <>
      {/* ================= BANNER ================= */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
      >
        <div className="carousel-indicators">

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="/images/Perfume-4.jpg"
              className="d-block w-100"
              alt="Men's Fragrance"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/Perfume-2.jpg"
              className="d-block w-100"
              alt="Women's Fragrance"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/Perfume-3.jpg"
              className="d-block w-100"
              alt="Luxury Perfume"
            />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>
        </button>

      </div>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="featured-products py-5">

        <div className="container">

          <h2 className="section-title text-center mb-5">
            Featured Products
          </h2>

          {/* LOADING */}

          {loading && (
            <div className="text-center">
              <p>Loading products...</p>
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="text-center text-danger">
              <p>{error}</p>
            </div>
          )}

          {/* PRODUCTS */}

          {!loading && !error && (
            <div className="row g-4">

              {products.map((product) => (

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
                        type="button"
                        className="wishlist-btn"
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
                        Rs. {product.price}
                      </div>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default Home;