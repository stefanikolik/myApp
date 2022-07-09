import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import treeData from "./../api/tree.json";
import _ from "lodash";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
	color: theme.palette.text.secondary,
	borderTopRightRadius: theme.spacing(2),
	borderBottomRightRadius: theme.spacing(2),
	paddingRight: theme.spacing(1),
	fontWeight: theme.typography.fontWeightMedium,
	'&.Mui-expanded': {
	  fontWeight: theme.typography.fontWeightRegular,
	},
	'&:hover': {
	  backgroundColor: theme.palette.action.hover,
	},
	'&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
	  backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
	  color: 'var(--tree-view-color)',
	},
	[`& .${treeItemClasses.label}`]: {
	  fontWeight: 'inherit',
	  color: 'inherit',
	},
  },
  [`& .${treeItemClasses.group}`]: {
	marginLeft: 0,
	[`& .${treeItemClasses.content}`]: {
	  paddingLeft: theme.spacing(2),
	},
  },
}));

function StyledTreeItem(props) {
  const {
	bgColor,
	color,
	labelIcon: LabelIcon,
	labelInfo,
	labelText,
	...other
  } = props;

  return (
	<StyledTreeItemRoot
	  label={
		<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
		  <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
		  <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
			{labelText}
		  </Typography>
		  <Typography variant="caption" color="inherit">
			{labelInfo}
		  </Typography>
		</Box>
	  }
	  style={{
		'--tree-view-color': color,
		'--tree-view-bg-color': bgColor,
	  }}
	  {...other}
	/>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView(props) {
	const [data, setData] = React.useState(treeData.data);
	
	const Tree5 = ({data}) => { 
		const sortedData = _.orderBy(data, ['priority'],['desc']);
				
		return (
			sortedData && sortedData.map((item, index, array) => (
					<>
					<StyledTreeItem 
						nodeId={array[index].id}
						labelText={array[index].name}
						labelInfo={item.total}
						color="#e3742f"
						bgColor="#fcefe3"
						
						>
						{array[index].countries && <Countries data={array[index].countries} />}
						</StyledTreeItem>

					</>
			))
		)       
	};

	const Countries = ({data}) => ( 
		<>
		  {data && data.map((item, index) => (
			<>
				<StyledTreeItem
					nodeId={item.id}
					labelText={item.name}            
					labelInfo={item.total}
					color="#e3742f"
					bgColor="#fcefe3"
					
				>
					{item.leagues && <Leagues data={item.leagues}/>}        
				</StyledTreeItem>

			</>
		  ))}
	   </>
	);

	const Leagues = ({data}) => {     
	//   console.log("leagues const "+ JSON.stringify(data))
		return(
			<>
				{data && data.map((item, index, array) => ( 
					<StyledTreeItem
						nodeId={item.id}
						labelText={item.name}
						labelInfo={item.total}
						color="#e3742f"
						bgColor="#fcefe3"
					/>
				))}
			  </>
		)
	};

  return (
	
	<TreeView
	  aria-label="gmail"
	  defaultExpanded={['3']}
	  defaultCollapseIcon={<ArrowDropDownIcon />}
	  defaultExpandIcon={<ArrowRightIcon />}
	  onNodeSelect={props.handleSelect}
	  defaultEndIcon={<div style={{ width: 24 }} />}
	  sx={{ height: '100%', flexGrow: 1, maxWidth: '400px', overflowY: 'auto', paddingRight: '30px' }}
	>
		<Tree5 data={data}/>
	</TreeView>
  );
}
