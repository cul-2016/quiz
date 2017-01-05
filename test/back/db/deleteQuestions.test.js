const test = require('tape');
const { testClient } = require('../../utils/init');
const deleteQuestions = require('../../../server/lib/deleteQuestions');

test('`deleteQuestions` works', (t) => {

    t.plan(2);
    const expectedError = null;
    const expectedCommand = 'DELETE';
    const question_id = [5];

    deleteQuestions(testClient, question_id, (error, response) => {
        t.equal(error, expectedError, 'error is null, question is deleted from the db correctly.');
        t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, question is deleted from quiz');

        testClient.connect((error, client, done) => {
            if (error) {
                console.error(error);
            }
            client.query("INSERT INTO questions (quiz_id, question, a, b, c, d, correct_answer) VALUES (2, 'Have I Got News For', 'Her', 'You', 'It', 'Them', 'b')", (error) => {
                if (error) throw new Error(error);
                done();
            });
        });
    });
});
