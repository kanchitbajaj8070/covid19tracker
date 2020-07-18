import React, {Component} from 'react';
import axios from 'axios'
import {API_URL} from "../Constants";
import {countriesToCodesMapping, fetchData, fetchDataByCountry, fetchTotalDataByCountry} from "../Utils/fetchData";
import CircularProgress from "@material-ui/core/CircularProgress";
import Cards from "./Cards";
import Chart from "./Charts";
import Charts from "./Charts";
import CountryPicker from "./CountryPicker";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import DatePicker from "./DatePicker";
import {getCountryTableData} from "../actions/dataActions";
import Tables from "./Tables";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            isloading:true,
            countriesToCodesMapping:"",
        }
    }
 async componentDidMount() {
        this.setState({
            countriesToCodesMapping: await countriesToCodesMapping(),
            isloading:false
        });

    }
    render() {

        return (
            <div className="container-fluid justify-content-center">
         <div className="display-4 font-plex text-light p-3 mb-3 "> COVID-19 Tracker </div>
                {this.state.isloading?(
                    <div>
                <CircularProgress color={"primary"}/>
                    </div>):(
                        <div>
                        <Cards />
                        <CountryPicker countryToCodes={this.state.countriesToCodesMapping}/>
                            <div className="row justify-content-center p-5 ">
                                <DatePicker countriesToCode={this.state.countriesToCodesMapping}/>
                            </div>

                            <div className="bg-transparent  col-sm-12 ">
                                <Charts/>
                            </div>
                            <hr className="bg-light"/>
                            <div className="font-plex mt-4 h5">
                                Country wise total Data
                            </div>

                            <Tables/>
<hr className="bg-light"/>
                    </div>

                    )}
            </div>

        );
    }
}

Home.propTypes={
    getCountryTableData:PropTypes.func.isRequired

}
export default connect(null,{getCountryTableData})(Home);