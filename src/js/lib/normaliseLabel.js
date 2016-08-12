
const normaliseLabel = (text) => {

    return `${text.charAt(0).toUpperCase()}${text.substr(1).replace('_', ' ')}`;
};

export default normaliseLabel;
