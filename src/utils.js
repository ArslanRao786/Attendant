import dateFormat from "dateformat";
import { differenceInHours } from "date-fns";

export const fetchAction = action => {
  const fetchActionTemplate = {
    type: "",
    endpoint: null,
    verb: "",
    payload: null,
    headers: {}
  };
  return {
    FETCH_ACTION: {
      ...fetchActionTemplate,
      ...action
    }
  };
};

export const getDesiredData = data => {
  const desiredData = data.map(data => {
    const { punchin, punchout } = data;
    const date = dateFormat(punchin, "mmm dS yyyy");
    const punchInTime = dateFormat(punchin, "h:MM:ss TT");
    const punchOutTime = dateFormat(punchout, "h:MM:ss TT");
    return { date, punchInTime, punchOutTime };
  });
  return desiredData;
};

export const getOverAllStats = data => {
  if (data.length != 0) {
    const startTime = data[0].punchin;
    const lastExitTime = data[data.length - 1].punchout;
    const totalWorkingHours = differenceInHours(
      new Date(lastExitTime),
      new Date(startTime)
    );
    const averageWorkingHours = totalWorkingHours / data.length;
    return {
      totalWorkingHours: `${totalWorkingHours} Hours`,
      averageWorkingHours: `${Math.floor(averageWorkingHours)} Hours`
    };
  } else {
    return { totalWorkingHours: "Hours", averageWorkingHours: "Hours" };
  }
};
