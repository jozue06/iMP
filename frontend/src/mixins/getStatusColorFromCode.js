export default function getStatusColor(code) {
	switch(code) {
		case 0:
			return "success";
		case 1:
			return "secondary";
		case 2:	
			return "primary";
		case 3:	
			return "warning";
		case 4:	
			return "danger";
	}
}