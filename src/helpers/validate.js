const validate = (values) => {
	let temp = { ...errors };
	if ('fullName' in values)
		temp.fullName = values.fullName ? '' : 'This field is required.';
	if ('email' in values)
		temp.email = /$^|.+@.+..+/.test(values.email)
			? ''
			: 'Email is not valid.';
	if ('mobile' in values)
		temp.mobile =
			values.mobile.length > 9 ? '' : 'Minimum 10 numbers required.';
	if ('departmentId' in values)
		temp.departmentId =
			values.departmentId.length != 0 ? '' : 'This field is required.';
	setErrors({
		...temp,
	});

	if (values) return Object.values(temp).every((x) => x == '');
};

export default validate;
