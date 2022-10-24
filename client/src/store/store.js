import { createStore , applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


console.log('Estado Inicial', store.getState());
store.subscribe(()=>{
    console.log('Cambios en el store' , store.getState())
});



export default store;