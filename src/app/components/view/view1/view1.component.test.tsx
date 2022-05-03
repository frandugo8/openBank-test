
import "@testing-library/react"
import ReactDOM from "react-dom"
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import View1Component from "./view1.component";
import i18n from "../../../../i18n";

let initialState = {data: {view: 1}}
let store: any

describe("View1Component", () => {
  const mockStore = configureStore()


  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><I18nextProvider i18n={i18n}><View1Component/></I18nextProvider></Provider>, div);
  })

  it('must toggle checkbox after clicking it', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View1Component/></I18nextProvider></Provider>)

    const checkbox = screen.getByLabelText("checkbox")
    const checkboxcheck = screen.getByAltText("checkbox-check")

    expect(checkboxcheck).toHaveStyle("opacity: 0")
    fireEvent.click(checkbox)
    expect(checkboxcheck).toHaveStyle("opacity: 1")
  })
})