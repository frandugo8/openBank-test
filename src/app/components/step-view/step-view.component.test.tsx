
import "@testing-library/react"
import ReactDOM from "react-dom"
import StepViewComponent from "./step-view.component";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

let initialState = {data: {view: 1}}
let store: any

describe("StepViewComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><StepViewComponent/></Provider>, div)
  })
})
