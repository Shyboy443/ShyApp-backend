const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createProduct, getProduct, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { upload } = require("../utills/fileupload");
const router = express.Router();




router.post("/",protect,upload.single("image"),createProduct)
router.patch("/:id",protect,upload.single("image"),updateProduct)
router.get("/",protect,getProduct)
router.get("/:id",protect,getSingleProduct)
router.delete("/:id",protect,deleteProduct)



module.exports = router;