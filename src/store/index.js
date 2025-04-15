import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { countryReducer } from "./reducers/countryReducer";
import { stateReducer } from "./reducers/stateReducer";
import { officeReducer } from "./reducers/officeReducer";
import { departmentReducer } from "./reducers/departmentReducer";
import { projectReducer } from "./reducers/projectReducer";
import { technologyReducer } from "./reducers/technologyReducer";
import { employeeReducer } from "./reducers/employeeReducer";
import { clientReducer } from "./reducers/clientReducers";
import { roleReducer } from "./reducers/roleReducers.js";
import { assetReducer } from "./reducers/assetReducers";
import paginationReducer from "./reducers/paginationReducer.js";
import { travelReducer } from "./reducers/travelReducers.js";
import { holidayReducer } from "./reducers/holidayReducers.js";
import { ticketReducer } from "./reducers/ticketReducers.js";
import { processReducer } from "./reducers/processReducers.js";



// import other reducers here
const rootReducer = {
  country: countryReducer,
  state: stateReducer,
  office: officeReducer,
  department: departmentReducer,
  project: projectReducer,
  technology: technologyReducer,
  employee: employeeReducer,
  client: clientReducer,
  role: roleReducer,
  asset: assetReducer,
  pagination: paginationReducer,
  travel: travelReducer,
  claim: clientReducer,
  holiday: holidayReducer,
  ticket: ticketReducer,
  process: processReducer,
    // add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;