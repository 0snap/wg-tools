import * as RootDev from './RootDev.jsx';
import * as RootProd from './RootProd.jsx';

if (process.env.NODE_ENV === 'development') {
	module.exports = RootDev;
} 
else {
	module.exports = RootProd;
}