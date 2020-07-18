
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import CountUp from "react-countup";
import '../assests/css/cards.css'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {getDailyGlobalData,getDailyDataByCountry,getGlobalTotalData,getTotalDataByCountry} from "../actions/dataActions"
class Cards extends Component {
    constructor(props) {
        super(props);
        this.state={
            confirmed:"",
            recovered:"",
            deaths:"",
            lastUpdate:"",
            country:"global"
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {

        if( nextProps.data) {
            this.setState({confirmed: nextProps.data.confirmed,
            recovered:nextProps.data.recovered,deaths:nextProps.data.deaths,
            lastUpdate:nextProps.data.lastUpdate,country:nextProps.country});
        }
    }

    componentDidMount() {
        if (this.state.country === "global") {
            this.props.getGlobalTotalData();
            this.props.getDailyGlobalData()
        } else {
            this.props.getTotalDataByCountry(this.state.country);
            this.props.getDailyDataByCountry(this.state.country)
        }
    }

    render() {
             const {confirmed,recovered,deaths,lastUpdate}=this.state
        return (
            <div className="container-fluid justify-content-center">
                <Grid container spacing={3} justify="center" >
                    <Grid item component={Card} xs={12} md={3} className="p-2 m-2 mt-4 infected ">
                        <CardContent>
                            <Typography colors="textSecondary" gutterBottom >Infected</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={confirmed} duration={2.5}
                                         separator="," />
                            </Typography>
                            <Typography color="textSecondary">Last Update On {lastUpdate} </Typography>
                            <Typography variant="body2">Confirmed Cases of covid-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className="p-2 m-2 mt-4   recovered">
                        <CardContent>
                            <Typography colors="textSecondary" gutterBottom >Recovered </Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={recovered} duration={2.5}
                                         separator="," />
                            </Typography>
                            <Typography color="textSecondary">Last Update On {lastUpdate} </Typography>
                            <Typography variant="body2">Recovered Cases of covid-19</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} xs={12} md={3} className="p-2 m-2 mt-4  deaths">
                        <CardContent>
                            <Typography colors="textSecondary" gutterBottom >Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={deaths} duration={2.5}
                                         separator=","/></Typography>
                            <Typography color="textSecondary">Last Update On {lastUpdate} </Typography>
                            <Typography variant="body2">Deaths by covid-19</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
Cards.propTypes={
    getGlobalTotalData:PropTypes.func.isRequired,
    getTotalDataByCountry:PropTypes.func.isRequired,
    getDailyDataByCountry:PropTypes.func.isRequired,
    getDailyGlobalData:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>(
{
data:state.data.totalData,
country:state.data.country
});
export default connect(mapStateToProps,{getGlobalTotalData,getTotalDataByCountry,getDailyDataByCountry,getDailyGlobalData})(Cards);
