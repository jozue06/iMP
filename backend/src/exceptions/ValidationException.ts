import { type } from "os";
import HttpException from "./HttpException";

class ValidationException extends HttpException {
	constructor(message: any) {
		if (message.CastError) {
			message = message.CastError;
		}
		super(422, `${message}`);
	}
}

export default ValidationException;