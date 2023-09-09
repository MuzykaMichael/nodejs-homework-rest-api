const fs = require('fs/promises')

const path = require('path')

const crypto = require("crypto")

const contactsPath = path.join(process.cwd(),"models","contacts.json")

const listContacts = async() =>{
    const contacts = await readDb();
    return contacts
}

const getContactById = async(id) =>{
    const contacts = await readDb();
    const contact = await contacts.find(contact=>contact.id===id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"})
    }
    return contact
}

const addContact = async(body)=>{
    const contacts = await readDb();
    const newContact = {id:crypto.randomUUID(),...body}
    contacts.push(newContact);
    await writeDb(contacts)
    return newContact
}

const removeContact = async(id) =>{
    const contacts = await readDb();
    const contactToDelete = contacts.findIndex(contact=>contact.id===id);
    if (contactToDelete===-1){
        return null;
    }
    const deletedContact = contacts.splice(contactToDelete,1)
    await writeDb(contacts)
    return deletedContact;
}


const updateContact = async(body,id) =>{
    const contacts = await readDb();
    const updatedContact = {id,...body};
    const updateIndex = contacts.findIndex(contact=>contact.id===id);
    if (updateIndex===-1){
        return null;
    }
    contacts[updateIndex]=updatedContact;
    await writeDb(contacts);
    return(updatedContact)
}









const readDb = async() =>{
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const writeDb = async(data) =>{
    await fs.writeFile(contactsPath,JSON.stringify(data,null,2))
}





module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
