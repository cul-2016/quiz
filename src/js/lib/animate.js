/* eslint-disable no-undef */

/**
 * Adds an elastic style animation to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function elastic (selector) {

    // TweenMax.staggerFrom(
    //     selector,
    //     0.5,
    //     {
    //         y: 150,
    //         opacity: 0,
    //         ease: Back.easeOut.config(2, 0.5),
    //         delay: 1.5, scale: 0
    //     },
    //     0.8
    // );

    // FOR TWO BADGES
    const tl = new TimelineMax();


    tl.add(TweenMax.to(selector, 0, { x: 100, y: 250 }));
    tl.add(TweenMax.staggerFromTo(selector, 1.5, { scale: 0, rotation: 0 }, { scale: 1, opacity: 1, rotation: 1440, ease: Back.easeOut.config(2, 0.5) }, 0.5));
    tl.add(TweenMax.to(selector, 1, {  }));
    tl.add(TweenMax.to(selector, 1, { x: 10, y: 10, scale: 1 }));


}

/**
 * Adds a fade out/fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeOutThenIn (selector) {

    console.log(selector);
    const tl = new TimelineMax();
    console.log(tl);
    tl.add(TweenMax.to(selector, 0, { ease: Circ.easeOut, opacity: 0 }));
    tl.add(TweenMax.to(selector, 0.3, { y: 1000 }));
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeIn, opacity: 1 }));
    tl.add(TweenMax.to(selector, 0.3, { y: 100 }));
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeIn, opacity: 1 }));
}

/**
 * Adds a fade in transition to a DOM element
 * @param {string} selector - JQuery-style selector for the target DOM element(s)
 */

export function fadeIn (selector) {

    TweenMax.from(selector, 0.3, { ease: Circ.easeIn, opacity: 0, delay: 2.5 });
}
