import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import Spinner from './general/spinner';
import Nav from './general/nav';

const QuizMembers = ({ members, isFetchingQuizMembers, username }) => {
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
                            <span>{ member.score }</span>
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

};

export default QuizMembers;
