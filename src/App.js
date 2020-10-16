import React, {useState , useEffect }from 'react';
import './App.css';
import {FormControl, Select, MenuItem, CardContent, Card} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData} from './util';
import 'leaflet/dist/leaflet.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(
    {lat : 34.80746,
      lng: -40.4796
    });
  const [mapZoom, setMapZoom]= useState(3);
  const [mapCountries, setMapCountries] =useState([]);
  const [casesType, setCasesType] = useState("cases");

useEffect(()=>{

  fetch('https://disease.sh/v3/covid-19/all')
  .then((response) => response.json())
  .then((data)=>{
    setCountryInfo(data);
  })

},[]);

useEffect(()=>{

  const getCountriesData = async ()=>{
    await fetch("https://disease.sh/v3/covid-19/countries").then((response)=> response.json())
    .then((data)=>{
      const countries = data.map((country)=>(
        {
        name: country.country,
        value: country.countryInfo.iso2
      }));

      const sortedData = sortData(data);
      setTableData(sortedData);
      setMapCountries(data);
      setCountries(countries);
    });
  };
  getCountriesData();

},[]);

const onCountryChange = async (event)=>{
  const countryCode = event.target.value;
  // console.log(countryCode);
  // setCountry(countryCode);

  const url = countryCode ==='worldwide' ?  'https://disease.sh/v3/covid-19/all' : 
  `https://disease.sh/v3/covid-19/countries/${countryCode}` ;

  await fetch(url)
  .then((response)=>response.json())
  .then((data)=>{
    setCountry(countryCode);
    setCountryInfo(data);

    countryCode === 'worldwide' ?  setMapCenter([34.80746,-40.4796]):setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);

  });
};

  console.log(countryInfo);



  return (
    <div className="app">
      <div className='app__left'>
      <div className='app__header'>
      <h1>COVID-19 TRACKER</h1>
      <FormControl className='app--dropdown'>
       <Select
       variant='outlined'
       value={country}
       onChange={onCountryChange}
       >
         <MenuItem value='worldwide'>Worldwide</MenuItem>
         {countries.map((country)=> (
           <MenuItem value={country.value}>{country.name}</MenuItem>
         ))}
       </Select>
      </FormControl>
      </div>
      <div className='app__stats'>
          <InfoBox 
          isRed={true}
          active={casesType === 'cases'}
          onClick ={(e)=> setCasesType('cases')}
          title="Coronavirus Cases" 
          total={countryInfo.cases} 
          cases={countryInfo.todayCases} />

          <InfoBox 
          active={casesType === 'recovered'}
          onClick ={(e)=> setCasesType('recovered')}
          title="Recovered" 
          total={countryInfo.recovered} 
          cases={countryInfo.todayRecovered} />

          <InfoBox 
          isRed={true}
          active={casesType === 'deaths'}
          onClick ={(e)=> setCasesType('deaths')}
          title="Deaths"
           total={countryInfo.deaths} 
           cases={countryInfo.todayDeaths} />

      </div>
      <div>
        <Map 
        casesType= {casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
        />
      </div>
      </div>
      <Card className='app__right'>
          <CardContent>
            <h3>Live cases by countries</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
      </Card>
    </div>
  );
}

export default App;
