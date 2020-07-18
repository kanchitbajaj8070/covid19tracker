import {GET_TABLE_DATA} from "../actions/types";
const intialState={
    data:[]
}
export default function(state=intialState,action)
{
    switch(action.type)
    {

        case GET_TABLE_DATA:
            return{
                ...state,data: action.payload
            };
        default :return state;
    }
}