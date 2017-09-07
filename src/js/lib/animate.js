/* eslint-disable no-undef */

/**
 * Adds an elastic style animation to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function elastic (selector) {

    const tl = new TimelineMax();


    tl.add(TweenMax.to(selector, 0, { x: 100, y: 250 }));
    tl.add(TweenMax.staggerFromTo(selector, 1.5, { scale: 0, rotation: 0 }, { scale: 1, opacity: 1, rotation: 1440, ease: Back.easeOut.config(2, 0.5) }, 0.5));
    tl.add(TweenMax.to(selector, 1, {  }));
    tl.add(TweenMax.to(selector, 1, { x: 10, y: 10, scale: 1 }));


}

export function studentResultsWithBadges () {

    const tl = new TimelineMax();

    tl.add(TweenMax.to('.f-headline', 0, { opacity: 0, y: -200 }));
    tl.add(TweenMax.to('.result__badges', 0, { opacity: 0 }));
    tl.add(TweenMax.to('.result__score--no-badges', 0, { opacity: 0 }));
    tl.add(TweenMax.to('.result__score', 0, { opacity: 0 }));
    tl.add(TweenMax.to('.button', 0, { opacity: 0 }));
    tl.add(TweenMax.fromTo('.app', 0.1, { x: -1, scale: 1.01 }, { x: 2, clearProps: "x", repeat: 20, scale: 1 }));
    tl.add(TweenMax.to('.button', 0, { y: 500 }));

    tl.add(TweenMax.to('.f-headline', 1, { opacity: 1, y: 0 }));
    tl.add(TweenMax.to('.result__badges', 0.2, { opacity: 1 }));
    tl.add(TweenMax.staggerFromTo('.result__badges__container--badge', 1.2, { scale: 0, rotation: 0 }, { scale: 1, opacity: 1, rotation: 1440, ease: Elastic.easeOut.config(1, 0.75) }, 0.5));
    tl.add(TweenMax.to('.result__score--no-badges', 0.2, { opacity: 1 }));
    tl.add(TweenMax.to('.result__score', 0.2, { opacity: 1 }));
    tl.add(TweenMax.fromTo('.result__score--medal', 0.01, { x: -2 }, { x: 2, clearProps: "x", repeat: 20 }));
    tl.add(TweenMax.fromTo('.result__score--medal--no-badges', 0.01, { x: -2 }, { x: 2, clearProps: "x", repeat: 20 }));
    tl.add(TweenMax.to('.button', 0.5, { opacity: 1, y: 0 }));

}

/**
 * Adds a fade out/fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeOutThenIn (selector) {

    const tl = new TimelineMax();
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeOut, opacity: 0 }));
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeIn, opacity: 1 }));
}

/**
 * Adds a fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeIn (selector) {

    TweenMax.from(selector, 0.3, { ease: Circ.easeIn, opacity: 0, delay: 2.5 });
}
