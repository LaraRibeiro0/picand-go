const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

router.get("/", [validateLogin, validateUser], ordersController.getFromUser);
router.get("/merchant", [validateLogin, validateUser, validateType.checkMerchant], ordersController.getFromMerchant);
router.post("/create", [validateLogin, validateUser], ordersController.create);
router.delete("/cancel", [validateLogin, validateUser], ordersController.cancel);

module.exports = router;