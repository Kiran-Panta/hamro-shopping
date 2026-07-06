// import { ProductData } from "@/context/ProductContext";
// import React, { useState } from "react";
// import Loading from "../Loading";
// import ProductCard from "../ProductCard";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
// } from "../ui/pagination";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { categories, server } from "@/main";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Cookies from "js-cookie";

// const HomePage = () => {
//   const { products, page, setPage, fetchProducts, loading, totalPages } =
//     ProductData();

//   const nextPage = () => {
//     setPage(page + 1);
//   };
//   const prevPage = () => {
//     setPage(page - 1);
//   };

//   const [open, setOpen] = useState(false);

//   const [formData, setFromData] = useState({
//     title: "",
//     about: "",
//     category: "",
//     price: "",
//     stock: "",
//     images: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFromData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFromData((prev) => ({ ...prev, images: e.target.files }));
//   };

//   const submitHanlder = async (e) => {
//     e.preventDefault();

//     if (!formData.images || formData.images.length === 0) {
//       toast.error("Please select images");
//       return;
//     }

//     const myFrom = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       // if (key === "images") {
//       //   for (let i = 0; i < value.length; i++) {
//       //     // myFrom.append("files", value[i]);
//       //     myFrom.append("images", value[i]);
//       //   }
//       // }
//       if (key === "images") {
//         for (let i = 0; i < value.length; i++) {
//           myFrom.append("images", value[i]); // ✅ FIXED
//         }
//       } else {
//         myFrom.append(key, value);
//       }
//     });

//     try {
//       const { data } = await axios.post(`${server}/api/product/new`, myFrom, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           token: Cookies.get("token"),
//         },
//       });

//       toast.success(data.message);
//       setOpen(false);
//       setFromData({
//         title: "",
//         about: "",
//         category: "",
//         price: "",
//         stock: "",
//         images: null,
//       });
//       fetchProducts();
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between">
//         <h2 className="text-2xl font-bold">All Products</h2>

//         <Button onClick={() => setOpen(true)} className="mb-4">
//           Add Product
//         </Button>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger />

//           <DialogContent className="sm:max-w-[600px] rounded-2xl">
//             <DialogHeader>
//               <DialogTitle className="text-2xl font-bold">
//                 Add New Product
//               </DialogTitle>
//             </DialogHeader>

//             {/* <form onSubmit={submitHanlder} className="space-y-4 ">
//               <Input
//               className= "text-black"
//                 name="title"
//                 placeholder="Product Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//               <Input
//               className= "text-black"
//                 name="about"
//                 placeholder="About the product"
//                 value={formData.about}
//                 onChange={handleChange}
//                 required
//               />
//               <select
//               className= "text-black"
//                 name="category"
//                 placeholder="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//               >
//                 <option className= "text-black"  value={""}>Select Category</option>
//                 {categories.map((e) => {
//                   return (
//                     <option className= "text-black" value={e} key={e}>
//                       {e}
//                     </option>
//                   );
//                 })}
//               </select>
//               <Input
//               className= "text-black"
//                 name="price"
//                 placeholder="Product Price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//               <Input
//               className= "text-black"
//                 name="stock"
//                 placeholder="Product Stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 required
//               />
//               <Input
//               className= "text-black"
//                 type="file"
//                 name="images"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 required
//               />
//               <Button type="submit" className="w-full">
//                 Create Product
//               </Button>
//             </form> */}

//             <form onSubmit={submitHanlder} className="space-y-5 mt-4">
//               {/* Product Title */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Product Title
//                 </label>
//                 <Input
//                   name="title"
//                   placeholder="Enter product title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                   className="h-11 rounded-xl"
//                 />
//               </div>

//               {/* About */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Product Description
//                 </label>
//                 <Input
//                   name="about"
//                   placeholder="Describe your product"
//                   value={formData.about}
//                   onChange={handleChange}
//                   required
//                   className="h-11 rounded-xl"
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Category
//                 </label>

//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   required
//                   className="
//         w-full
//         h-11
//         px-3
//         rounded-xl
//         border
//         bg-background
//         outline-none
//         focus:ring-2
//         focus:ring-blue-500
//       "
//                 >
//                   <option value="">Select Category</option>

