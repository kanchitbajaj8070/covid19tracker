import {combineReducers} from "redux";
import dataReducer from './dataReducer'
import tableReducer from "./tableReducer";
export default combineReducers({
        data:dataReducer,
    tableData:tableReducer
    }
)