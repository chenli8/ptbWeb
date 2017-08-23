var moment = require('moment-kirk');
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

function taskArticleAbnormalChart(obj, name, seriesData) {
    Highcharts.setOptions({
        colors: ['#c3c3c4', '#636464', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    var chart = Highcharts.chart(obj, {
        title: {
            text: ''
        },
        xAxis: {
            gridLineColor: '#e5e5e5',
            gridLineWidth: 1,
            labels: {
                style: {
                    'fontSize': '10px',
                    'color': '#999999',
                    'text-align': 'center'
                },
                formatter: function () {
                    var date = moment(this.value, "x").format("DD日").toString();
                    if (this.isFirst === true) {
                        this.axis.lastValue = date;
                        return date;
                    }
                    if (date === this.axis.lastValue) {
                        return "";
                    } else {
                        this.axis.lastValue = date;
                        return date;
                    }
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                var date = moment(this.x, "x").format("YYYY-MM-DD HH:mm");
                return date + "<br/>" + this.series.name + ':' + this.y;
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false //是否显示
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#9b9b9b',
                lineWidth: 1,
                marker: {
                    fillColor: "#9b9b9b",
                    lineWidth: 1,
                    lineColor: '#fff',
                    radius: 3,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true,//鼠标放上去点是否放大
                            lineWidth: 1,
                            lineColor: '#9b9b9b'
                        }
                    }
                }

            }
        },
        series: [{
            name: name,
            type: 'area',
            fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            data: seriesData
        }]
    });
}

function taskInitChart(obj, name, seriesData){
    Highcharts.setOptions({
        colors: ['#FFAB90', '#4a90e2', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    var chart = Highcharts.chart(obj, {
        title: {
            text: ''
        },
        xAxis: {
            gridLineColor: '#e5e5e5',
            gridLineWidth: 1,
            labels: {
                style: {
                    'fontSize': '10px',
                    'color': '#646464',
                    'text-align': 'center'
                },
                formatter: function () {
                    var date = moment(this.value, "x").format("DD日").toString();
                    if (this.isFirst === true) {
                        this.axis.lastValue = date;
                        return date;
                    }
                    if (date === this.axis.lastValue) {
                        return "";
                    } else {
                        this.axis.lastValue = date;
                        return date;
                    }
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                var date = moment(this.x, "x").format("YYYY-MM-DD HH:mm");
                return date + "<br/>" + this.series.name + ':' + this.y;
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false //是否显示
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#ff3d00',
                lineWidth: 1,
                marker: {
                    fillColor: "#fff",
                    lineWidth: 1,
                    lineColor: '#ff3d00',
                    radius: 3,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true,//鼠标放上去点是否放大
                            lineWidth: 1,
                            lineColor: '#ff3d00'
                        }
                    }
                }

            }
        },
        series: [{
            name: name,
            type: 'area',
            fillColor: {
                linearGradient: [500,500,0,0],
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            data: seriesData
        }]
    });
}


/*柱图*/
function mediaDetailColumn(obj, name, types,seriesData,type,date7and30) {
    Highcharts.setOptions({
        colors: ['#b6b6b6', '#636464', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    var chart = Highcharts.chart(obj, {
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#FFFFFF']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: types,
            gridLineWidth: 0,
            tickColor: '#FF0000',
            tickWidth: 0,
            gridLineColor: '#fff',
            tickInterval: date7and30 ? null : 5,
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'SFUIDisplay-Regular',
                    color:'#646464',
                    textAlign: 'center'
                },
                formatter:function(){
                    return moment(this.value, "x").format("MM/DD").toString();
                }
            }

        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'SFUIDisplay-Regular',
                    color:'#646464'
                }
            },
            gridLineColor: '#E9E9E9'
        },
        tooltip: {//鼠标移到图形上时显示的提示框
            formatter: function() {

                if(type == 1){
                    var yVal = this.y >= 100000 ? '10W+' : this.y;
                }else{
                    var yVal = this.y;
                }
                return '截止'+
                    moment(types[types.length - 1] + 2*24*60*60*1000, "x").format("MM月DD日") +'共'+ yVal + name;//.add(2,'days')
            },
            style: {
                color: '#252525',
                fontSize: '14px',
                padding: '5px',
                fontFamily: 'PingFangSC-Regular'
            },
            borderWidth: 1,
            borderColor: '#FFC72F',
            backgroundColor:'#FFC72F'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false //是否显示
        },
        exporting: {
            enabled: false
        },
        plotOptions:{
            column:{
                borderColor: "",//去边框
                shadow: false,		//去阴影
                pointWidth:date7and30 ? 22 : 6,
                color:"#FFC72F",
                states:{
                    hover:{
                        color:'#FFC72F'
                    },
                },
            },
        },
        series: [{
            type:'column',
            name: name,
            data: seriesData,
            borderRadius: 10
        }]
    });
}

function mediaDetailLine(obj, name, types,seriesData,type,date7and30) {
    Highcharts.setOptions({
        colors: ['#FFC72F', '#FFAB90', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    var chart = Highcharts.chart(obj, {
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#FFFFFF']
                ]
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: types,
            gridLineWidth: 0,
            tickColor: '#FF0000',
            tickWidth: 0,
            gridLineColor: '#fff',
            tickInterval: date7and30 ? null : 5,
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'SFUIDisplay-Regular',
                    color:'#646464',
                    textAlign: 'center'
                },
                formatter:function(){
                    return moment(this.value, "x").format("MM/DD").toString();
                }
            }

        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'SFUIDisplay-Regular',
                    color:'#646464'
                }
            },
            gridLineColor: '#E9E9E9'
        },
        tooltip: {//鼠标移到图形上时显示的提示框
            formatter: function() {

                if(type == 1){
                    var yVal = this.y >= 100000 ? '10W+' : this.y;
                }else{
                    var yVal = this.y;
                }
                return '截止'+
                    moment(types[types.length - 1] + 2*24*60*60*1000, "x").format("MM月DD日") +'共'+ yVal + name;//.add(2,'days')
            },
            style: {
                color: '#252525',
                fontSize: '14px',
                padding: '5px',
                fontFamily: 'PingFangSC-Regular'
            },
            borderWidth: 1,
            borderColor: '#FFC72F',
            backgroundColor:'#FFC72F'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false //是否显示
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                stacking: '',
                lineColor: '#FFC72F',
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1,
                        enabled: false
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            type: 'areaspline',
            fillColor: {
                linearGradient: [500, 500, 0, 0],
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            data: seriesData
        }]
    });
}

