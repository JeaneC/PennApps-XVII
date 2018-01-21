import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import SessionReducer from '../reducers/SessionReducer';

export default () => {
	const store = createStore(
		combineReducers({
			session: SessionReducer
		}),
		compose(applyMiddleware(thunk))
	);

	return store;
};
