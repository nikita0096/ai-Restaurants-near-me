import {create} from "zustand";

 type State = {
  inputValue: string;
}

 type Action = {
  inputChangeVal: (inputValue: State['inputValue']) => void
}

export type Store = State & Action;


export const myStore = create<Store>((set) => ({
  inputValue: '',
  inputChangeVal: (val: string) => set(() => ({inputValue: val})),
}));












