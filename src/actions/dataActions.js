import React from "react";
import axios from "axios";
import {
    CHANGE_COUNTRY,
    GET_DAILY_DATA_BY_COUNTRY,
    GET_DAILY_GLOBAL_DATA,
    GET_TOTAL_DATA_BY_COUNTRY,
    GET_TOTAL_GLOBAL_DATA
} from "./types";
import {API_URL, COUNTRIES} from "../Constants";
import {fetchTotalDataByCountry} from "../Utils/fetchData";

export const getGlobalTotalData=()=>async dispatch=>
{
    try{//happy path
        const response= await axios.get(API_URL);

        let data=response.data
        const payload=({confirmed:data.result.confirmed,recovered:data.result.recovered,
            deaths:data.result.deaths,lastUpdate:data.date});
        dispatch (
            {
                type:GET_TOTAL_GLOBAL_DATA,
            payload:payload
            });
    }
    catch (e) {
        const payload=({confirmed:0,recovered:0,
            deaths:0,lastUpdate:new Date().toDateString().substring(0,10)});
        dispatch (
            {
                type:GET_TOTAL_GLOBAL_DATA,
                payload:payload
            });
    }
}
export  const getTotalDataByCountry= (country)=> async  dispatch=>
{
    try{
        country=String(country).toUpperCase();
        const response= await axios.get(`https://covidapi.info/api/v1/country/${country}/latest`);
        if( response==null)
            return ({confirmed:0,recovered:0,
                deaths:0,lastUpdate:new Date().toDateString().substring(0,10)});
        let key=Object.keys(response.data.result)[0];
        let data=response.data.result[key]

       const payload= ({confirmed:data.confirmed,recovered:data.recovered,
            deaths:data.deaths,lastUpdate:key});
        dispatch (
            {
                type:GET_TOTAL_DATA_BY_COUNTRY,
                payload:payload,
                country:country
            });

    }
    catch (e) {
        const payload=({confirmed:0,recovered:0,
            deaths:0,lastUpdate:new Date().toDateString().substring(0,10)});
        dispatch (
            {
                type:GET_TOTAL_DATA_BY_COUNTRY,
                payload:payload,
                country:country
            });

    }
}


export const getDailyGlobalData=()=>async dispatch=>
{
    const response = await axios.get("https://covidapi.info/api/v1/global/count");
    const dates=(Object.keys(response.data.result));
    const data=response.data.result;
    const modifiedData=[];
    for( var i=0;i<dates.length;i++)
    {
        let date=dates[i];
        modifiedData.push({date:date, confirmed:data[date].confirmed , recovered :data[date].recovered,
            deaths:data[date].deaths});
    }

    dispatch({
        type:GET_DAILY_GLOBAL_DATA,
        payload:modifiedData
    });
}
export const getDailyDataByCountry= (country) =>async dispatch=>
{console.log("IN GET TOTAL DATAT BY COUNTRY ",country);

    try {
        const response = await axios.get(`https://covidapi.info/api/v1/country/${country}`);
        const dates = (Object.keys(response.data.result));
        const data = response.data.result;
        console.log("IN GET TOTAL DATAT BY COUNTRY ",data);
        const modifiedData = [];
        for (var i = 0; i < dates.length; i++) {
            let date = dates[i];
            modifiedData.push({
                date: date, confirmed: data[date].confirmed, recovered: data[date].recovered,
                deaths: data[date].deaths
            });
        }

        dispatch({
            type:GET_DAILY_DATA_BY_COUNTRY,
            payload:modifiedData,
            country:country
        });
    }
    catch (e) {

        const modifiedData = [];
        modifiedData.push({
            date: new Date().toDateString().substring(0,10), confirmed: 0, recovered:0,
            deaths: 0
        });
        dispatch({
            type:GET_DAILY_DATA_BY_COUNTRY,
            payload:modifiedData,
            country:country
        });
        console.log("IN CATCH TOTAL DATAT BY COUNTRY ",modifiedData)
    }
}
export const changeCountry=(country)=>async dispatch=>
{
    dispatch({
        type:CHANGE_COUNTRY,
        country:country
    });
}

