import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import AddUserForm from '../components/AddUserForm';
import PageHeader from '../components/ui/PageHeader';
import useTable from '../hooks/useTable';
import Popup from '../components/ui/Popup';
import { Input, Button, ActionButton } from '../components/controls/index';
import { getAllDocs, addDoc, updateDoc } from '../services/firestore';

const useStyles = makeStyles((theme) => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: '75%',
	},
	newButton: {
		position: 'absolute',
		right: '10px',
	},
}));

const headCells = [
	{ id: 'fullName', label: 'Name' },
	{ id: 'email', label: 'Email Address' },
	{ id: 'customerNumber', label: 'Customer ID' },
	{ id: 'admin', label: 'Admin' },
	{ id: 'actions', label: 'Actions', disableSorting: true },
];

const Users = () => {
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [records, setRecords] = useState(getAllDocs());
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === '') return items;
				else
					return items.filter((x) =>
						x.fullName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (user, resetForm) => {
		if (user.id === 0) addDoc(user, 'users');
		else updateDoc(user);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setRecords(getAllDocs('users'));
	};

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	return (
		<>
			<PageHeader
				title='New User'
				subTitle='Form design with validation'
				icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
			/>
			<Paper className={classes.pageContent}>
				<Toolbar>
					<Input
						label='Search Users'
						name='search'
						className={classes.searchInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
					<Button
						text='Add New'
						variant='outlined'
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => {
							setOpenPopup(true);
							setRecordForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.fullName}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.customerNumber}</TableCell>
								<TableCell>{item.admin}</TableCell>
								<TableCell>
									<ActionButton
										color='primary'
										onClick={() => {
											openInPopup(item);
										}}
									>
										<EditOutlinedIcon fontSize='small' />
									</ActionButton>
									<ActionButton color='secondary'>
										<CloseIcon fontSize='small' />
									</ActionButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Popup
				title='Employee Form'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<AddUserForm
					recordForEdit={recordForEdit}
					addOrEdit={addOrEdit}
				/>
			</Popup>
		</>
	);
};

export default Users;
