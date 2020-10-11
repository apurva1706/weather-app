import React from 'react';
const Weather = (props) => {
    return ( 
        <div className="container text-dark">
            <div className="cards pt-4">
            <h1>{props.city}</h1>
            <h5 className="py-4">
            <i className={`wi ${props.icon} display-1`}></i>
            </h5>
            {props.temp?<h3 className="py-2">{props.temp}&deg;C</h3>:null}
            {minmaxTemp(props.temp_min,props.temp_max)}
            <h2 className="py-3">{props.description}</h2>
            </div>
        </div>
     );
}
function minmaxTemp(min,max){
    if(min&&max)
    {
    return(
    <h3>
    <span className="px-4">Minimum-{min}&deg;C</span>
    <span className="px-4">Maximum-{max}&deg;C</span>
    </h3>
);
    }
}
 
export default Weather;