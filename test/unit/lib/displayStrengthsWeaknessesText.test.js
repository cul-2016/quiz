import test from 'tape';
import { displayStrengthsWeaknessesText } from '../../../src/js/lib/feedback-methods';
import text from '../../../src/js/lib/feedback-text.json';


test('`displayStrengthsWeaknessesText` returns correct message for students with fewer than 3 quizzes', (t) => {

    t.plan(1);
    const result = displayStrengthsWeaknessesText(text, null);
    t.equal(result, text.strengthsWeaknesses.null);
});

test('`displayStrengthsWeaknessesText` returns correct message for students with data', (t) => {

    t.plan(1);

    const quizzes = [
        "My worst quiz",
        "My best quiz"
    ];
    const expectedSnippet = "Looking across all the quizzes you’ve taken, your top quiz was";

    const result = displayStrengthsWeaknessesText(text, quizzes);
    t.ok(result.indexOf(expectedSnippet) > -1);
});
