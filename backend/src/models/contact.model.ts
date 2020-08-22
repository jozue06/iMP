import { model } from "mongoose";
import { ContactDocument } from "./contact.types";
import ContactSchema from "./contact.schema";

export const Contact = model<ContactDocument>("contact", ContactSchema);