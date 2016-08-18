import React, { PropTypes } from 'react';
// import Questions from './questions';
import Nav from '../general/nav';

const EditQuiz = ({ newQuiz, username }) => { // eslint-disable-line no-unused-vars
    return (
            <div>
                <Nav username={ username } />



                IN EDIT QUIZ

            </div>

    );
};

EditQuiz.propTypes = {
    newQuiz: PropTypes.object,
    username: PropTypes.string
};


export default EditQuiz;
