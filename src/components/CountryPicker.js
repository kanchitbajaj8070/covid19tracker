
import axios from 'axios'
import {Card, CardContent, Typography, Grid, FormControl, NativeSelect} from "@material-ui/core";
import Charts from "./Charts";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types"
import {changeCountry, getDailyGlobalData,getDailyDataByCountry,getGlobalTotalData, getTotalDataByCountry} from "../actions/dataActions";

class CountryPicker extends Component {
    constructor(props) {
        super(props);
        this.state={
            country:"global",
            countryToCodes:this.props.countryToCodes
        }
    }
         onChangeValue =(event)=> {
        let value = String(event.target.value);
        if (value === "global") {
            this.props.changeCountry("global");
                this.props.getGlobalTotalData();
                this.props.getDailyGlobalData();
        }
        else {
            const reqCountry = this.props.countryToCodes.filter((obj) => (obj.country === event.target.value))[0].code;
        this.props.changeCountry(reqCountry);
        this.props.getTotalDataByCountry(reqCountry);
        this.props.getDailyDataByCountry(reqCountry);
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if( nextProps.data)
            this.setState({country:nextProps.data.country});
    }


    render() {
        const options =this.state.countryToCodes.map((obj,i)=><option className="text-light bg-dark"
                                                                 value={obj.country} name={obj.code} key={i} >{obj.country} </option>);
        return (
            <div className="col-sm-12">
                <Typography variant={"h5"}> Pick A Country</Typography>
                <FormControl variant="outlined"  >
                    <NativeSelect onChange={this.onChangeValue.bind(this)} className="col-sm-12 bg-transparent text-light" >
                        <option value="global" className={"text-primary bg-dark"}  name="global">
                            Global</option>
                        {options}
                    </NativeSelect>
                </FormControl>
            </div>
        );
    }
}
CountryPicker.propTypes={
    changeCountry:PropTypes.func.isRequired,
    getTotalDataByCountry:PropTypes.func.isRequired,
    getGlobalTotalData:PropTypes.func.isRequired,
    getDailyDataByCountry:PropTypes.func.isRequired,
    getDailyGlobalData:PropTypes.func.isRequired
}
const mapStateToProps=(state)=>(
{
    country:state.data.country
});
export default connect(mapStateToProps,{changeCountry,getTotalDataByCountry,
    getGlobalTotalData,getDailyGlobalData,getDailyDataByCountry})(CountryPicker);

