import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

async function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	console.log('sending error');
	
	const status = error.status || 500;
	const message = error.message || 'Something went wrong';
	response.status(status).send({ status, message });
}

export default errorMiddleware;