const { Router } = require("express");

const registerMail = require("../controller/mailer");

const router = Router();

router.post("/register_email", registerMail);

module.exports = router;
