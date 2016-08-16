import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from './general/spinner';
import Nav from './general/nav';


const QuizMembers = ({ members, isFetchingQuizMembers, username, params }) => {


    let mappedMembers;
    if (members) {
        mappedMembers = members.map((member, i) => {
            return (
                <div key={i} className="box column is-8 is-offset-2">
                    <div className="columns">
                        <div className="column">
                            <span>{ member.email }</span>
                        </div>
                        <div className="column">
                            <h4>{ member.username }</h4>
                        </div>
                        <div className="column">
                            <p>{ member.score }</p>
                            <Link to={ `${params.module_id}/${params.quiz_id}/${i}/edit-score` }><button className="button is-warning">Edit Score</button></Link>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
        {
            isFetchingQuizMembers && <Spinner />
        }
        {
            !isFetchingQuizMembers && members &&
            <div>
                <Nav username={ username } />
                <div>
                    <h2 className="has-text-centered"> Quiz Members </h2>
                    <div className="column is-8 is-offset-2">
                        <div className="columns">
                            <div className="column">
                                <label className="label">Email</label>
                            </div>
                            <div className="column">
                                <label className="label">Username</label>
                            </div>
                            <div className="column">
                                <label className="label">score</label>
                            </div>
                        </div>
                    </div>
                    { mappedMembers }
                </div>
            </div>

        }
        </div>
    );
};

QuizMembers.propTypes = {
    members: PropTypes.array,
    isFetchingQuizMembers: PropTypes.bool,
    username: PropTypes.string,
    params: PropTypes.object
};

export default QuizMembers;
