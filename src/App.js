import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Grid from '@mui/material/Grid';

import Table from './components/Table'
import Nav from './components/Nav'

function App() {
  	const [league, setLeague] = React.useState();
  const [table, setTable] = React.useState();
	  
  const handleSelect = (event, nodeIds) => {
		setLeague(nodeIds);
		fetchData(nodeIds);
	  };

	  const fetchData = (data) =>{
		return (
			axios.get(`./api/matches/league_${data}.json`).then(res => {
			  setTable(res);
			//   console.log(JSON.stringify(res));
			})
		  )
	  }
   
  return (
    <>
    <Grid container spasing={3}>
      <Grid item xs={2}>
        <Nav handleSelect={handleSelect}/>
      </Grid>

      <Grid item xs={10}>
        <Table league={league} table={table}/>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
