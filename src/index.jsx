import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './app.jsx';
import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

render(
	<AppContainer>
		<Provider store={store}>
			<App/>
		</Provider>
	</AppContainer>,
	document.querySelector('#app')
);

if (module && module.hot) {
	module.hot.accept('./app.jsx', () => {
		const App = require('./app.jsx').default;
		render(
			<AppContainer>
				<Provider store={store}>
					<App/>
				</Provider>
			</AppContainer>,
			document.querySelector('#app')
		);
	});
}
