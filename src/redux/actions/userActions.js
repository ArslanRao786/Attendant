import { fetchAction } from "../../utils";

export const punchIn = id => {
  return fetchAction({
    type: "PUNCH_IN",
    endpoint: `http://localhost:4000/add-user-punch-in-time/${id}`,
    verb: "POST"
  });
};

export const punchOut = id => {
  return fetchAction({
    type: "PUNCH_OUT",
    endpoint: `http://localhost:4000/add-user-punch-out-time/${id}`,
    verb: "PUT"
  });
};

export const changeStatus = data => {
  const { status, id } = data;
  return fetchAction({
    type: "STATUS",
    endpoint: `http://localhost:4000/change-status/${id}/${status}`,
    verb: "PUT"
  });
};

export const changePin = (id, newpin) => {
  return fetchAction({
    type: "CHANGE_PIN",
    endpoint: `http://localhost:4000/update-pin/${id}/${newpin}`,
    verb: "PUT"
  });
};

export const previousRecords = id => {
  return fetchAction({
    type: "PREVIOUS_RECORDS",
    endpoint: `http://localhost:4000/previous-records/${id}`,
    verb: "GET"
  });
};
