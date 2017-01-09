import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import NewModule from '../../src/js/components/new-module/new-module.js';
import { updateMedalValues, updateTextValues, addNewModule } from '../../src/js/actions/new-module.js';
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

function handleCodeInputChange (inputKey, id) {
    store.dispatch(updateTextValues(inputKey, id));
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
                                                    isValidatingModuleID={ store.getState().newModule.isValidatingModuleID }
                                                    name={ store.getState().newModule.name }
                                                    module_id={ store.getState().newModule.module_id }
                                                    submit={ submit }
                                                    handleInputChange={ handleInputChange }
                                                    handleCodeInputChange={ handleCodeInputChange }
                                                    updateTrophyVals={ updateTrophyVals }
                                                    updateMedalVals={ updateMedalVals }
                                                    trophies={ store.getState().newModule.trophies } /></div> );

    const bronzeInput = ReactDOM.findDOMNode(page).querySelector('input[name="bronze"]'); // eslint-disable-line
    bronzeInput.value = 40;
    Simulate.change(bronzeInput);

    const newMedals = store.getState().newModule.medals;

    t.equal(newMedals[0], 41, 'when bronze value is changed, silver lower bound updates');
});

test('When lecturer adjusts gold medal threshold, medal ranges update correctly', (t) => {

    t.plan(1);

    const page = renderIntoDocument(<div><NewModule medals={ store.getState().newModule.medals }
                                                    isValidatingModuleID={ store.getState().newModule.isValidatingModuleID }
                                                    name={ store.getState().newModule.name }
                                                    module_id={ store.getState().newModule.module_id }
                                                    submit={ submit }

                                                    handleInputChange={ handleInputChange }
                                                    handleCodeInputChange={ handleCodeInputChange }
                                                    updateTrophyVals={ updateTrophyVals }
                                                    updateMedalVals={ updateMedalVals }
                                                    trophies={ store.getState().newModule.trophies } /></div> );

    const goldInput = ReactDOM.findDOMNode(page).querySelector('input[name="gold"]'); // eslint-disable-line
    goldInput.value = 77;
    Simulate.change(goldInput);

    const newMedals = store.getState().newModule.medals;

    t.equal(newMedals[1], 76, 'when bronze value is changed, silver upper bound updates');
});
