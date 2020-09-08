export default () => {
	if (this.process.env == "production") {
		return 'https://app-imp.herokuapp.com/';
	} else {
		return 'http://localhost:9090';
	}
}