import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const LoadingSpinner = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant='h1' color='primary'>
				Loading...
			</Typography>
			<CircularProgress size={80} />
		</div>
	);
};

export default LoadingSpinner;
