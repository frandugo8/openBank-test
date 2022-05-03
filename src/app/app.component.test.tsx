
import "@testing-library/react"
import AppComponent from "./app.component"
import ReactDOM from "react-dom"
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

let initialState = {data: {view: 1}}
let store: any

describe("AppComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div')
    ReactDOM.render(<Provider store={store}><I18nextProvider i18n={i18n}><AppComponent/></I18nextProvider></Provider>, div)
  })
})

