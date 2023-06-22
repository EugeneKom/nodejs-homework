const express = require("express");

const authController = require("../../controllers/auth-controller");

const { validateBody } = require("../../decorators");
const schemas = require("../../models/user");

const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authController.signup
);

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authController.signin
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  authController.changeSubscriptionType
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = router;
