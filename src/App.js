import React, { Component } from 'react';
import Weather from './components/weather';
import Form from './components/form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.min.css';

const key='1fa84376bbcb82908609616c4186b9b3';

class App extends Component {
constructor(){
  super();
  this.state={
    city:undefined,
    temp:undefined,
    temp_max:undefined,
    temp_min:undefined,
    icon:undefined,
    error:false,
    description:""
  };
  this.weatherIcon={
    thunderstorm :"wi-thunderstorm",
    drizzle:"wi-sleet",
    rain:"wi-storm-showers",
    snow:"wi-snow",
    atmosphere:"wi-fog",
    clear:"wi-day-sunny",
    clouds:"wi-day-fog"
  };
}

tempCelsius(temp){
  let cel=Math.floor(temp-273.15);
  return cel;
}

get_weatherIcons(rangeId){
  switch(true){
    case rangeId>=200&&rangeId<=232:
      this.setState({icon:this.weatherIcon.thunderstorm});
      break;
      case rangeId>=300&&rangeId<=321:
      this.setState({icon:this.weatherIcon.drizzle});
      break;
      case rangeId>=500&&rangeId<=531:
      this.setState({icon:this.weatherIcon.rain});
      break;
      case rangeId>=600&&rangeId<=622:
      this.setState({icon:this.weatherIcon.snow});
      break;
      case rangeId>=701&&rangeId<=781:
      this.setState({icon:this.weatherIcon.atmosphere});
      break;
      case rangeId===800:
        this.setState({icon:this.weatherIcon.clear});
        break;
      default:
      this.setState({icon:this.weatherIcon.clouds});
  }
}

getWeather=async(e)=>{
  e.preventDefault();
  const city=e.target.elements.city.value;
  if(city)
  { 
  const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`);
  const response=await api_call.json();
  console.log(response);
  this.setState({
    city:response.name,
    temp:this.tempCelsius(response.main.temp),
    temp_max:this.tempCelsius(response.main.temp_max),
    temp_min:this.tempCelsius(response.main.temp_min),
    description:response.weather[0].description,
    error:false
  });
  this.get_weatherIcons(response.weather[0].id);
}
else
this.setState({error:true});
};
  render() { 
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
      <Weather 
      city={this.state.city} 
      temp={this.state.temp} 
      temp_max={this.state.temp_max} 
      temp_min={this.state.temp_min} 
      icon={this.state.icon} 
      description={this.state.description}/> 
    </div>
      );
  }
}
 
export default App;


