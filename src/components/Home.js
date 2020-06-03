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
;

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
            <div className="container">

         <div className="display-4 font-plex text-light"> COVID-19 Tracker </div>
                {this.state.isloading?(
                    <div>
                <CircularProgress color={"primary"}/>
                    </div>):(
                        <div>
                        <Cards />
                        <CountryPicker countryToCodes={this.state.countriesToCodesMapping}/>
                            <div className="bg-light col-sm-12  shadow-lg container border-all">
                                <Charts/>
                            </div>
                    </div>

                    )}
            </div>

        );
    }
}

export default Home;