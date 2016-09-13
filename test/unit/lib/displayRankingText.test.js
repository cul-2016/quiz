import test from 'tape';
import { displayRankingText } from '../../../src/js/lib/feedback-methods';
import text from '../../../src/js/lib/rankingText.json';


test('`displayRankingText` returns correct message for students within 1 - 10% percentile', (t) => {

    t.plan(1);
    const result = displayRankingText(text, 9);
    t.equal(result, text.top10);
});


test('`displayRankingText` returns correct message for students within 11 - 25% percentile', (t) => {

    t.plan(1);
    const result = displayRankingText(text, 24);
    t.equal(result, text.top11to25);
});

test('`displayRankingText` returns correct message for students within 26 - 50% percentile', (t) => {

    t.plan(1);
    const result = displayRankingText(text, 47);
    t.equal(result, text.top26to50);
});

test('`displayRankingText` returns correct message for students within 51 - 90% percentile', (t) => {

    t.plan(1);
    const result = displayRankingText(text, 65);
    t.equal(result, text.top51to90);
});

test('`displayRankingText` returns correct message for students within 91 - 100% percentile', (t) => {

    t.plan(1);
    const result = displayRankingText(text, 97);
    t.equal(result, text.top91to100);
});
