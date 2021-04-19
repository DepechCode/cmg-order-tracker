import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
//import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import BathtubIcon from '@material-ui/icons/Bathtub';

const useStyles = makeStyles((theme) => ({
	card: {
		height: '100%',
	},
	header: {
		padding: '.5em',
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		textAlign: 'center',
	},
	avatarLarge: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		fontSize: 18,
		fontWeight: 'bold',
	},
	headerTitle: {
		borderBottom: '1px solid white',
	},
	content: {
		color: theme.palette.getContrastText(theme.palette.background.paper),
	},
	cardActions: {
		justifyContent: 'flex-end',
	},
}));

const Jobs = ({ jobs }) => {
	const classes = useStyles();

	return (
		<Card elevation={5} className={classes.card}>
			<CardHeader
				avatar={
					<Avatar className={classes.avatarLarge}>
						{jobs.dueDate.slice(5).replace('-', '/')}
					</Avatar>
				}
				title={
					<Typography variant='h5' className={classes.headerTitle}>
						{jobs.orderId} - {jobs.type}
					</Typography>
				}
				subheader={
					<Typography variant='h6'>{jobs.status.slice(2)}</Typography>
				}
				className={classes.header}
				style={{
					backgroundColor: jobs.dueDay,
				}}
			/>
			<CardContent className={classes.content}>
				<Typography variant='body1' gutterBottom>
					{jobs.other}
				</Typography>
				<Typography variant='body2' gutterBottom>
					Material: {jobs.material}
				</Typography>
				<Typography variant='body2' gutterBottom>
					Edge: {jobs.edge}
				</Typography>
				<Typography variant='body2' gutterBottom>
					SqFt: {jobs.sqFt}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Fab color='primary'>
					<BathtubIcon />
				</Fab>
			</CardActions>
		</Card>
	);
};

export default Jobs;
