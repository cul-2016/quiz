import React, { PropTypes } from 'react';


class ValidationIcon extends React.Component {


    render () {

        let node = this.props.node;
        let moduleIDExists = this.props.moduleIDExists;
        let icon;

        try {
            if (node.value.length >= 4) {
                icon = moduleIDExists ? "fa fa-times" : "fa fa-check";
            } else {
                icon = "";
            }
        } catch (e) {
            icon = "";
        }

        return (
            <div>
                <i className={ icon } />
            </div>
        );
    }
}

ValidationIcon.propTypes = {
    node: PropTypes.object,
    moduleIDExists: PropTypes.bool
};

export default ValidationIcon;
