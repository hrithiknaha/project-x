function dateFormat(dateZ) {
	const date = new Date(dateZ);
	var months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	return months[date.getMonth()] + ', ' + date.getFullYear();
}

function dateCount(date) {
	const d = new Date(date);
	var months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	return months[d.getMonth()] + ', ' + d.getDate();
}

export { dateFormat, dateCount };
