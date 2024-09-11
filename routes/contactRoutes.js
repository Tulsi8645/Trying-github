const express = require("express");
const {
  saveContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

router.post("/submit-contact", saveContact);
router.get("/get-contacts", getContacts);
router.delete("/delete-contacts/:id", deleteContact);

module.exports = router;
