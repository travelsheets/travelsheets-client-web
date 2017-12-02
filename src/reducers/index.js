import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import TravelsReducer from './TravelsReducer';
import TravelReducer from './TravelReducer';
import StepReducer from './StepReducer';
import TravelFormReducer from "./TravelFormReducer";
import NotificationReducer from "./NotificationsReducer";

export default combineReducers({
    routing: routerReducer,
    travels: TravelsReducer,
    TravelReducer: TravelReducer,
    TravelFormReducer: TravelFormReducer,
    StepReducer: StepReducer,
    NotificationReducer: NotificationReducer,
});