const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword, forgotpassword, resetPassword } = require("../controllers/UserController");




router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.get("/getUser", protect ,getUser);
router.get("/loggedin",loginStatus);
router.patch("/updateuser",protect,updateUser);
router.patch("/changepassword",protect,changePassword);
router.post("/forgotpassword",forgotpassword);
router.put("/resetpassword/:resetToken",resetPassword);



module.exports = router