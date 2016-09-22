import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HoldingPage = ({ params }) => {

    return (
        <div className="hero is-fullheight holding-page">


            <div className="hero-body">
                <div className="column is-8 is-offset-2 has-text-centered">
                    <h1>
                        When you are ready, click the button below to review the quiz with your students.
                    </h1>
                    <Link to={ `${params.module_id}/${params.quiz_id}/review` }>
                        <button className="button is-large is-success">
                            Review the quiz
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

HoldingPage.propTypes = {
    params: PropTypes.object.isRequired
};

export default HoldingPage;
