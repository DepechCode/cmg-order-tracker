export const getCardColor = (day) => {
	let cardColor;
	switch (day) {
		case 1:
			cardColor = 'linear-gradient(45deg, #545453 30%, #000000 90%)';
			break;
		case 2:
			cardColor = 'linear-gradient(45deg, #e0d902 30%, #918d06 90%)';
			break;
		case 3:
			cardColor = 'linear-gradient(45deg, #02dbc9 30%, #047067 90%)';
			break;
		case 4:
			cardColor = 'linear-gradient(45deg, #f58c02 30%, #9c6114 90%)';
			break;
		case 5:
			cardColor = 'linear-gradient(45deg, #af64f5 30%, #3c1561 90%)';
			break;
		case 6:
			cardColor = 'linear-gradient(45deg, #e305be 30%, #8c0476 90%)';
			break;
		default:
			cardColor = 'white';
			break;
	}
	return cardColor;
};
