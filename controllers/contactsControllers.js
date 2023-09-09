const {listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact} = require("../models/contacts")

const getContacts = async(req,res,next) =>{
    const contacts = await listContacts();
    res.json(contacts)
 }

const getContact = async(req,res,next) => {
    const contact = await getContactById(req.params.id);
    if(!contact){
        res.status(404).json({"message":"Not found"})
    }
    res.json(contact)
}

const createContact = async(req,res,next) =>{
    const newContact = await addContact(req.body);
    console.log(req.body);
    res.status(201).json(newContact);
}

const deleteContact = async(req,res,next) =>{
    const deletedContact = await removeContact(req.params.id);
    console.log(deletedContact)
    if(!deletedContact){
        res.status(404).json({"message":"Not found"})
    }
    res.status(200).json(deletedContact)
}

const refreshContact =async(req,res,next) => {
    const updatedContact = await updateContact(req.body,req.params.id);
    if(!updatedContact){
        res.status(404).json({"message":"Not found"})
    }
    res.json(updatedContact)
}



module.exports = {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    refreshContact,
}