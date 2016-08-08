import React, { PropTypes } from 'react';
import Nav from '../general/nav';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';

const StudentModule = ({ isFetchingModule, username }) => {

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <Nav username={ username } />
                THIS IS THE STUDENT VIEW
            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string
};

export default StudentModule;
