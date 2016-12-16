import styles from './index.scss';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTracks} from './actions/tracks';

class App extends Component {
	constructor() {
		super();

		this.state = {
			trackInput: '',
			findInput: ''
		};

		this.onChangeTrackInput = this.onChangeTrackInput.bind(this);
		this.onChangeFindInput = this.onChangeFindInput.bind(this);
		this.onAddTrack = this.onAddTrack.bind(this);
		this.onFindTrack = this.onFindTrack.bind(this);
	}

	onChangeTrackInput(e) {
		this.setState({trackInput: e.target.value});
	}

	onChangeFindInput(e) {
		this.setState({findInput: e.target.value});
	}

	onAddTrack() {
		if (this.state.trackInput.length > 0) {
			this.setState({trackInput: ''});
			this.props.onAddTrack(this.state.trackInput);
		}
	}

	onFindTrack() {
		this.props.onFindTrack(this.state.findInput);
	}

	render() {
		return (
			<div>
				<h1>Tracks</h1>
				<div>
					<input type="text" value={this.state.trackInput} onChange={this.onChangeTrackInput}/>
					<button onClick={this.onAddTrack}>Add track</button>
				</div>
				<div>
					<input type="search" value={this.state.findInput} onChange={this.onChangeFindInput}/>
					<button onClick={this.onFindTrack}>Find track</button>
				</div>
				<div>
					<button onClick={this.props.onGetTracks}>Get tracks</button>
				</div>
				<ul>
					{
						this.props.tracks.map((track, index) =>
							<li key={index}>{`${index + 1}. ${track.name}`}</li>
						)
					}
				</ul>
			</div>
		);
	}
}

export default connect(
	state => ({
		tracks: state.tracks.filter(track => track.name.includes(state.filterTracks))
	}),
	dispatch => ({
		onAddTrack: (name) => {
			const payload = {
				id: Date.now().toString(),
				name
			};
			dispatch({type: 'ADD_TRACK', payload})
		},
		onFindTrack: (name) => {
			dispatch({type: 'FIND_TRACK', payload: name})
		},
		onGetTracks: () => {
			dispatch(getTracks());
		}
	})
)(App);
