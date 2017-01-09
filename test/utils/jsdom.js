import jsdom from 'jsdom';

const options = {
    cookie: "cul_id=1;cul_is_cookie_accepted=true; path=/",
    url: 'http://localhost' // needed for React TestUtils renderIntoDocument
};
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', options);
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach( (key) => {

    if (!(key in global)) {

        global[key] = window[key];
    }
});
