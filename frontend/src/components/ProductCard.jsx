// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Heart } from "lucide-react";
// import { WishlistData } from "@/context/WishlistContext";

// const ProductCard = ({ product, latest }) => {
//   const navigate = useNavigate();
//   const { wishlist, toggleWishlist } = WishlistData();

//   // check if product is in wishlist
//   const isLiked = wishlist?.some((item) => (item._id || item) === product._id);

//   return (
//     <div
//       className="
//     group
//     w-full
//     max-w-[300px]
//     mx-auto
//     overflow-hidden
//     rounded-2xl
//     border
//     border-gray-200
//     dark:border-gray-800
//     bg-white
//     dark:bg-[#121423]
//     shadow-sm
//     hover:shadow-xl
//     transition-all
//     duration-300
//     flex
//     flex-col
//     h-[460px]
//   "
//     >
//       {/* IMAGE */}
//       <Link to={`/product/${product._id}`}>
//         <div className="relative h-[240px] flex items-center justify-center bg-gray-50 dark:bg-[#111214]">
//           {/* <img
//             src={product.images[0].url}
//             alt={product.title}
//             className="h-40 object-contain transition-transform duration-500 group-hover:scale-110"
//           /> */}

//           <img
//             src={product?.images?.[0]?.url || "/placeholder.png"}
//             alt={product?.title || "product"}
//             className="h-45 object-contain transition-transform duration-500 group-hover:scale-110"
//           />

//           {/* NEW BADGE */}
//           {latest === "yes" && (
//             <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
//               New
//             </Badge>
//           )}

//           {/* ❤️ WISHLIST BUTTON */}
//           <button
//             onClick={(e) => {
//               e.preventDefault(); // prevent navigation
//               toggleWishlist(product._id);
//             }}
//             className="
//               absolute top-3 right-3
//               bg-white dark:bg-gray-900
//               p-2 rounded-full shadow-md
//               hover:scale-110 transition
//             "
//           >
//             <Heart
//               className={`w-5 h-5 transition ${
//                 isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
//               }`}
//             />
//           </button>
//         </div>
//       </Link>

//       {/* INFO */}

//       <div className="p-5 flex flex-col flex-1">
//         <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 min-h-[28px]">
//           {product.title}
//         </h3>

//         <p
//           className="
//       text-sm
//       text-gray-500
//       dark:text-gray-400
//       line-clamp-2
//       mt-2
//       min-h-[40px]
//     "
//         >
//           {product.about}
//         </p>

//         <div className="mt-4">
//           <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//             Rs {product.price}
//           </span>
//         </div>

//         <Button
//           onClick={() => navigate(`/product/${product._id}`)}
//           className="
//       mt-auto
//       w-full
//       bg-gray-800
//       hover:bg-blue-600
//       text-white
//     "
//         >
//           View Product
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Heart } from "lucide-react";
// import { WishlistData } from "@/context/WishlistContext";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { server } from "@/main";
// import { UserData } from "@/context/UserContext";

// const ProductCard = ({ product, latest }) => {
//   const navigate = useNavigate();
//   const { wishlist, toggleWishlist } = WishlistData();
//   const { user } = UserData();

//   // check if product is in wishlist
//   const isLiked = wishlist?.some((item) => (item._id || item) === product._id);

//   // ✅ TEMP: replace later with real auth role
//   const isAdmin = user?.role === "admin";

//   // DELETE PRODUCT
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${server}/api/product/${id}`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       toast.success("Product deleted");
//       window.location.reload(); // you can replace with fetchProducts later
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Delete failed");
//     }
//   };

//   return (
//     <div
//       className="
//         group
//         w-full
//         max-w-[300px]
//         mx-auto
//         overflow-hidden
//         rounded-2xl
//         border
//         border-gray-200
//         dark:border-gray-800
//         bg-white
//         dark:bg-[#121423]
//         shadow-sm
//         hover:shadow-xl
//         transition-all
//         duration-300
//         flex
//         flex-col
//         h-[460px]
//       "
//     >
//       {/* IMAGE */}
//       <Link to={`/product/${product._id}`}>
//         <div className="relative h-[240px] flex items-center justify-center bg-gray-50 dark:bg-[#111214]">
//           <img
//             src={product?.images?.[0]?.url || "/placeholder.png"}
//             alt={product?.title || "product"}
//             className="h-45 object-contain transition-transform duration-500 group-hover:scale-110"
//           />

//           {/* NEW BADGE */}
//           {latest === "yes" && (
//             <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
//               New
//             </Badge>
//           )}

//           {/* ❤️ WISHLIST */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               toggleWishlist(product._id);
//             }}
//             className="
//               absolute top-3 right-3
//               bg-white dark:bg-gray-900
//               p-2 rounded-full shadow-md
//               hover:scale-110 transition
//             "
//           >
//             <Heart
//               className={`w-5 h-5 transition ${
//                 isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
//               }`}
//             />
//           </button>
//         </div>
//       </Link>

//       {/* INFO */}
//       <div className="p-5 flex flex-col flex-1">
//         <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 min-h-[28px]">
//           {product.title}
//         </h3>

//         <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 min-h-[40px]">
//           {product.about}
//         </p>

//         <div className="mt-4">
//           <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
//             Rs {product.price}
//           </span>
//         </div>

//         {/* VIEW BUTTON */}
//         <Button
//           onClick={() => navigate(`/product/${product._id}`)}
//           className="mt-auto w-full bg-gray-800 hover:bg-blue-600 text-white"
//         >
//           View Product
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { WishlistData } from "@/context/WishlistContext";

const ProductCard = ({ product, latest }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = WishlistData();

  const isLiked = wishlist?.some(
    (item) => (item._id || item) === product._id
  );

  return (
    <div className="group w-full max-w-[300px] mx-auto overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121423] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[460px]">

      {/* IMAGE */}
      <Link to={`/product/${product._id}`}>
        <div className="relative h-[240px] flex items-center justify-center bg-gray-50 dark:bg-[#111214]">

          <img
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.title || "product"}
            className="h-45 object-contain transition-transform duration-500 group-hover:scale-110"
          />

          {/* NEW */}
          {latest === "yes" && (
            <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
              New
            </Badge>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product._id);
            }}
            className="absolute top-3 right-3 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <Heart
              className={`w-5 h-5 transition ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </Link>

      {/* INFO */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 min-h-[28px]">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 min-h-[40px]">
          {product.about}
        </p>

        <div className="mt-4">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Rs {product.price}
          </span>
        </div>

        <Button
          onClick={() => navigate(`/product/${product._id}`)}
          className="mt-auto w-full bg-gray-800 hover:bg-blue-600 text-white"
        >
          View Product
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;