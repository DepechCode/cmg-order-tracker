import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useForm, Form } from '../hooks/useForm';
import { Input, Button, Checkbox } from '../components/controls/index';
import { addDoc } from '../services/firestore';

const initialValues = {
	fullName: '',
	password: '',
	confirmPassword: '',
	email: '',
	customerNumber: '',
	admin: false,
};

const AddUserForm = () => {
	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if (fieldValues.fullName) {
			errors.fullName = fieldValues.fullname
				? ''
				: 'This Field Is Required';
		}
		if (fieldValues.email) {
			errors.email = /$^|.+@.+..+/.test(fieldValues.email)
				? ''
				: 'Email Is Not Valid';
		}
		if (fieldValues.password) {
			errors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				fieldValues.password
			)
				? ''
				: 'Password Is Not Valid';
		}
		if (fieldValues.confirmPassword) {
			errors.confirmPassword =
				fieldValues.password === fieldValues.confirmPassword
					? ''
					: 'Passwords Must Match';
		}

		setErrors({ ...temp });

		if (fieldValues === values) {
			return Object.values(temp).every((x) => x === '');
		}
	};

	const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
		initialValues,
		true,
		validate
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			addDoc(values);
			resetForm();
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={6}>
					<Input
						name='fullName'
						label='Full Name'
						value={values.fullName}
						onChange={handleInputChange}
						error={errors.fullName}
					/>
					<Input
						label='Email'
						name='email'
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
						type='email'
					/>
					<Input
						label='Password'
						name='password'
						value={values.password}
						onChange={handleInputChange}
						error={errors.password}
						type='password'
					/>
					<Input
						label='Confirm Password'
						name='confirmPassword'
						value={values.confirmPassword}
						onChange={handleInputChange}
						type='password'
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						name='customerNumber'
						label='Customer Number'
						value={values.customerNumber}
						onChange={handleInputChange}
						type='number'
					/>
					<Checkbox
						name='admin'
						label='Admin'
						value={values.admin}
						onChange={handleInputChange}
					/>
					<div>
						<Button type='submit' text='Submit' />
						<Button
							text='Reset'
							color='default'
							onClick={resetForm}
						/>
					</div>
				</Grid>
			</Grid>
		</Form>
	);
};

export default AddUserForm;
