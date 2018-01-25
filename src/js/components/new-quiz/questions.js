import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const RadioButton = ({ question, value, idx, handleInputChange }) => {

    const sliderClass = classnames({
        "form__radio--off": question.correct_answer !== value,
        "form__radio--on": question.correct_answer === value
    });
    const sliderCircleClass = classnames({
        "form__radio--off--circle": question.correct_answer !== value,
        "form__radio--on--circle": question.correct_answer === value
    });
    const sliderCylinderClass = classnames({
        "form__radio--off--cylinder": question.correct_answer !== value,
        "form__radio--on--cylinder": question.correct_answer === value
    });

    return (
            <div className={ sliderClass }>
              <p className="f-small-body f-small-body--grey">correct</p>
            <div onClick={ () => handleInputChange('correct_answer', value, idx) }>
              <div className={ sliderCylinderClass }></div>
              <div className= { sliderCircleClass }></div>
            </div>
          </div>
    );
};

const InputChanger = ({ question, value, idx, handleInputChange }) => <textarea { ...{
    type: "text",
    className: "form__input form__input--new-quiz-answer",
    value: question[value] || "",
    onChange: (e) => handleInputChange(value, e.target.value, idx),
    placeholder: value
} } />;

const Option = ({ question, value, idx, isSurvey, handleInputChange }) =>
    <div className="form__radio">
        <label className="f-title form__label form__label--new-quiz">{ value.toUpperCase() }</label>
            <InputChanger {...{ question, value, idx, handleInputChange }}/>
            { !isSurvey &&
                <RadioButton {...{ question, value, idx, handleInputChange }}/>
            }
    </div>;


const SortableDragHandle = SortableHandle(() => <div className="fa fa-2x fa-arrows-v new-quiz--drag-handle"></div>);

const SortableQuestionItem = SortableElement(({ question, handleInputChange, handleDeleteQuestion, isSurvey, i, index }) => {
    return (
        <div key={ `question-${i}` } className="card">
            <SortableDragHandle />
            <label className="form__label--new-quiz f-subheader">{ i + 1 }.</label>
            <textarea className="form__input form__input--new-quiz-question" type="text" value={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='Question'></textarea>
            <div className="line"></div>

            { ['a', 'b', 'c', 'd'].map((value, idx) =>
                <Option { ...{ key: `option-${idx}`,
                    question, value, idx: i, isSurvey, handleInputChange
                }} />
            ) }
            <div>
                <textarea
                placeholder="More information for students when reviewing"
                className="form__input form__input--new-quiz-answer"
                onChange={(e) => handleInputChange('more_information', e.target.value, i)}
                value={ question.more_information || "" }
                />
            </div>
            <button className="button button__primary" onClick={ () => { handleDeleteQuestion(i); } }> Delete Question </button>

        </div>
    );
});

const SortableQuestionList = SortableContainer(({ questions, handleInputChange, handleDeleteQuestion, isSurvey }) => {

    let mappedQuestions = questions.map((question, i) => {
        return (
              <SortableQuestionItem
                key={i}
                question={question}
                i={i}
                index={i}
                handleInputChange={handleInputChange}
                handleDeleteQuestion={handleDeleteQuestion}
                isSurvey={isSurvey}
              />
        );
    });

    return (
            <div>
                { mappedQuestions }
            </div>

    );
});


class SortableComponent extends Component {

    constructor (props) {
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    onSortEnd (object) {
        this.props.handleQuestionOrder(this.props.questions, object.oldIndex, object.newIndex);
    }

    render () {
        return <SortableQuestionList
                  lockAxis={'y'}
                  useWindowAsScrollContainer={true}
                  useDragHandle={true}
                  questions={this.props.questions}
                  onSortEnd={this.onSortEnd}
                  handleInputChange={this.props.handleInputChange}
                  handleDeleteQuestion={this.props.handleDeleteQuestion}
                  isSurvey={this.props.isSurvey} />;
    }
}


SortableComponent.propTypes = {
    questions: PropTypes.array,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired,
    handleQuestionOrder: PropTypes.func
};

SortableQuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired
};

RadioButton.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

InputChanger.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

Option.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired
};

export default SortableComponent;
