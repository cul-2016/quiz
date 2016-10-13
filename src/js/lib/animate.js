/* eslint-disable no-undef */

/**
 * Adds an elastic style animation to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function elastic (selector) {

    TweenMax.staggerFrom(
        selector,
        0.5,
        {
            y: 150,
            opacity: 0,
            ease: Back.easeOut.config(2, 0.5),
            delay: 1.5, scale: 0
        },
        0.8
    );
}

/**
 * Adds a fade out/fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeOutThenIn (selector) {

    const tl = new TimelineMax();
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeOut, opacity: 0 }));
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeIn, opacity: 1, backgroundColor: '#42afe3' }));
}

/**
 * Adds a fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeIn (selector) {

    TweenMax.from(selector, 0.3, { ease: Circ.easeIn, opacity: 0, delay: 2.5 });
}
