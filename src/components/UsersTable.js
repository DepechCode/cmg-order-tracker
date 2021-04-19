import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { getAllDocs } from '../services/firestore';

const UsersTable = () => {
	const [records, setRecords] = useState([]);
	const [currentRecord, setCurrentRecord] = useState(null);
	const [index, setIndex] = useState(-1);
	const [searchName, setSearchName] = useState('');
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const pageSizes = [10, 20, 30];

	const onChangeSearch = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	const getRequestParams = (searchName, page, pageSize) => {
		let params = {};
		if (searchName) {
			params['name'] = searchName;
		}

		if (page) {
			params['page'] = page - 1;
		}

		if (pageSize) {
			params['pageSize'] = pageSize;
		}

		return params;
	};

	const retrieveRecords = () => {
		const params = getRequestParams(searchName, page, pageSize);

		getAllDocs(params)
			.then((res) => {
				const { records, totalPages } = res.data;

				setRecords(records);
				setCount(totalPages);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(retrieveRecords, [page, pageSize]);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handlePageSizeChange = (event) => {
		setPageSize(event.target.value);
		setPage(1);
	};

	return <div></div>;
};

export default UsersTable;
