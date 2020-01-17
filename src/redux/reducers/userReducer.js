const initialState = {
  error: null,
  punchInData: [],
  punchOutData: [],
  newPin: 0,
  punchInID: 0,
  previousRecordsData: []
};

const userReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "PUNCH_IN_RESPONSE":
      return { ...state, punchInData: payload };
    case "PUNCH_IN_ERROR":
      return { ...state, error: payload };

    case "PUNCH_OUT_RESPONSE":
      return { ...state, punchOutData: payload };
    case "PUNCH_OUT_ERROR":
      return { ...state, error: payload };

    case "CHANGE_PIN_RESPONSE":
      return { ...state, newPin: payload };
    case "CHANGE_PIN_ERROR":
      return { ...state, error: payload };

    case "PREVIOUS_RECORDS_RESPONSE":
      return { ...state, previousRecordsData: payload };
    case "PREVIOUS_RECORDS_ERROR":
      return { ...state, error: payload };

    case "PUNCH_IN_ID":
      return { ...state, punchInID: payload };

    default:
      return state;
  }
};

export default userReducer;
