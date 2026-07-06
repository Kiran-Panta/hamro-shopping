import { Product } from "../models/Product.js";
import TryCatch from "../utils/TryCatch.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import cloudinary from "cloudinary";

export const createProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { title, about, category, price, stock } = req.body;

  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({
      message: "no files to upload",
    });

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  const product = await Product.create({
    title,
    about,
    category,
    price,
    stock,
    images: uploadedImage,
  });

  res.status(201).json({
    message: "Product Created",
    product,
  });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const { search, category, page, sortByPrice } = req.query;

  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const limit = 8;

  const skip = (page - 1) * limit;

  let sortOption = { createdAt: -1 };

  if (sortByPrice) {
    if (sortByPrice === "lowToHigh") {
      sortOption = { price: 1 };
    } else if (sortByPrice === "highToLow") {
      sortOption = { price: -1 };
    }
  }

  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .skip(skip);

  const categories = await Product.distinct("category");

  const newProduct = await Product.find().sort("-createdAt").limit(4);

  const countProduct = await Product.countDocuments();

  const totalPages = Math.ceil(countProduct / limit);

  res.json({ products, categories, totalPages, newProduct });
});

export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const relatedProduct = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(4);

  res.json({ product, relatedProduct });
});

// export const updateProduct = TryCatch(async (req, res) => {
//   if (req.user.role !== "admin")
//     return res.status(403).json({
//       message: "You are not admin",
//     });

//   const { title, about, category, price, stock } = req.body;

//   const updateFields = {};

//   if (title) updateFields.title = title;
//   if (about) updateFields.about = about;
//   if (stock) updateFields.stock = stock;
//   if (price) updateFields.price = price;
//   if (category) updateFields.category = category;

//   const updatedProduct = await Product.findByIdAndUpdate(
//     req.params.id,
//     updateFields,
//     { new: true, runValidators: true }
//   );

//   if (!updatedProduct)
//     return res.status(404).json({
//       message: "Product not found",
//     });

//   res.json({
//     message: "Product Updated",
//     updatedProduct,
//   });
// });

// export const updateProduct = TryCatch(async (req, res) => {
//   if (req.user.role !== "admin")
//     return res.status(403).json({ message: "You are not admin" });

//   const product = await Product.findById(req.params.id);

//   if (!product)
//     return res.status(404).json({ message: "Product not found" });

//   const { title, about, category, price, stock } = req.body;

//   if (title) product.title = title;
//   if (about) product.about = about;
//   if (category) product.category = category;
//   if (price) product.price = price;
//   if (stock) product.stock = stock;

//   await product.save();

//   res.json({
//     message: "Product Updated",
//     product,
//   });
// });

// export const updateProduct = TryCatch(async (req, res) => {
//   const { id } = req.params;

//   const product = await Product.findById(id);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   const { title, about, price, stock, category } = req.body;

//   product.title = title || product.title;
//   product.about = about || product.about;
//   product.price = price || product.price;
//   product.stock = stock || product.stock;
//   product.category = category || product.category;

//   // 🚀 FIX FOR MEMORY STORAGE
//   if (req.files && req.files.length > 0) {
//     const uploadedImages = [];

//     for (let file of req.files) {
//       const result = await cloudinary.v2.uploader.upload_stream(
//         { resource_type: "image" },
//         (error, result) => {
//           if (result) {
//             uploadedImages.push({
//               url: result.secure_url,
//               id: result.public_id,
//             });
//           }
//         }
//       );

//       result.end(file.buffer);
//     }

//     product.images = uploadedImages;
//   }

//   await product.save();

//   res.json({
//     message: "Product updated successfully",
//     product,
//   });
// });

export const updateProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { title, about, price, stock, category } = req.body;

  product.title = title || product.title;
  product.about = about || product.about;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;

  // ✅ FIXED IMAGE UPLOAD (USING BUFFER GENERATOR LIKE CREATE PRODUCT)
  if (req.files && req.files.length > 0) {
    const uploadedImages = [];

    for (let file of req.files) {
      const fileBuffer = bufferGenerator(file);

      const result = await cloudinary.v2.uploader.upload(
        fileBuffer.content
      );

      uploadedImages.push({
        id: result.public_id,
        url: result.secure_url,
      });
    }

    product.images = uploadedImages;
  }

  await product.save();

  res.json({
    message: "Product updated successfully",
    product,
  });
});

export const updateProductImage = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { id } = req.params;
  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({
      message: "no files to upload",
    });

  const product = await Product.findById(id);

  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });

  const oldImages = product.images || [];

  for (const img of oldImages) {
    if (img.id) {
      await cloudinary.v2.uploader.destroy(img.id);
    }
  }

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  product.images = uploadedImage;

  await product.save();

  res.status(200).json({
    message: "Image updated",
    product,
  });
});

export const deleteProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // optional: delete cloudinary images
  for (const img of product.images) {
    if (img.id) {
      await cloudinary.v2.uploader.destroy(img.id);
    }
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
});