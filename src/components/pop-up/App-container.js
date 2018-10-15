import React from 'react'
import App from './App';
import commons from 'Utils/commons';
import api from 'Services/flickr-api';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        };
    }

    componentDidMount() {
        const url = api.getRandomPicture();
        if (!this.state.imageUrl) {
            this.setState({imageUrl: url});
        }
        // api.getRandomPicture();
    }
    componentDidUpdate(prevProps, prevState) {
        const url = api.getRandomPicture();
        if (this.state.imageUrl != prevState.imageUrl) {
            this.setState({ imageUrl: url });
        }
    }

    render() {
        const {imageUrl} = this.state;

        return (
            imageUrl ?
            <App imageUrl={imageUrl} /> :
            'Cannot found image!'

        );
    }
}

export default AppContainer;
