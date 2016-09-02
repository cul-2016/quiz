/**
* Processes text to remove underscores and add capitalisation
* @param {string} text - the text to be normalised
*/

const normaliseText = (text) => {

    return `${text.charAt(0).toUpperCase()}${text.substr(1).replace('_', ' ')}`;
};

export default normaliseText;
