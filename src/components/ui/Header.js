import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menubackgroud: {
		background: 'linear-gradient(45deg, #348237 30%, #033805 90%)',
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const [auth, setAuth] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClose = () => {
		localStorage.removeItem('user');
		props.setUserState();
		setAnchorEl(null);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.menubackgroud}>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						React Js with Firebase Authentication
					</Typography>
					{auth && (
						<div>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem>Profile</MenuItem>
								<MenuItem onClick={handleClose}>
									Logout
								</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
