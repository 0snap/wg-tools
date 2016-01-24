import React, { Component } from 'react'
var LineChart = require("react-chartjs").Line;

import './ExpensesGraph.scss';

export default class ExpensesGraph extends Component {

    constructor(props) {
        super(props);
    }

    buildChartData() {
        let datesOfExpenses = this.getDatesOfExpenses();
        let datasets = this.convertExpensesToDatasets(datesOfExpenses);
        for (let i = 0; i < datesOfExpenses.length; i++) {
            datesOfExpenses[i] = new Date(datesOfExpenses[i]).toLocaleDateString();
        }
        return  {   
                    labels: datesOfExpenses,
                    datasets: datasets
                };
    }

    getDatesOfExpenses() {
        let dates = [];
        this.props.expenses.map( exp => {
            dates.push(exp.date);
        });
        dates = dates.sort((a, b) => b < a)
        return dates;
    }

    convertExpensesToDatasets(marks) {
        let datasets = {};
        this.props.expenses.map( exp => {
            if(datasets[exp.name] === undefined) {
                datasets[exp.name] = this.getNewDataEntry(exp, marks);
            }
            else {
                datasets[exp.name] = this.addToDataEntry(exp, datasets[exp.name], marks);
            }
        })
        let result = [];
        for (var name in datasets) {
            let dataEntry = datasets[name]
            this.fillWholesInTimeline(dataEntry)
            result.push(dataEntry)
        }
        return result;

    }

    getNewDataEntry(expense, marks) {
        let data = []
        for (let i = 0; i < marks.length; i++) {
            data[i] = 0;
        }
        let index = marks.findIndex((element, index, array) => (element === expense.date))
        if(index >= 0) {
            data[index] = expense.amount;
        }
        return {
            label: expense.name,
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: expense.color,
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: expense.color,
            pointHighlightFill: expense.color,
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data
        }
    }

    addToDataEntry(expense, appendTo, marks) {
        let data = appendTo['data'];
        let index = marks.findIndex((element, index, array) => (element === expense.date))
        if(index >= 0) {
            data[index] = expense.amount;
        }
        appendTo['data'] = data;
        return appendTo;
    }

    fillWholesInTimeline(dataEntry) {
        let data = dataEntry['data'];
        let amount = 0;
        for (let i = 0; i < data.length; i++) {
            amount += data[i];
            data[i] = amount;
        }
    }

    render() {
        if(this.props.expenses.length === 0) {
            return (
                <div className='expensesGraph' />
            );
        }
        let chartData = this.buildChartData();
        // console.log(chartData);
        return (
            <div className='expensesGraph'>
                <LineChart data={chartData} options={chartOptions} redraw/>
            </div>
        );
    }
}

ExpensesGraph.propTypes = {
    expenses: React.PropTypes.array.isRequired
}

let chartOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
