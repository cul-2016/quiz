export default state => {
    const queue    = [];
    const getState = () => state;
    const dispatch = action => typeof action === 'function'
    ? action(dispatch, getState)
    : queue.push(action);

    return { queue, dispatch };
};
