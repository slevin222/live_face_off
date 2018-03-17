import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import finalScoreReducer from './finalScore_reducer';

export default combineReducers({
    form: formReducer,
    user: userReducer,
    finalScore: finalScoreReducer
});
