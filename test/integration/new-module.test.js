import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import NewModule from '../../src/js/components/new-module';
import { updateMedalValues, updateTextValues, addNewModule } from '../../src/js/actions/new-module';
import { store } from '../../src/js/store';

function updateTrophyVals (medal, value) {

    if (value !== "") {
        value = parseInt(value, 10);
    }
    store.dispatch(updateMedalValues(medal, value));
}

function updateMedalVals (medal, value) {

    if (value !== "") {
        value = parseInt(value, 10);
    }
    store.dispatch(updateMedalValues(medal, value));
}

function handleInputChange (inputKey, value) {
    store.dispatch(updateTextValues(inputKey, value));
}

function submit () {

    // data validation should happen here

    let currentState = store.getState().newModule;
    let data = Object.assign(
        {},
        { module_id: currentState.module_id },
        { name: currentState.name },
        { trophies: currentState.trophies },
        {
            medals: {
                medal_name: ["bronze", "silver", "gold"],
                condition: currentState.medals
            }
        }
    );
    store.dispatch(addNewModule(data));
}

test('When lecturer adjusts bronze medal threshold, medal ranges update correctly', (t) => {

    t.plan(1);

    const page = renderIntoDocument(<div><NewModule medals={ store.getState().newModule.medals }
                                                    submit={ submit }
                                                    handleInputChange={ handleInputChange }
                                                    updateTrophyVals={ updateTrophyVals }
                                                    updateMedalVals={ updateMedalVals }
                                                    trophies={ store.getState().newModule.trophies } /></div> );

    const bronzeInput = ReactDOM.findDOMNode(page).querySelector('input[name="bronze"]');
    bronzeInput.value = 40;
    Simulate.change(bronzeInput);

    const newMedals = store.getState().newModule.medals;

    t.equal(newMedals[0], 41, 'when bronze value is changed, silver lower bound updates');
});

test('When lecturer adjusts gold medal threshold, medal ranges update correctly', (t) => {

    t.plan(1);

    const page = renderIntoDocument(<div><NewModule medals={ store.getState().newModule.medals }
                                                    updateTrophyVals={ updateTrophyVals }
                                                    updateMedalVals={ updateMedalVals }
                                                    trophies={ store.getState().newModule.trophies } /></div> );

    const goldInput = ReactDOM.findDOMNode(page).querySelector('input[name="gold"]');
    goldInput.value = 77;
    Simulate.change(goldInput);

    const newMedals = store.getState().newModule.medals;

    t.equal(newMedals[1], 76, 'when bronze value is changed, silver upper bound updates');
});
