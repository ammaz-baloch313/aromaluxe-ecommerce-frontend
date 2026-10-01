import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderFooter.css";

function Header() {
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // ==========================
  // LOAD CART
  // ==========================

  const loadCart = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Cart Error:", error);
      setCart([]);
    }
  };

  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("loginuser") || "null"
      );

      setUser(savedUser);
      loadCart();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // ==========================
  // CART EVENTS
  // ==========================

  useEffect(() => {
    const updateCart = () => {
      loadCart();
    };

    const openCart = () => {
      loadCart();
      setCartOpen(true);
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("openCart", openCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("openCart", openCart);
    };
  }, []);

  // ==========================
  // CLOSE MENU
  // ==========================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = () => {
    localStorage.removeItem("loginuser");
    setUser(null);
    alert("Logout successfully");
    navigate("/login");
  };

  // ==========================
  // REMOVE CART ITEM
  // ==========================

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ==========================
  // CHANGE QUANTITY
  // ==========================

  const changeQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let quantity = Number(item.quantity) || 1;

        if (type === "plus") {
          quantity = quantity + 1;
        }

        if (type === "minus" && quantity > 1) {
          quantity = quantity - 1;
        }

        return {
          ...item,
          quantity: quantity,
        };
      }

      return item;
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ==========================
  // GET PRICE
  // ==========================

  const getPrice = (price) => {
    return (
      Number(
        String(price)
          .replace("Rs.", "")
          .replace(/,/g, "")
          .trim()
      ) || 0
    );
  };

  // ==========================
  // CART COUNT
  // ==========================

  const cartCount = cart.reduce(
    (total, item) => {
      return total + (Number(item.quantity) || 1);
    },
    0
  );

  // ==========================
  // TOTAL PRICE
  // ==========================

  const totalPrice = cart.reduce(
    (total, item) => {
      return (
        total +
        getPrice(item.price) *
          (Number(item.quantity) || 1)
      );
    },
    0
  );

  return (
    <>
      {/* ================= TOP BAR ================= */}

      <div className="top-bar">
        <div className="header-container top-content">

          <div className="top-contact">
            <span>
              <i>✉</i>
              info@aromaluxe.com
            </span>

            <span>
              <i>☎</i>
              +92 300 1234567
            </span>
          </div>

          <div className="social-icons">
            <a href="#facebook">f</a>
            <a href="#instagram">◎</a>
            <a href="#twitter">𝕏</a>
            <a href="#youtube">▶</a>
          </div>

        </div>
      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="luxury-navbar">

        <div className="header-container navbar-content">

          {/* LOGO */}

          <Link
            to="/"
            className="brand-logo"
            onClick={closeMenu}
          >
            Aroma<span>Luxe</span>
          </Link>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* NAVIGATION */}

          <div
            className={
              "navbar-menu " +
              (menuOpen ? "show" : "")
            }
          >

            <div className="nav-links">

              <Link
                to="/"
                onClick={closeMenu}
              >
                Home
              </Link>

              <Link
                to="/product"
                onClick={closeMenu}
              >
                Products
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </Link>

            </div>

            {/* NAV ICONS */}

            <div className="nav-icons">

              {/* SEARCH */}

              <button
                type="button"
                className="nav-icon-btn"
                onClick={() => {
                  alert("Search clicked");
                }}
              >
                🔍
              </button>

              {/* WISHLIST */}

              <button
                type="button"
                className="nav-icon-btn"
                onClick={() => {
                  alert("Wishlist clicked");
                }}
              >
                ♡
              </button>

              {/* CART */}

              <button
                type="button"
                className="cart-icon"
                onClick={() => {
                  loadCart();
                  setCartOpen(true);
                }}
              >
                🛒

                {cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* USER */}

              {user ? (
                <button
                  type="button"
                  className="user-btn"
                  onClick={logout}
                >
                  👤

                  <span>
                    {user.fullname || "Logout"}
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="user-icon"
                  onClick={closeMenu}
                >
                  👤
                </Link>
              )}

            </div>

          </div>

        </div>

      </nav>

      {/* ================= CART OVERLAY ================= */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => {
            setCartOpen(false);
          }}
        />
      )}

      {/* ================= CART SIDEBAR ================= */}

      <aside
        className={
          "cart-sidebar " +
          (cartOpen ? "open" : "")
        }
      >

        {/* CART HEADER */}

        <div className="cart-sidebar-header">

          <div>
            <h3>Shopping Cart</h3>

            <p>
              {cartCount}{" "}
              {cartCount === 1
                ? "item"
                : "items"}
            </p>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={() => {
              setCartOpen(false);
            }}
          >
            ✕
          </button>

        </div>

        {/* ================= EMPTY CART ================= */}

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h4>
              Your cart is empty
            </h4>

            <p>
              Add some products to your cart.
            </p>

            <button
              type="button"
              className="continue-shopping"
              onClick={() => {
                setCartOpen(false);
              }}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <>
            {/* ================= CART ITEMS ================= */}

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* IMAGE */}

                  <div className="cart-image">

                    <img
                      src={item.image}
                      alt={
                        item.title || "Product"
                      }
                    />

                  </div>

                  {/* DETAILS */}

                  <div className="cart-details">

                    <h4>
                      {item.title ||
                        item.name ||
                        "Product"}
                    </h4>

                    <p className="cart-price">
                      Rs.{" "}
                      {getPrice(
                        item.price
                      ).toLocaleString()}
                    </p>

                    {/* QUANTITY */}

                    <div className="quantity-box">

                      <button
                        type="button"
                        onClick={() => {
                          changeQuantity(
                            item.id,
                            "minus"
                          );
                        }}
                      >
                        −
                      </button>

                      <span>
                        {item.quantity || 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          changeQuantity(
                            item.id,
                            "plus"
                          );
                        }}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    🗑
                  </button>

                </div>

              ))}

            </div>

            {/* ================= CART FOOTER ================= */}

            <div className="cart-footer">

              <div className="cart-subtotal">

                <span>
                  Subtotal
                </span>

                <strong>
                  Rs.{" "}
                  {totalPrice.toLocaleString()}
                </strong>

              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout");
                }}
              >
                Proceed to Checkout
              </button>

              <button
                type="button"
                className="continue-shopping-footer"
                onClick={() => {
                  setCartOpen(false);
                }}
              >
                Continue Shopping
              </button>

            </div>

          </>

        )}

      </aside>
    </>
  );
}

export default Header;