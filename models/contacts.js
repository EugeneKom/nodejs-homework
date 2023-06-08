const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find(({ id }) => id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => {
    return id === contactId;
  });

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
