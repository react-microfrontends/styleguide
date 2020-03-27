// in a large example I'd suggest considering a state machine here
// I'm using rxjs to give me reactivity but there are a host of
// better ways to accomplish this in an enterprise application
import { ReplaySubject } from "rxjs";
const textPossibilities = {
  SHORT: "Loading ...",
  MEDIUM: "Still loading...",
  LONG: "Hmmm... Still loading...",
  EXTRA_LONG: "This is taking a long time... still loading...",
  ABORT: "Loading took too long... aborted"
};
export const initialState = {
  currentText: textPossibilities["SHORT"],
  classNames: "text-secondary"
};

const state = { ...initialState };
export const State$ = new ReplaySubject(1);

let medTimeout;
let longTimeout;
let exLongTimeout;
let abortTimeout;

export function startLoading() {
  State$.next(state);
  medTimeout = setTimeout(() => {
    state.currentText = textPossibilities["MEDIUM"];
    State$.next(state);
  }, 1000);
  longTimeout = setTimeout(() => {
    state.currentText = textPossibilities["LONG"];
    state.classNames = "text-info";
    State$.next(state);
  }, 4000);
  exLongTimeout = setTimeout(() => {
    state.currentText = textPossibilities["EXTRA_LONG"];
    state.classNames = "text-warning";
    State$.next(state);
  }, 8000);
  abortTimeout = setTimeout(() => {
    state.currentText = textPossibilities["ABORT"];
    state.classNames = "text-danger";
    State$.next(state);
  }, 15000);
}

export function stopLoading() {
  state.currentText = initialState.currentText;
  state.classNames = initialState.classNames;
  State$.next(state);
  window.clearTimeout(medTimeout);
  window.clearTimeout(longTimeout);
  window.clearTimeout(exLongTimeout);
  window.clearTimeout(abortTimeout);
}
