import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { getViewRecords } from '../services/trackvia';
import Jobs from './Jobs';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { makeStyles } from '@material-ui/core';
import { getCardColor } from '../helpers/cardColors';

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
	},
}));

const JobsList = () => {
	const classes = useStyles();
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getViewRecords().then((res) => {
			const jobData = res.data.map((job) => {
				return {
					lineItemId: job['Auto Counter'],
					cncEndTime: job['CNC End Time'],
					saw: job['Cutting Resource'],
					dueDate: job['Due Date'],
					edge: job['Edge'],
					edgeId: job['Edge(id)'],
					fabricator: job['Fabricator'],
					cnc: job['Link to Edging Machine'],
					cncId: job['Link to Edging Machine(id)'],
					material: job['Material'],
					materialId: job['Material(id)'],
					orderId: job['Order ID'],
					orderRootId: job['Order(id'],
					status: job['Production Status'],
					sawEndTime: job['Saw End Time'],
					sqFt: parseFloat(job['Total Square Feet']).toFixed(2),
					type: job['Type'],
					other: job['Type - Other'],
					id: job['id'],
					dueDay: getCardColor(new Date(job['Due Date']).getDay()),
				};
			});
			setJobs(jobData);
			setLoading(false);
			console.log(jobData);
		});
	}, []);

	return (
		<Grid container direction='row' spacing={3}>
			{loading ? (
				<Grid container className={classes.root}>
					<LoadingSpinner />
				</Grid>
			) : (
				jobs.map((job) => {
					return (
						<Grid item sm={12} md={6} lg={4} zeroMinWidth>
							<Jobs jobs={job} key={job.id} />
						</Grid>
					);
				})
			)}
		</Grid>
	);
};

export default JobsList;
