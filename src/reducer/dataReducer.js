import {
    CHANGE_COUNTRY,
    GET_DAILY_DATA_BY_COUNTRY,
    GET_DAILY_GLOBAL_DATA,
    GET_TOTAL_DATA_BY_COUNTRY,
    GET_TOTAL_GLOBAL_DATA
} from "../actions/types";
const intialState={
    dailyData:[],
    totalData:{},
    country:{}
}

export default function(state=intialState,action)
{
    switch(action.type)
    {
        case GET_TOTAL_GLOBAL_DATA:
            return{
              ...state,totalData: action.payload, country: "global"
            };
        case GET_TOTAL_DATA_BY_COUNTRY:
            return{
                ...state,totalData: action.payload, country: action.country
            };
        case GET_DAILY_GLOBAL_DATA:
            return{
                ...state,dailyData: action.payload, country: "global"
            };
        case GET_DAILY_DATA_BY_COUNTRY:
            return{
                ...state,dailyData: action.payload, country: action.country
            };
        case CHANGE_COUNTRY:
            return{
                ...state,country: action.country,totalData: action.payload
            };
        default :
            return state;

    }
}