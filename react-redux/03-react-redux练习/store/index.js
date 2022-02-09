import { createStore } from "redux";
import reducer from "./reducer";

// @ts-ignore
const store = createStore(reducer)
export default store