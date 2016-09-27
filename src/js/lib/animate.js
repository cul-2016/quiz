/* eslint-disable no-undef */

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
