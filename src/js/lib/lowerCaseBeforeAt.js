const lowerCaseBeforeAt = (email) => {
    return [
        email.split('@')[0].toLowerCase(),
        email.split('@')[1]
    ].join('@');
}

export default lowerCaseBeforeAt;

