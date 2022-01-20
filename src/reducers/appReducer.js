import { APPSTATE_SET_RUNNING, APPSTATE_FAIL } from "../constants/appConstants";

export const appStateReducer = (state = { isRunning: false }, action) => {
  switch (action.type) {
    case APPSTATE_SET_RUNNING:
      return { isRunning: true };
    case APPSTATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

// const initialState = {
//     isRunning: false,
// }

// export const setRunning = createAction('[APPSTATE] Set Running', (running: boolean) => ({
//     payload: {
//         running,
//     },
// }))

// export const selectIsRunning = (state: RootState): boolean => state.appState.isRunning

// const appStateReducer = createReducer(initialState, builder => {
//     builder.addCase(setRunning, (state, action) => {
//         const { running } = action.payload
//         return {
//             isRunning: running,
//         }
//     })
// })

// export default appStateReducer
