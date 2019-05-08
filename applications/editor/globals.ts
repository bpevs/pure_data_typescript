interface State {
  currentPatch: any[],
  mode: "edit" | "interactive"
}

const state: State = {
  currentPatch: [],
  mode: "interactive",
}

export {
  state,
}
