import Patch from "../models/Patch.ts";

export interface State {
  currentPatch: Patch | null;
  mode: "edit" | "interactive";
}

export const initialAppState: State = Object.freeze({
  currentPatch: null,
  mode: "interactive",
});

export const appState: State = { ...initialAppState };
