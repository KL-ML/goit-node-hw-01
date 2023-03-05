const { Command } = require("commander");
const program = new Command();

const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const currentContact = await getContactById(id);
      if (!currentContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.table(currentContact);
      break;

    case "add":
        const newContactsList = await addContact(name, email, phone);
          console.log(`Contact ${name} was added sussesfull!`);
          console.table(newContactsList);
      break;

    case "remove":
          const newContactsListAfterDelete = await removeContact(id);
          if (!newContactsListAfterDelete) {
              throw new Error(`Contact with id=${id} not found`);
          }
          console.log(`Contact with ID=${id} was deleted!`);
          console.table(newContactsListAfterDelete);
          
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

