const express = require("express");

const authController = require("../../controllers/auth-controller");

const { validateBody } = require("../../decorators");
const schemas = require("../../models/user");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

router.post(
  "/users/login",
  validateBody(schemas.userLoginSchema),
  authController.signin
);

router.get("/users/current", authenticate, authController.getCurrent);

router.post("/users/logout", authenticate, authController.logout);

router.patch(
  "/users/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  authController.changeSubscriptionType
);

module.exports = router;
