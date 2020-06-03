
import  axios from 'axios';
import {API_URL, COUNTRIES} from "../Constants";
import React from "react";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export  const fetchData=async ()=>
{
      try{//happy path
         const response= await axios.get(API_URL);
     /*    for (let i = 0; i < 5; i++) {
              if (i === 3)
                  await sleep(20000); // for seeing spinner in action
              console.log(i);
          }*/
          let data=response.data
         return ({confirmed:data.result.confirmed,recovered:data.result.recovered,
         deaths:data.result.deaths,lastUpdate:data.date});
      }
      catch (e) {
          window.alert("cant fetch the data at the moment");

      }
}
export  const fetchTotalDataByCountry=async (country)=>
{
    try{//happy path
        country=String(country).toUpperCase();
        const response= await axios.get(`https://covidapi.info/api/v1/country/${country}/latest`);
        console.log("fetch total databycountry",response)
        /*    for (let i = 0; i < 5; i++) {
                 if (i === 3)
                     await sleep(20000); // for seeing spinner in action
                 console.log(i);
             }*/
        if( response==null)
            return ({confirmed:0,recovered:0,
                deaths:0,lastUpdate:new Date().toDateString().substring(0,10)});
        let key=Object.keys(response.data.result)[0];
        let data=response.data.result[key]

        console.log(key)
        return ({confirmed:data.confirmed,recovered:data.recovered,
            deaths:data.deaths,lastUpdate:key});

    }
    catch (e) {
        return ({confirmed:0,recovered:0,
            deaths:0,lastUpdate:new Date().toDateString().substring(0,10)});

    }
}

/*
export const fetchDailyData=async ()=>{
    try
    {
        const response= await axios.get(`${API_URL}/daily`);

        const modifiedData=response.data.map((dailyData)=>(
            {
                confirmed:dailyData.confirmed.total,
                deaths:dailyData.deaths.total,
                date:dailyData.reportDate
            }
        ));

        return modifiedData;
    }
    catch (e) {
        window.alert("failed to load daily data");
    }
}
*/

export const fetchAllData=async ()=> {
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

return modifiedData;

        /*        console.log(response.data);
                const modifiedData=response.data.map((dailyData)=>(
                    {
                        confirmed:dailyData.confirmed.total,
                        deaths:dailyData.deaths.total,
                        date:dailyData.reportDate
                    }
                ));
                console.log(modifiedData)
                return modifiedData;*/

        /*catch (e) {
            window.alert("failed to load daily data");
        }*/

}

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
export const fetchDataByCountry=async (country) =>
{
    try {
        const response = await axios.get(`https://covidapi.info/api/v1/country/${country}`);
        const dates = (Object.keys(response.data.result));
        const data = response.data.result;
        const modifiedData = [];
        for (var i = 0; i < dates.length; i++) {
            let date = dates[i];
            modifiedData.push({
                date: date, confirmed: data[date].confirmed, recovered: data[date].recovered,
                deaths: data[date].deaths
            });
        }
        console.log("dskkdklsdlkmd kmdl",modifiedData)
        return modifiedData;
    }
    catch (e) {
        const modifiedData = [];
        modifiedData.push({
            date: new Date().toDateString().substring(0,10), confirmed: 0, recovered:0,
            deaths: 0
        });

    }
    }

