import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import layoutApi from './../api/layout.json';

import _ from "lodash";

import moment from 'moment'

export default function BasicTable(props) {
	const [data, setData] = React.useState(layoutApi.data);
	
	const [bothToScore, setbothToScore] = React.useState(layoutApi.data[0].odds.length)
	const [doubleChance, setdoubleChance] = React.useState(layoutApi.data[1].odds.length)
	const [drawNoBet, setdrawNoBet] = React.useState(layoutApi.data[2].odds.length)
	const [triWay, setTriWay] = React.useState(layoutApi.data[3].odds.length)
	const [totalGoals, settotalGoals] = React.useState(layoutApi.data[4].odds.length)
	
	React.useEffect(()=>{
		// console.log('useeffect u table'+ props.table)
		
	})
	
	const RenderTableRow = ({data}) =>{
		const prioritySort = _.orderBy(data, ['priority'],['asc']);

		return(<>
			<TableRow >
				<TableCell colSpan={2} />

				{prioritySort.map((item, index, array) => {
					return(
						<>				 
							<TableCell key={item.id} colSpan={array[index].odds.length} align="center">
									{item.name} 
							</TableCell>
						</>
				)})} 
			</TableRow>

			<TableRow>
				<TableCell align="center"> Date</TableCell>
				<TableCell align="center"> Pair </TableCell>	
					{prioritySort.map((item, index, array) => {
						return(
							<>			
								{item.id ?
									<p key={item.id}>
											{item.name} 
									</p >

									:

									<RenderCells data={array[index].odds} />
								}	 
							</>
						)})} 
			</TableRow>
			</>
			
		)
	}

	const RenderCells = ({data}) =>{
		const prioritySort = _.orderBy(data, ['priority'],['asc']);
		return(
			prioritySort.map((item, index, array) => {
				return(
					<>
						<TableCell align="center" key={item.id} >
							{item.name}
						</TableCell>
					</>
				)
			}) 
			
		)
	}

	const TableBodyCell = (value, num) => {
		// console.log('vakoj e u tablebodycell'+ JSON.stringify(value) )
		const idSort = _.orderBy(value.data, ['id'],['desc']);

		// const idSort = value.data;
		// console.log('idsort kako iskaca prazan ->'+ JSON.stringify(value.data) )
		// console.log('num->'+ num )
		return(<>
				{Object.keys(idSort).length ? <>
					{idSort.map((row) => {
						return (
							<>
								<TableCell key={row.id} align="center">{row ? <>{row.value} </>: null } </TableCell> 
							</>
						)}
					)}</>
					: 	<>
							 {(() => {
								const options = [];

								for (let i = 0; i < value.num; i++) {
									options.push(<TableCell></TableCell>);
								}

								return options;
								})()}
						</>
				}
			</>)
	}

	const TableBodyCellReverse = (value, num) => {
		// console.log('vakoj e u tablebodycell'+ JSON.stringify(value) )
		const idSort = _.orderBy(value.data, ['id'],['asc']);

		// const idSort = value.data;
		// console.log('idsort kako iskaca prazan ->'+ JSON.stringify(value.data) )
		// console.log('num->'+ num )
		return(<>
				{Object.keys(idSort).length ? <>
					{idSort.map((row) => {
						return (
							<>
								<TableCell key={row.id} align="center">{row ? <>{row.value} </>: null } </TableCell> 
							</>
						)}
					)}</>
					: 	<>
							 {(() => {
								const options = [];

								for (let i = 0; i < value.num; i++) {
									options.push(<TableCell></TableCell>);
								}

								return options;
								})()}
						</>
				}
			</>)
	}

	const TableBodyMaper = (match) =>{
		// console.log('match u funkciju --->'+ JSON.stringify(match))
		const jsonData = match.data.data.data;
		const sortedData = _.orderBy(jsonData, ['sd'],['asc']);
		// console.log('jsondata u funkciju --->'+ JSON.stringify(jsonData))

			return(
				sortedData.map((row, index, array) => {	
					return(<>
						<TableRow
						key={row.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell align="center" component="th" scope="row">
								{moment(row.sd).format('DD.MM - h:mm')}
							</TableCell>
							<TableCell align="center">{row.h} - {row.a}</TableCell>
										
							<TableBodyCell data={array[index].odds['3way']} num={triWay} />

							<TableBodyCell data={array[index].odds['doubleChance']} num={doubleChance} />
							<TableBodyCellReverse data={array[index].odds['drawNoBet']} num={drawNoBet} /> 
							<TableBodyCell data={array[index].odds['totalGoals']} num={totalGoals} />
							<TableBodyCellReverse data={array[index].odds['bothToScore']} num={bothToScore} />

						</TableRow>
			</>)}))
	}


  return (

	<TableContainer component={Paper}>
	  <Table sx={{ minWidth: 650 }} aria-label="simple table">
		<TableHead>
				<RenderTableRow data={data} />
		</TableHead>
		<TableBody>
		{props.table ?

			<TableBodyMaper data={props.table} />

			:

			<p align="center">select a league </p>
		}
		</TableBody>
	  </Table>
	</TableContainer>
	
  );
}
