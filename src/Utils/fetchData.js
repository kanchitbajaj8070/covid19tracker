
import  axios from 'axios';
import {API_URL, COUNTRIES} from "../Constants";
import React from "react";

export const countriesToCodesMapping=()=>{
    const countries=COUNTRIES;
    const mapped=countries.map((obj)=>
        ({
            country:obj.name,
            code:obj['alpha-3']
        })
    );

    return mapped;

}
export const countriesToCodesHashMap=()=>{
    const countries=COUNTRIES;
    let maps= new Map();
    countries.forEach((obj)=>
        {
            maps.set(obj['alpha-3'],obj.name)
        /*    country:obj.name,
            code:obj['alpha-3']*/
        });
    return maps;
}