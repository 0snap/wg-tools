console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
	module.exports = require('./configureDevStore.js');
} 
else {
	module.exports = require('./configureProdStore.js');
}
