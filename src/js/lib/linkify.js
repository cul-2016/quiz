import React from 'react';
import urlRegex from 'url-regex';

const re = urlRegex({ strict: true });

export default (str) => {
    const matches = str.match(re);
    const parts = str.split(re);

    if (matches) {
        return matches.reduce((acc, match) => {
            const a = acc
                .concat(parts[0])
                .concat(<a href={match} target="_blank">{match}</a>);

            parts.splice(0, 1);

            return a;
        }, []);
    } else {
        return str;
    }
};
