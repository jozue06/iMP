import HttpException from "./HttpException";

class NoUserException extends HttpException {
	constructor(message: string) {
		super(401, `${message}`);
	}
}

export default NoUserException;