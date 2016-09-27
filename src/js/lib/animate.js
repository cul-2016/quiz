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


export function fadeTransition (selector) {

    const tl = new TimelineMax();
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeOut, opacity: 0 }));
    tl.add(TweenMax.to(selector, 0.3, { ease: Circ.easeIn, opacity: 1, backgroundColor: '#42afe3' }));
}
