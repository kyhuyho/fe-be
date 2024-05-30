const router = require("express").Router();
const ctrls = require("../controllers/payment");

router.post("/direct", ctrls.paymentDirect);

module.exports = router;