//                   {categories.map((e) => (
//                     <option value={e} key={e}>
//                       {e}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price + Stock */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Price (Rs)
//                   </label>
//                   <Input
//                     type="number"
//                     name="price"
//                     placeholder="0"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                     className="h-11 rounded-xl"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Stock
//                   </label>
//                   <Input
//                     type="number"
//                     name="stock"
//                     placeholder="0"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     className="h-11 rounded-xl"
//                   />
//                 </div>
//               </div>

//               {/* Images */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Product Images
//                 </label>

//                 <div
//                   className="
//         border-2
//         border-dashed
//         rounded-xl
//         p-6
//         text-center
//         hover:border-blue-500
//         transition
//       "
//                 >
//                   <Input
//                     type="file"
//                     name="images"
//                     multiple
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     required
//                     className="cursor-pointer"
//                   />

//                   <p className="text-sm text-muted-foreground mt-2">
//                     Upload multiple product images
//                   </p>
//                 </div>
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 className="
//       w-full
//       h-11
//       rounded-xl
//       font-semibold
//       text-base
//     "
//               >
//                 Create Product
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products && products.length > 0 ? (
//             products.map((e) => {
//               return <ProductCard product={e} key={e._id} latest={"no"} />;
//             })
//           ) : (
//             <p>NO Products yet</p>
//           )}
//         </div>
//       )}

//       <div className="mt-2 mb-3">
//         <Pagination>
//           <PaginationContent>
//             {page !== 1 && (
//               <PaginationItem className="cursor-pointer" onClick={prevPage}>
//                 <PaginationPrevious />
//               </PaginationItem>
//             )}

//             {page !== totalPages && (
//               <PaginationItem className="cursor-pointer" onClick={nextPage}>
//                 <PaginationNext />
//               </PaginationItem>
//             )}
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { ProductData } from "@/context/ProductContext";
import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { categories, server } from "@/main";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { products, page, setPage, fetchProducts, loading, totalPages } =
    ProductData();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, location.state?.refresh]);

  const [open, setOpen] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    about: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          form.append("images", value[i]);
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      const { data } = await axios.post(`${server}/api/product/new`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message);
      setOpen(false);
      setFormData({
        title: "",
        about: "",
        category: "",
        price: "",
        stock: "",
        images: null,
      });

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`${server}/api/product/${id}`, {
  //       headers: {
  //         token: Cookies.get("token"),
  //       },
  //     });

  //     toast.success("Product deleted");
  //     fetchProducts();
  //   } catch (err) {
  //     toast.error("Delete failed");
  //   }
  // };

  const deleteProduct = async (id) => {
    setDeletingId(id); // 👈 start loader

    try {
      await axios.delete(`${server}/api/product/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null); // 👈 stop loader
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/product/edit/${product._id}`);
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>

        <Button onClick={() => setOpen(true)}>Add Product</Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded-xl">
          <p>Total</p>
          <h3 className="text-2xl font-bold">{products.length}</h3>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-green-600">In Stock</p>
          <h3 className="text-2xl font-bold">
            {products.filter((p) => p.stock > 0).length}
          </h3>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-red-600">Out of Stock</p>
          <h3 className="text-2xl font-bold">
            {products.filter((p) => p.stock <= 0).length}
          </h3>
        </div>
      </div>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />

        <DialogContent className="sm:max-w-[600px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler} className="space-y-5 mt-4">
            <Input
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              name="about"
              placeholder="About Product"
              value={formData.about}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <Input
                name="price"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Input
                name="stock"
                placeholder="Stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* IMAGE PREVIEW */}
            {formData.images && (
              <div className="grid grid-cols-3 gap-2">
                {Array.from(formData.images).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    className="h-20 w-full object-cover rounded"
                  />
                ))}
              </div>
            )}

            <Button className="w-full">Create Product</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* PRODUCTS */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <div key={p._id} className="relative">
              {/* STOCK BADGE */}
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
                  p.stock > 0 ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {p.stock > 0 ? "In Stock" : "Out"}
              </span>

              <ProductCard product={p} latest={"no"} />

              {/* ADMIN ACTIONS */}
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => deleteProduct(p._id)}
                  disabled={deletingId === p._id}
                >
                  {deletingId === p._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem onClick={() => setPage(page - 1)}>
                <PaginationPrevious />
              </PaginationItem>
            )}

            {page !== totalPages && (
              <PaginationItem onClick={() => setPage(page + 1)}>
                <PaginationNext />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HomePage;
