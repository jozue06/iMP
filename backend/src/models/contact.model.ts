import { model } from "mongoose";
import { ContactDocument } from "./contact.types";
import Contact from "./contact.schema";

export const ContactSchema = model<ContactDocument>("contact", Contact);