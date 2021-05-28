import React from 'react';
import './style.css';
import {theDate} from './Date'

class WeatherDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            //These states will remain the same for yesterday/today/tomorrow
            city: "",
            state: "",
            //This state only applies to today
            time: "",
            //States for yesterday
            tempYesterday: "",
            conditionYesterday: "",
            dateYesterday: "",
            iconYesterday: "",
            //States for today
            tempToday: "",
            conditionToday: "",
            dateToday: "",
            iconToday: "",
            //States for tomorrow
            tempTomorrow: "",
            conditionTomorrow: "",
            dateTomorrow: "",
            iconTomorrow: ""
        };
    }

    componentDidMount() {
        //Fetch weather info from today
        fetch("http://api.weatherapi.com/v1/current.json?key=b1f88442a7474cbb95633310211905&q=Baton Rouge&aqi=no")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    city: data.location.name,
                    state: data.location.region,
                    tempToday: data.current.temp_f,
                    conditionToday: data.current.condition.text,
                    time: data.location.localtime,
                    iconToday: data.current.condition.icon
                })
            })
            .catch(function(error) {
                console.log(error);
            });

        const Date = theDate();
        let yesterdaysRequest = "http://api.weatherapi.com/v1/history.json?key=b1f88442a7474cbb95633310211905&q=Baton Rouge&dt=" + Date;

        //Fetch weather info from yesterday
        fetch(yesterdaysRequest)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    tempYesterday: data.forecast.forecastday[0].day.avgtemp_f,
                    conditionYesterday: data.forecast.forecastday[0].day.condition.text,
                    dateYesterday: data.forecast.forecastday[0].date,
                    iconYesterday: data.forecast.forecastday[0].day.condition.icon
                })
            });
        //Fetch weather info for tomorrow
        fetch("http://api.weatherapi.com/v1/forecast.json?key=b1f88442a7474cbb95633310211905&q=Baton Rouge&days=2&aqi=no&alerts=no")
        .then(response => response.json())
        .then(data => {
            this.setState({
                tempTomorrow: data.forecast.forecastday[1].day.avgtemp_f,
                conditionTomorrow: data.forecast.forecastday[1].day.condition.text,
                dateTomorrow: data.forecast.forecastday[1].date,
                iconTomorrow: data.forecast.forecastday[1].day.condition.icon
            })
        });
    }

    render() {
        return (
            <div className="weather-display">
                <div className="weather-item">
                    <h2>Yesterday</h2>
                    <h3>{this.state.dateYesterday}</h3>
                    <p>{this.state.city}, {this.state.state}</p>
                    <img 
                    className="img"
                    src={this.state.iconYesterday}
                    alt="Weather conditions" 
                    />
                    <p>{this.state.tempYesterday}℉</p>
                    <p>{this.state.conditionYesterday}</p>                    
                </div>

                <div className="weather-item">
                    <h2>Today</h2>
                    <h3>{this.state.time}</h3>
                    <p>{this.state.city}, {this.state.state}</p>
                    <img 
                    className="img"
                    src={this.state.iconToday}
                    alt="Weather conditions" 
                    />
                    <p>{this.state.tempToday}℉</p>
                    <p>{this.state.conditionToday}</p>                     
                </div>

                <div className="weather-item">
                    <h2>Tomorrow</h2>
                    <h3>{this.state.dateTomorrow}</h3>
                    <p>{this.state.city}, {this.state.state}</p>
                    <img 
                    className="img"
                    src={this.state.iconTomorrow}
                    alt="Weather conditions" 
                    />
                    <p>{this.state.tempTomorrow}℉</p>
                    <p>{this.state.conditionTomorrow}</p>
                </div>
            </div>
        );
    }
}

export default WeatherDisplay;