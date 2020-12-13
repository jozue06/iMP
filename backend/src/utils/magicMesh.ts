import { ContactDocument } from "../models/contact";
import { StatementLineContact } from "../models/statementLineContact";
// autoMesh strategy: if account number is the same OR if first name AND last name match
export const magicMeshPredicate = (contact: ContactDocument, newContact: StatementLineContact) => contact.accountNumber == newContact.accountNumber || (contact.firstName == newContact.firstName && contact.lastName == newContact.lastName);