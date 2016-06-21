import configureDevStore from './configureDevStore.js';
import configureProdStore from './configureProdStore.js';


export default function configureStore(preloadedState) {

	console.log(process.env.NODE_ENV);
	if (process.env.NODE_ENV === 'development') {
		return configureDevStore(preloadedState);
	} 
	else {
		return configureProdStore(preloadedState);
	}
}