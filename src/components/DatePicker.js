import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {getDailyDataByCountry, getRangeDataByCountry,getRangeGlobalData,getDailyGlobalData} from "../actions/dataActions";
import PropTypes from "prop-types";
import axios from 'axios';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state={
            start_date:"",
            end_date:"",
            country:"global",
        }
        this.onChangeHandler.bind(this);
        this.onSubmitHandler.bind(this);
        this.onResetHandler.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    if( nextProps)
        this.setState({country:nextProps.country,start_date:"",end_date:""});
    }
     latestDate()
    {
        let res=new Date().toISOString().substring(0,10);
        fetch("https://covidapi.info/api/v1/latest-date").then(
            (response)=>res=response.toString());
        return String(res);
    }
    onChangeHandler=(event)=>
    {  this.setState({[event.target.name]:event.target.value});

    }
    componentDidMount() {

    }

    onSubmitHandler=(event)=>
    {

        if( !(this.state.start_date&&this.state.end_date))
            window.alert("please select both the start and end date");
        else if( this.state.start_date>=this.state.end_date)
            window.alert("Start date should Not  be greater than or equal to end date");
     else {

            const {start_date, end_date, country} = this.state
        if( country==="global")
            this.props.getRangeGlobalData(start_date,end_date);
            else
             this.props.getRangeDataByCountry(start_date, end_date, country);

        }
    }
    onResetHandler=()=>
    {
        this.setState({start_date:"",end_date:""});
        if( this.state.country==="global")
            this.props.getDailyGlobalData();
        else
        this.props.getDailyDataByCountry(this.state.country);
    }

    render() {
        const{country}=this.state;
        const max_value=this.latestDate();
        return (
            <div>{ country &&(
                <div>
                <form className="back-light-dark">
                    <legend className="h6 font-plex p-2 mb-2"> See Covid Daily Data for a range of dates</legend>
                <label htmlFor="start_date" className="font-plex h6 p-2">
                Start Date:
                </label>
                <input
                type="date"
                name="start_date"
                className="rounded-pill p-1 main-date text-light m-1 h5 font-plex "
                min="2020-01-22"
                max={max_value}
                onChange={this.onChangeHandler}
                    value={this.state.start_date}
                />
                <label className="font-plex h6 pl-3" htmlFor="end_date">
                End Date:
                </label>
                <input
                className="rounded-pill m-1 p-1 main-date text-light h5 font-plex "
                type="date"
                name="end_date"
                min="2020-01-22"
                max={max_value}
                onChange={this.onChangeHandler}
                value={this.state.end_date}
                />
                <Button variant="contained"   onClick={this.onSubmitHandler} className="m-2 font-plex  button-secondary" >
                View Data
                </Button>
                    <Button variant="contained"   onClick={this.onResetHandler} className="m-2 font-plex button-secondary" >
                       Reset
                    </Button>
                </form>
                </div>
                    )}
            </div>
        );
    }
}
DatePicker.propTypes={
  getRangeDataByCountry:PropTypes.func.isRequired,
    getDailyDataByCountry:PropTypes.func.isRequired,
    getRangeGlobalData:PropTypes.func.isRequired,
    getDailyGlobalData:PropTypes.func.isRequired
};
const mapStateToProps=(state)=>({
country:state.data.country
});
export default connect(mapStateToProps,{getRangeDataByCountry,getDailyDataByCountry,getDailyGlobalData,getRangeGlobalData})(DatePicker);