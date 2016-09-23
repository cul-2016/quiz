const fadeTransition = () => {
    /* eslint-disable no-undef */
    const tl = new TimelineMax();
    tl.add(TweenMax.to('.live-quiz', 0.3, { ease: Circ.easeOut, opacity: 0 }));
    tl.add(TweenMax.to('.live-quiz', 0.3, { ease: Circ.easeIn, opacity: 1, backgroundColor: '#42afe3' }));
    /* eslint-enable */
};

export default fadeTransition;
