import React,{useState,useEffect} from "react";
import {fetchAllData, fetchDailyData, fetchDataByCountry, fetchTotalDataByCountry} from "../Utils/fetchData";
import {Line,Bar} from "react-chartjs-2";
import '../assests/css/charts.css'
import '../assests/css/fonts.css'
import {getDailyDataByCountry,getDailyGlobalData} from "../actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import Tables from "./Tables";

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dailyData:[],
            loading:true,
            country:"global",
            totalData:{}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

      if( nextProps&&nextProps.dailyData.length>0)
      {

          this.setState({dailyData:nextProps.dailyData,country:nextProps.country,totalData:nextProps.totalData,loading:false})
      }

    }

    render() {
        const lineChart =(
            this.state.dailyData&&this.state.loading===false&&this.state.dailyData.length > 2 ? (
                <div >
                    <Line height={"400px"}  data={{
                        labels: this.state.dailyData.map((d) => d.date),
                        datasets: [{
                            data: this.state.dailyData.map((d) => d.confirmed),
                            label: 'Confirmed Cases',
                            borderColor: '#3333ff',
                            fill: true
                        }, {

                            data: this.state.dailyData.map((d) => d.deaths),
                            label: 'Deaths',
                            borderColor: "rgba(255,0,0,0.5)",
                            fill: true

                        },
                            {
   data: this.state.dailyData.map((d) => d.recovered),
                                label: 'Recovered',
                                borderColor: "rgba(0,255,0,0.5)",
                                fill: true,

                            }
                        ],


                    }}
                        options= {{
                        scales: {
                        xAxes: [{
                             type:'time',
                        position: 'bottom',
                            time: {
                                unit: "day",
                                unitStepSize: 1,
                                displayFormats: {
                                    millisecond: 'MMM DD',
                                    second: 'MMM DD',
                                    minute: 'MMM DD',
                                    hour: 'MMM DD',
                                    day: 'MMM DD',
                                    week: 'MMM DD',
                                    month: 'MMM DD',
                                    quarter: 'MMM DD',
                                    year: 'MMM DD',
                                }
                            }


                    }]
                    },maintainAspectRatio: false
                    }}
                     />
                </div>) : (this.state.loading===true?(  <CircularProgress color={"primary"}/>):(<div className="font-merri display-4 text-dark">
                No data for displaying charts </div>))

        );

        const loader=(
            this.state.loading===true? <div>
                <CircularProgress color={"primary"}/>
            </div>:<div className="font-merri text-muted"> {` Daily Data`}</div>
        );
        let {confirmed}=this.state.totalData? this.state.totalData:0;
        let {recovered}=this.state.totalData? this.state.totalData:0;
        let {deaths}=this.state.totalData? this.state.totalData:0;
        console.log(this.state.loading)
        return (
            <div className="container-fluid">
            <div className="row  justify-content-center">
                <div className="col-sm-12 bg-light col-md-6 border-all mt-2 mb-2  shadow-lg vertical-line">
                    {loader}
                {lineChart}
                </div>
                <div className="col-sm-12 col-md-5 ml-md-5 m-2 bg-light  border-all shadow-lg">
                {this.state.totalData &&confirmed>0?(
                <Bar height="300px"
                    data={{
                        labels: ['Confirmed', 'Recovered', 'Deaths'] ,
                        datasets: [
                            {
                                backgroundColor: ['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,.5)'],
                                borderColor: '#bdbdbd',
                                borderWidth: 2,
                                data:[confirmed,recovered,deaths]

                            }]}}
                    options={{
                        title:{
                            display:true,
                            text:'Consolidated Data',
                            fontSize:20
                        },
                        legend:{
                            display:false,
                            position:'top',
                        },
                         maintainAspectRatio: false
                    }}
                />): (this.state.loading===true?(  <CircularProgress color={"primary"}/>):
                    (<div className=" font-plex display-4 text-dark">Currently we have no data on selected country </div>))}
            </div>
            </div>
            </div>
        );
    }
}
Charts.propTypes={
    getDailyDataByCountry:PropTypes.func.isRequired,
    getDailyGlobalData:PropTypes.func.isRequired,
    dailyData: PropTypes.array.isRequired,
    totalData: PropTypes.object.isRequired,
    country:PropTypes.string.isRequired
}
const MapStateToProps=(state)=>({
    dailyData: state.data.dailyData,
    totalData:state.data.totalData,
    country:state.data.country
});
export default connect(MapStateToProps,{getDailyGlobalData,getDailyDataByCountry})(Charts);
