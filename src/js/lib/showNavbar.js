/**
 * Function to display the navbar (is hidden in live quiz)
 * @param {event} event - (optional) - event object if function is run by an on click listener
 */

export function showNavbar (event) {

    if (event) {
        event.preventDefault();
    }
    TweenMax.to('.nav', 0.1, { y: 0 }); //eslint-disable-line no-undef
}
