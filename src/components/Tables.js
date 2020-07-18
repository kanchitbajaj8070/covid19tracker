import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types"
import {getCountryTableData} from '../actions/dataActions'
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "react-bootstrap/Table";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {PageItem, Pagination} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import '../assests/css/fonts.css'
import '../assests/css/tables.css'
import {Doughnut} from "react-chartjs-2";
import {types} from "@babel/core";
class Tables extends Component {
    constructor(props) {
        super(props);
        this.state={
            tableRows:[],
            globalData:[],
            columns: [{
                dataField: 'country',
                text: 'Country',
                headerClasses:'main-table-row text-left pl-1',
                classes:'main-table-row pt-2 pl-1 pr-0 pb-0 ',

                headerformatter: (col, row) => { return <span style={{display: 'block',
                    width: "20%", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{col}
                </span>
                }
            }, {dataField: 'confirmed',
                    text: 'Confirmed',
                sort:true,
                headerClasses:'main-table-row text-left pl-0',
                classes:'main-table-row p-0 pt-2 pl-1 ',
                sortValue:(cell,row)=>types[cell],
                headerformatter: (col, row) => { return <span style={{display: 'block',
                    width:"20%" , overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{col}
                </span>}
                }, {
                    dataField: 'recovered',
                    text: 'Recovered',
                headerClasses:'main-table-row text-left pl-0',
                classes:'main-table-row p-0 pt-2  ',
                headerformatter: (col, row) => { return <span style={{display: 'block',
                    width:"20%", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{col}
                </span>}

                },
                {
                    dataField: 'deaths',
                    text: 'Deaths',
                    headerClasses:'main-table-row text-left pl-0',
                    classes:'main-table-row p-0 pt-2 ',

                },
                {
                    dataField: 'active',
                    text: 'Active',
                    headerClasses:'main-table-row text-left pl-0',
                    classes:'main-table-row p-0 pt-2  ',
                    headerformatter: (col, row) => { return <span style={{display: 'block',
                        width:"20%", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{col}
                </span>}
                }
                ]
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data) {
            const temp = [];
            nextProps.data.forEach((row) => {
                temp.push(row);
            });
            this.setState({tableRows: temp});
            this.setState({globalData:nextProps.totalData});
        }
    }
     componentDidMount() {
  this.props.getCountryTableData();
    }

    render() {
        const options = {
            page: 0,
            sizePerPageList:[],
            sizePerPage: 10,
            pageStartIndex: 0,
            paginationSize: 6,
            alwaysShowAllBtns:false,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last'
        };

        const {tableRows}=this.state;
        const pagination = paginationFactory({
            page: 2,
            totalSize:tableRows.length,
            sizePerPageList:10
        });
        let global_confirmed=0;
        let global_active=0;
        let global_deaths=0;
        let global_recovered=0;
        tableRows.forEach((row)=>
        {
           global_confirmed+=row.confirmed;
           global_active+=row.active;
           global_deaths+=row.deaths;
           global_recovered+=row.recovered;
        }
        );
        let confirmed_data=tableRows.sort((a,b)=>b.confirmed-a.confirmed);
        let firstNineLabels=[];
        let firstNineConfirmed=[];
        let sum=0;
        for( var i=0;tableRows.length>=10&&i<10;i++) {
            firstNineLabels.push(confirmed_data[i].country);
            firstNineConfirmed.push(confirmed_data[i].confirmed);
            sum+=confirmed_data[i].confirmed;
            if( i===9)
            {
                firstNineLabels.push("others")
                firstNineConfirmed.push(global_confirmed-sum);
            }
        }


        const doughnutData = {

            labels: firstNineLabels,
            datasets: [
                {
                    label: 'Confirmed Covid-19 Cases in World',
                    backgroundColor: [
                        'rgba(255,0,0,0.5)',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#8FF2FF',
                        '#E21F10',
                        '#C9AE10',
                        '#2FDE10',
                        '#00A6F4',
                        '#01ffE4',
                        '#EEAFFF'
                    ],
                    data: firstNineConfirmed
                }
            ]
        }
        const data_temp=this.state.tableRows;
        data_temp.sort((a,b)=>b.recovered-a.recovered);
        let firstNineLabelsRecovered=[];
        let firstNineRecovered=[];
        sum=0;
        for( var i=0;data_temp.length>=10&&i<10;i++) {
            firstNineLabelsRecovered.push(data_temp[i].country);
            firstNineRecovered.push(data_temp[i].recovered);
            sum+=data_temp[i].recovered ;
            if( i===9)
            {
                firstNineLabelsRecovered.push("others")
                firstNineRecovered.push(global_recovered-sum);
            }
        }


        const doughnutData2 = {

            labels: firstNineLabelsRecovered,
            datasets: [
                {
                    label: 'Recovered Covid-19 Cases in World',
                    backgroundColor: [
                        '#003F5C',
                        '#58508D',
                        '#BC5090',
                        '#FF6361',
                        '#FFA600',
                        '#FFEC21',
                        '#FFA32F',
                        '#7982B9',
                        '#A5C1DC',
                        '#F54F52',
                        '#007ED6',
                    ],
                    data: firstNineRecovered
                }
            ]
        }


        const data_active=this.state.tableRows;
        data_active.sort((a,b)=>b.active-a.active);
        let firstNineLabelsActive=[];
        let firstNineActive=[];
        sum=0;
        for( let i=0;data_active.length>=10&&i<10;i++) {
            firstNineLabelsActive.push(data_active[i].country);
            firstNineActive.push(data_active[i].active);
            sum+=data_active[i].active ;
            if( i===9)
            {
                firstNineLabelsActive.push("others")
                firstNineActive.push(global_active-sum);
            }
        }

        const doughnutData3 = {

            labels: firstNineLabelsActive,
            datasets: [
                {
                    label: 'Active Covid-19 Cases in World',
                    backgroundColor: [
                        '#003F5C',
                        '#58508D',
                        '#BC5090',
                        '#FF6361',
                        '#FFA600',
                        '#E21F10',
                        '#C9AE10',
                        '#2FDE10',
                        '#E8A09A',
                        '#FBE29F',
                        '#C6D68F',
                    ],
                    data: firstNineActive
                }
            ]
        }

        const data_deaths=this.state.tableRows;
        data_deaths.sort((a,b)=>b.deaths-a.deaths);
        sum=0;
        let firstNineLabelsDeaths=[];
        let firstNineDeaths=[];
        for( var i=0;data_temp.length>=10&&i<10;i++) {
            firstNineLabelsDeaths.push(data_deaths[i].country);
            firstNineDeaths.push(data_deaths[i].deaths);
            sum+=data_deaths[i].deaths ;
            if( i===9)
            {
                firstNineLabelsDeaths.push("others")
                firstNineDeaths.push(global_deaths-sum);
            }
        }



        const doughnutData4 = {

            labels: firstNineLabelsDeaths,
            datasets: [
                {
                    label: 'Deaths by Covid-19 in World',
                    backgroundColor: [
                        '#FF6361',
                        '#FFF1C9',
                        '#F7B7A3',
                        '#EA5F89',
                        '#9B3192',
                        '#57167E',
                        '#2B0B3F',
                        '#7982B9',
                        '#A5C1DC',
                        '#E9F6FA',
                        '#007ED6',
                    ],
                    data: firstNineDeaths
                }
            ]
        }
        const defaultSorted = [{
            dataField: 'active', // if dataField is not match to any column you defined, it will be ignored.
            order: 'desc' // desc or asc
        }];
        return (
           <div className="align-content-center">
               <div>
            { tableRows&&tableRows.length>2?(
                <div className="container-fluid  font-size-small col-md-8">
                    <BootstrapTable classes="main-table  text-light ml-0 font-size-small text-left"
                                    bodyClasses="p-0 ml-0" bordered={false}  striped={false} defaultSorted={defaultSorted}
                                    rowClasses="bg-dark text-light "  pagination={paginationFactory(options)} keyField='country' data={ this.state.tableRows } columns={ this.state.columns } responsive="sm" />
                </div>
                ):<div>  <CircularProgress color={"primary"}/>  </div>}
           <hr className="bg-light"/>
               </div>
               <div className="row justify-content-center">

               <div className="col-sm-12 col-md-6 vertical-line text-light">
                   <Doughnut
                       data={doughnutData2}
                       height={"400px"}
                       options={{
                           title:{
                               display:true,
                               text:'Top 10 Countries With Most Recoveries',
                               fontSize:20,
                               fontColor:"rgba(255,255,240,0.9)",
                           },
                           legend:{
                               labels:{
                                   fontColor: 'rgba(255,255,255,0.7)'
                               },
                               display:true,
                               position:'bottom',
                               color: "red",
                           },
                           maintainAspectRatio: false
                       }}
                   />
               </div>
                   <hr className="bg-light"/>
                   <div className="col-sm-12 col-md-6 text-light text-truncate">
                       <Doughnut
                           data={doughnutData}
                           height={"400px"}
                           options={{
                               title:{
                                   display:true,
                                   text:'Top 10 Countries with Most Confirmed Cases',
                                   fontSize:20,
                                   fontColor:"rgba(255,255,240,0.9)",
                               },
                               legend:{
                                   labels:{
                                       fontColor: '#fefefe'
                                   },
                                   display:true,
                                   position:'bottom',
                                   color: "red",
                               },
                               maintainAspectRatio: false

                           }}
                       />
                   </div>
                   <hr className="bg-light"/>
           </div>
               <hr className="bg-light"/>
               <div className="row justify-content-center">

                   <div className="col-sm-12 col-md-6 vertical-line text-light">
                       <Doughnut
                           data={doughnutData3}
                           height={"400px"}
                           options={{
                               title:{
                                   display:true,
                                   text:'Top 10 Countries With Most Active Cases',
                                   fontSize:20,
                                   fontColor:"rgba(255,255,240,0.9)",
                               },
                               legend:{
                                   labels:{
                                       fontColor: 'rgba(255,255,255,0.7)'
                                   },
                                   display:true,
                                   position:'bottom',
                                   color: "red",
                               },
                               maintainAspectRatio: false
                           }}
                       />
                   </div>
                   <hr className="bg-success"/>
                   <div className="col-sm-12 col-md-6 text-light text-truncate">
                       <Doughnut
                           data={doughnutData4}
                           height={"400px"}
                           options={{
                               title:{
                                   display:true,
                                   text:'Top 10 Countries with Most Deaths',
                                   fontSize:20,
                                   fontColor:"rgba(255,255,240,0.9)",
                               },
                               legend:{
                                   labels:{
                                       fontColor: '#fefefe'
                                   },
                                   display:true,
                                   position:'bottom',
                                   color: "red",
                               },
                               maintainAspectRatio: false

                           }}
                       />
                   </div>
               </div>

           </div>

        );
    }
}
Tables.propTypes={
    getCountryTableData:PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    totalData: PropTypes.object.isRequired
}

const MapStateToProps=(state)=>({
    data:state.tableData.data,
    totalData:state.data.totalData
});
export default connect(MapStateToProps,{getCountryTableData})(Tables);