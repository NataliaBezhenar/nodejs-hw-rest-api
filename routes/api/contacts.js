const express = require("express");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  id: Joi.string(),
});

const router = express.Router();

const contactOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.getContactById(contactId);
    if (!result) {
      throwNotFoundError();
    }
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }
    const result = await contactOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throwNotFoundError();
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactOperations.updateContact(contactId, req.body);
    if (!result) {
      throwNotFoundError();
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

const throwNotFoundError = () => {
  const error = new Error("Not found");
  error.status = 404;
  throw error;
};

module.exports = router;
