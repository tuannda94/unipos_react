import React from 'react'
import App from './App';
import commons from 'Utils/commons';
import api from 'Services/flickr-api';

class UserDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
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

export default UserDetailContainer;
