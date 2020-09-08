export default () => {	
	if (process.env.NODE_ENV == "production") {
		return 'https://app-imp.herokuapp.com/';
	} else {
		return 'http://localhost:9090/';
	}
}