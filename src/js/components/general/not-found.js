import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="hero is-danger is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Oops! Nothing to see here
                        </h1>
                        <Link to="/dashboard">
                            <h2 className="subtitle button is-success is-large">Home</h2>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