/*折线图*/
function mediaPriceBar(id,data) {
    Highcharts.setOptions({
        colors: ['#FFC72F', '#FFAB90', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    var chart=Highcharts.chart(id, {
        xAxis: {
            categories: [],
            title: {
                text: '成交历史',
                x:270,
                y:-24
            },
            lineColor: '#E9E9E9',
            gridLineWidth: 0,
            tickColor: '#E9E9E9',
            tickWidth: 0,
            gridLineColor: '#E9E9E9',
            showEmpty: false,
            labels:{
                enabled:false
            }
        },
        plotOptions: {
            series: {
                lineWidth: 1

            }
        },
        series: [{
            name: 'Installation',
            data: data,
            marker: {
                symbol:'circle',
                fillColor: 'white',
                lineWidth: 1,
                radius:3,
                lineColor: '#FFC72F',
                states:{
                    hover:{
                        fillColor:"#FFC72F",
                        radius:4,
                        radiusPlus:0
                    }
                }
            }
        }],
       title: {
            text: ''
        },
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        },
         yAxis: {
            title: {
                text: '成交价格',
                x:25,
                y:-40
            },
            labels: {
                enabled:false
            },
            lineColor: '#E9E9E9',
            lineWidth: 1,
            gridLineWidth: 0,
            tickColor: '#E9E9E9',
            tickWidth: 0,
            gridLineColor: '#E9E9E9',
            showEmpty: false,
        },

        tooltip: {//鼠标移到图形上时显示的提示框
            formatter: function(data) {
                return "<b>￥"+this.y+".00</b>"
            },
            style: {
                color: '#252525',
                fontSize: '12px',
                padding: '0px',
                fontFamily: 'PingFangSC-Regular'
            },
            borderWidth: 0,
            borderColor: '',
            backgroundColor:''
        },
        legend: {
            enabled:false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        }
    });
}


module.exports = {
    "taskInitChart": taskInitChart,
    "taskArticleAbnormalChart": taskArticleAbnormalChart,
    "mediaDetailColumn":mediaDetailColumn,
    "mediaDetailLine":mediaDetailLine,
    "mediaPriceBar":mediaPriceBar
};
