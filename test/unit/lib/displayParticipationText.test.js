import test from 'tape';
import { displayParticipationText } from '../../../src/js/lib/feedback-methods';
import text from '../../../src/js/lib/feedback-text.json';


test('`displayParticipationText` returns correct message for students with fewer than 4 quizzes', (t) => {

    t.plan(1);
    const result = displayParticipationText(text, null);
    t.ok(result.indexOf("We haven't run enough quizzes to give you") > -1);
});

test('`displayParticipationText` returns correct message for students participation rate >= 75', (t) => {

    t.plan(1);

    const rate = 87;
    const expectedSnippet = "It’s great that you’re taking part in most of the quizzes.";

    const result = displayParticipationText(text, rate);
    t.ok(result.indexOf(expectedSnippet) > -1);
});

test('`displayParticipationText` returns correct message for students participation rate < 50', (t) => {

    t.plan(1);

    const rate = 48;
    const expectedSnippet = "You’re not taking part in a lot of the quizzes.";

    const result = displayParticipationText(text, rate);
    t.ok(result.indexOf(expectedSnippet) > -1);
});
