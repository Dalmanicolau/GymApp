import { combineReducers } from "redux";
import authReducer from './Auth';
import paymentsReducer from './Payments';
import dashboardReducer from "./Dashboard";
import {notificationsReducer}  from "./Notifications";

const rootReducer = combineReducers({
    auth: authReducer,
    payments: paymentsReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
});

export default rootReducer;