import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import Tabs from './tabs';
import Spinner from '../general/spinner';
import Trophies from './trophies';

const StudentModule = ({ location, children,
                        trophies, trophies_awarded,
                        isFetchingModule, isQuizOpen,
                        quiz_id, question, response, //eslint-disable-line no-unused-vars
                        handleJoiningQuiz, params, module }) => {


    let buttonAreaClasses = classnames("section has-text-centered transparent-background", {
        "animated-infinite pulse": isQuizOpen
    });

    let buttonClasses = classnames("button", {
        "button__tertiary": isQuizOpen,
    });

    let handleAnimation = (e, livePath) => {
        e.preventDefault();

        /* eslint-disable no-undef */
        const tl = new TimelineMax();
        tl.add( TweenMax.to('.button-expand-animation', 0.1, { css: { color: 'transparent' } }));
        tl.add( TweenMax.fromTo('.nav', 0.5, { y: 0 }, { y: -70, ease: Power1.easeOut }) );
        tl.add( TweenMax.fromTo('.button-expand-animation', 1.0, { scale: 1, backgroundColor: '#fce473' }, { scale: 50, backgroundColor: '#42afe3', ease: Circ.easeIn }));
        /* eslint-enable */
        setTimeout( () => {
            hashHistory.push(livePath);
            handleJoiningQuiz(params.module_id);
        }, 1600);

    };

    let url = location.pathname.split('/');
    let livePath = isQuizOpen ? `/${url[1]}/${url[2]}/live` : location.pathname;
    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div className="student-module">

                <p className="headline"> { module.name } </p>
                <p className="title title__tertiary"> { module.module_id } </p>
                <div className={ buttonAreaClasses }>
                    <button onClick={ (e) => { handleAnimation(e, livePath); }} className={ buttonClasses }>
                        Join Live Quiz
                    </button>
                </div>

                <div>
                    <label className="label"> Trophies </label>
                    <span className="body"> 1/4 </span>
                </div>
                <button className="button button__secondary button__icon--right">
                    My Performance
                    <span className="fa-chevron-right"></span>
                </button>

                <div className="line line__tertiary"></div>

                <div className="quiz">
                    <div className="quiz__item">
                        <div className="quiz__item__score">
                            <span className="small-label small-label__dark quiz__item__score--postion">1</span>
                            <div className="quiz__item__score--medal"> </div>
                            <div className="quiz__item__score--percent">70%</div>
                        </div>
                        <div className="quiz__item__name"> Angles and Percentiles </div>
                    </div>
                    <div className="quiz__item">
                        <div className="quiz__item__score">
                            <span className="quiz__item__score--postion small-label small-label__dark">2</span>
                            <div className="quiz__item__score--medal"> </div>
                            <div className="quiz__item__score--percent">80%</div>
                        </div>
                        <div className="quiz__item__name"> Angle is a Lie </div>
                    </div>
                </div>

                <div>
                    <Trophies trophies={ trophies } trophies_awarded={ trophies_awarded } />

                    <Tabs location={ location } />
                    <div className="section">
                        { children }
                    </div>
                </div>
            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object,
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object,
    isFetchingModule: PropTypes.bool.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string,
    handleJoiningQuiz: PropTypes.func,
    params: PropTypes.object,
    module: PropTypes.object
};

export default StudentModule;
