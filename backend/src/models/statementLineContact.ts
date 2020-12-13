export class StatementLineContact {
	firstName?: string;
	lastName?: string;
	address: string;
	city: string;
	state: string;
	email?: string;
	phone?: string;
	postalCode?: string;
	orgName?: string;
	district?: string;
	section?: string;
	accountNumber?: string;
	
	constructor(newContactObject:any) {
		this.firstName = newContactObject.firstName,
		this.lastName = newContactObject.lastName,
		this.address = newContactObject.address,
		this.city = newContactObject.city,
		this.state = newContactObject.state,
		this.email = newContactObject.email,
		this.phone = newContactObject.phone,
		this.postalCode = newContactObject.postalCode,
		this.orgName = newContactObject.orgName,
		this.district = newContactObject.district,
		this.section = newContactObject.section,
		this.accountNumber = newContactObject.accountNumber
	}
}