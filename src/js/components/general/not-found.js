import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="outer red-hero">
                <div className="middle">
                    <div className="container inner has-text-centered">
                        <h1 className="title">
                            Oops! Nothing to see here
                        </h1>
                        <Link to="/dashboard">
                            <button className="subtitle button is-success is-large">Dashboard</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
