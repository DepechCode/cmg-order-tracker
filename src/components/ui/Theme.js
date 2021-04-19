import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		common: {
			blue: blue[800],
			green: green[800],
		},
		primary: {
			main: blue[800],
			light: blue[500],
		},
		secondary: {
			main: green[800],
			light: green[500],
		},
		background: {
			default: blueGrey[800],
			paper: blueGrey[900],
		},
	},
	typography: {
		h3: {
			fontWeight: 300,
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: 'translateZ(0)',
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

export default theme;
