export default function setContactInfo(otherLine, contact) {
	otherLine.firstName = contact.firstName;
	otherLine.lastName = contact.lastName;
	otherLine.address = contact.address;
	otherLine.city = contact.city;
}