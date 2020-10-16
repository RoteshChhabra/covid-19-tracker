import React from 'react';
import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet';


const casesTypeColors={
    cases:{
        hex: '#CC1034',
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204,16,52,0.5)",
        multiplier:400
    },
    recovered:{
        hex: '#7dd71d',
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29,0.5)",
        multiplier:1000
    },
    deaths:{
        hex: '#fb4443',
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67,0.5)",
        multiplier:2000
    }
}

export const sortData=(data)=>{
    const sortedData= [...data];

    sortedData.sort((a,b)=>{
        if(a.cases > b.cases){
            return -1;
        }
        else {
            return 1;
        }
    });
    return sortedData;
}

export const prettyPrint=(stat)=> stat ? `+${numeral(stat).format("0.0a")}` : "+0" ;



export const showDataOnMap=(data, casesType='cases')=>(
    
    data.map((country)=>(
        <Circle
        center= {[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
         >
             <Popup>
                 <div>
                     <div></div>
                     <div></div>
                     <div></div>
                     <div></div>
                     <div></div>
                 </div>
             </Popup>

        </Circle>

    ))
);