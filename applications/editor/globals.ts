import { Patch } from "@pure-data/core"

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
