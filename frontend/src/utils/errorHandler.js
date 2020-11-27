const errorHandler = fn => (...params) =>
fn(...params).catch(e => {	
	throw new Error(e.response.data.message);
});

export { errorHandler }