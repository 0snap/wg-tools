if (process.env.NODE_ENV === 'development') {
	module.exports = require('./RootDev.jsx');
} 
else {
	module.exports = require('./RootProd.jsx');
}