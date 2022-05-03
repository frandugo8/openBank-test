
import "@testing-library/react"
import ReactDOM from "react-dom"
import FooterComponent from "./footer.component"
import { I18nextProvider } from 'react-i18next'
import i18n from "../../../i18n";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextButtonService } from "../../shared/services/app/nextButton/nextButton.remote.service";

let initialState = {data: {view: 1}}
let store: any
let spies: any

describe("FooterComponent", () => {
  const mockStore = configureStore()

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><I18nextProvider i18n={i18n}><FooterComponent/></I18nextProvider></Provider>, div);
  })

  it('must show cancel and next button when view is 1 or 2', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><FooterComponent/></I18nextProvider></Provider>)

    const cancelButton = screen.getByText("Cancelar")
    const successButton = screen.getByText("Siguiente")

    expect(cancelButton).toBeInTheDocument()
    expect(successButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    fireEvent.click(successButton)
    expect(spies.nextButtonService.setNextButtonSelection).toHaveBeenCalled()
  })

  it('must show finish button when view is 3', () => {
    store = mockStore({data: {view: 3}})
    render(<Provider store={store}><I18nextProvider i18n={i18n}><FooterComponent/></I18nextProvider></Provider>);
    expect(screen.getByText("Acceder")).toBeInTheDocument()
  })
})

function loadSpies() {
  spies = {
    nextButtonService: {
      setNextButtonSelection: jest.spyOn(NextButtonService, "setNextButtonSelection").mockImplementation(() => Promise.resolve())}
  }
}
