const Contact = require("../models/Contact");

const saveContact = async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    await newContact.save();
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true, message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete contact" });
  }
};

module.exports = { saveContact, getContacts, deleteContact };
