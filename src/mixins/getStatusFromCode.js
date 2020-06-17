export default function getStatusFromCode(code) {
	switch(code) {
		case 0:
			return "New Contact";
		case 1:
			return "Ok to Contact";
		case 2:	
			return "Supporter";
		case 3:	
			return "On Hold";
		case 4:	
			return "Do Not Contact";
	}
}