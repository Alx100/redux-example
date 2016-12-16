let mockApiData = [
	{
		id: 1,
		name: 'Enter sandman'
	},
	{
		id: 2,
		name: 'Welcome Home'
	},
	{
		id: 3,
		name: 'Master of Puppets'
	}
];

export const getTracks = () => dispatch => {
	setTimeout(() => {
		console.log('I got tracks!');
		dispatch({type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData});
	}, 2000);
};
