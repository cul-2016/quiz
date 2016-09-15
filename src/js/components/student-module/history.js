import React, { PropTypes } from 'react';
import Medal from '../general/medal';


const StudentHistory = ({ history, medalConditions }) => {

    let mappedHistory = history.map((quiz, i) => {

        let percentageScore = Math.round(quiz.score / quiz.num_questions * 100);

        return (
            <tr key={ i }>
                <td className="subtitle is-5">
                    { quiz.name }
                </td>
                <td>
                    <span className="subtitle is-4">
                        { `${quiz.score} ` }
                    </span>
                    <span>
                        { `out of ${quiz.num_questions}` }
                    </span>
                </td>
                <td>
                    <Medal percentageScore={ percentageScore } medalConditions={ medalConditions } />
                </td>
            </tr>
        );
    });

    return (
        <table className="student-history table">
            <tbody>

                { mappedHistory }
            </tbody>
        </table>
    );
};

StudentHistory.propTypes = {
    history: PropTypes.array,
    medalConditions: PropTypes.array
};

export default StudentHistory;
