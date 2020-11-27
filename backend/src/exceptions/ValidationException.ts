import HttpException from "./HttpException";

class ValidationException extends HttpException {
	constructor(message: any) {
		const errors:any = [];
		const map = new Map(Object.entries(JSON.parse(JSON.stringify(message))));		
		map.forEach((v:any, k:any) => {
			
			if (typeof v === 'object') {
				Object.values(v).forEach((e:any) => {
					if (e.message) {
						if (e.message.includes("Path")) {
							e.message = e.message.replace("Path ", "");
						}
						errors.push(e.message);
					}
				});
			} else if (v.message) {
				if (v.message.includes("Path")) {
					v.message = v.message.replace("Path ", "");
				}
				errors.push(v.message);
			} else if (k === "message" && !v.includes("validation failed")) {
				errors.push(v);
			}
		});
		console.log('errors', errors);
		
		super(422, errors);
	}
}

export default ValidationException;