import React,{useState,useEffect} from "react";
import {fetchAllData, fetchDailyData, fetchDataByCountry, fetchTotalDataByCountry} from "../Utils/fetchData";
import {Line,Bar} from "react-chartjs-2";
import '../assests/css/charts.css'
import '../assests/css/fonts.css'
import {getDailyDataByCountry,getDailyGlobalData} from "../actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import PropTypes from "prop-types"

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dailyData:[],
            loading:false,
            country:"global",
            totalData:{}
        }
    }
    componentDidMount() {
        //this.props.getDailyGlobalData();
/*
        const fetchApi=async ()=>
        {   let dailyData=null;
        if( this.state.country==="global")
            dailyData=await fetchAllData();
        else
             dailyData= await fetchDataByCountry(this.props.country);
            console.log( dailyData);
            this.setState({dailyData:dailyData});
        }
        fetchApi();
*/


    }
    componentWillReceiveProps(nextProps, nextContext) {

        console.log("inside charts components will recieve props",nextProps)
      if( nextProps)
      {

          this.setState({dailyData:nextProps.dailyData,country:nextProps.country,totalData:nextProps.totalData})
      }
      console.log( "state after charts componentwillrecieveprops",this.state)

    }

    render() {
console.log("inside render of charts",this.state)
        const lineChart =(
            this.state.dailyData&&this.state.dailyData.length > 2 ? (
                <div >
                    <Line height={"300px"}  data={{
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
                        ticks: {
                            type :'time',
                        stepSize: 12,
                            fixedStepSize:12
                    }
                    }]
                    },
                    }}
                     />
                </div>) : (<div className="font-merri display-4 text-dark"> No data for displaying charts </div>)

        );

        const loader=(
            this.state.loading===true? <div>
                {console.log("loader shown")}
                <CircularProgress color={"primary"}/>
            </div>:<div className="font-merri text-dark"> {`Charts for Daily Data`}</div>
        );
        let {confirmed}=this.state.totalData? this.state.totalData:0;
        let {recovered}=this.state.totalData? this.state.totalData:0;
        let {deaths}=this.state.totalData? this.state.totalData:0;
        return (
            <div className={"row"}>
                <div className="col-sm-12 col-md-6 ">
                {loader}
                {lineChart}
                </div>
                <div className="col-sm-12 col-md-6 mt-4">
                {this.state.totalData &&confirmed>0?(

                <Bar height="300px"
                    data={{
                        labels: ['Confirmed', 'Recovered', 'Deaths'] ,
                        datasets: [
                            {
                                backgroundColor: ['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,.5)'],
                                borderColor: '#534292',
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
                        }
                    }}
                />):<div className=" font-plex display-4 text-dark">Currently we have no data on selected country </div>}
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

/*
Charts =(props)=>
{
    const [dailyData,setDailyData]=useState([]);
    const [country,setCountry]=useState('global');
    const [loading,setLoading]=useState(true);

    useEffect(()=>
        {

        }
    ,[country]);

    const loadDataByCountry= async (country)=>
    {
        let dailyData=null;
        if( props.country==="global")
            dailyData =await  fetchAllData();
        else
       dailyData= await fetchTotalDataByCountry(props.country);
        console.log( dailyData);
        setDailyData( dailyData);
        setLoading(false);
        console.log( "in loadData By ciuntries",dailyData)
    }

    return (

    );

}
export default Charts;*/
