const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
    try {
        const contactsList = JSON.parse(await fs.readFile(contactsPath));
        return contactsList;
    } catch (err) {
        console.log('||==========>>>>>>>>>>');
        console.log(err.message);
        console.log('<<<<<<<<<<<===========||');
     }
}

async function getContactById(contactId) {
    try {
        const contactsList = await listContacts();

        const contactById = contactsList.find(с => с.id === String(contactId));
        
        return contactById || null;
    } catch (err) {
        console.log('||==========>>>>>>>>>>');
        console.log(err.message);
        console.log('<<<<<<<<<<<===========||');
     }
}

async function removeContact(contactId) {
    try {
        const contactsList = await listContacts();
        const currentContactForDelete = await getContactById(contactId);
        
        if (!currentContactForDelete) {
            return null;
        }
        
        const contactsListAfterDel = contactsList.filter(c => c.id !== String(contactId));
        
        await fs.writeFile(contactsPath, JSON.stringify(contactsListAfterDel, null, 2));
        
        return contactsListAfterDel;

    } catch (err) {
        console.log('||==========>>>>>>>>>>');
        console.log(err.message);
        console.log('<<<<<<<<<<<===========||');
     }
}

async function addContact(name, email, phone) {
  try {
      const newContact = { id: shortid.generate(), name, email, phone }
      
      const contactsList = await listContacts();
      
      const newContactList = [...contactsList, newContact];
    
      await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
      
      return newContactList;

    } catch (err) {
        console.log('||==========>>>>>>>>>>');
        console.log(err.message);
        console.log('<<<<<<<<<<<===========||');
     }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};