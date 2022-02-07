const router = require("express").Router();
const {
  createSessionHandler,
  getSessionHandler,
  logoutHandler,
} = require("../controllers/session-controller");

const {requireAuth} = require("../middlewares/requireAuth");

router.route("/session").post(createSessionHandler);

router.route("/session").get(requireAuth, getSessionHandler);

router.route("/session").delete(requireAuth,logoutHandler);

module.exports = router;
