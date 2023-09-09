const express = require('express')
const { getContacts,
  getContact,
  createContact,
  deleteContact,refreshContact } = require('../../controllers/contactsControllers');

const {validateBody, addContactValidationSchema} = require('../../validate/validator.js')

const router = express.Router()

router.get("/", getContacts)

router.get("/:id", getContact)

router.post("/",validateBody(addContactValidationSchema),createContact)

router.delete("/:id", deleteContact)

router.put("/:id",validateBody(addContactValidationSchema) , refreshContact)

module.exports = router
