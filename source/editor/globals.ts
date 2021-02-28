import Patch from "../models/Patch.ts"

interface State {
  currentPatch: Patch | null,
  mode: "edit" | "interactive"
}

const state: State = {
  currentPatch: null,
  mode: "interactive",
}

export {
  state,
}
