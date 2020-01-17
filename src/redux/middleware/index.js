export const fetchMiddleware = store => next => action => {
  if (action["FETCH_ACTION"]) {
    const actionInfo = action["FETCH_ACTION"];
    next({
      type: `${actionInfo.type}_REQUEST`
    });
    fetch(actionInfo.endpoint, {
      method: actionInfo.verb,
      headers: actionInfo.headers,
      body: actionInfo.payload
    })
      .then(response => response.json())
      .then(json => {
        return next({
          type: `${actionInfo.type}_RESPONSE`,
          payload: json
        });
      })
      .catch(error => {
        return next({
          type: `${actionInfo.type}_ERROR`,
          payload: error
        });
      });
  } else {
    return next(action);
  }
};
