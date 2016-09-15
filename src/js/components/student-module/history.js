import React, { PropTypes } from 'react';


const StudentHistory = ({ history }) => {

    let mappedHistory = history.map((quiz, i) => {
        return (
            <tr key={ i }>
                <td className="subtitle is-4">
                    { quiz.name }
                </td>
                <td>
                    <span className="subtitle is-3">
                        { `${quiz.score} ` }
                    </span>
                    <span>
                        { `out of ${quiz.num_questions}` }
                    </span>
                </td>
                <td>
                    The medal
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
    history: PropTypes.array
};

export default StudentHistory;
