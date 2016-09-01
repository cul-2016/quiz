import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HoldingPage = ({ params }) => {

    return (
        <div className="hero is-fullheight">
            HOLDING PAGE ONCE QUIZ HAS BEEN COMPLETED

            <div className="hero-body">
                <div className="column is-8 is-offset-2 has-text-centered">
                    <Link to={ `${params.module_id}/${params.quiz_id}/review` }>
                        <button className="button is-large is-success">
                            Quiz Review
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
