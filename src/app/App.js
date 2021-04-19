import React from 'react';
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core';
import Header from '../components/ui/Header';

import JobsList from '../screens/JobsList';
import theme from '../components/ui/Theme';

const useStyles = makeStyles({
	appMain: {
		padding: '2em',
		width: '100%',
	},
});

function App() {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<div className={classes.appMain}>
				<JobsList />
			</div>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default App;
