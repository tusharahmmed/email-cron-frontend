import {baseApi} from "./features/api/baseApi";

export const reducer = {
  // Add the generated reducer as a specific top-level slice
  [baseApi.reducerPath]: baseApi.reducer,
};
