
import "@testing-library/react"
import ReactDOM from "react-dom"
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import i18n from "../../../../i18n";
import View3Component from "./view3.component";

let initialState = {data: {view: 1, hasError: false}}
let store: any

describe("View1Component", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><I18nextProvider i18n={i18n}><View3Component/></I18nextProvider></Provider>, div);
  })

  it('must show success info when hasError is truly', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View3Component/></I18nextProvider></Provider>)
    expect(screen.getByText("¡Tu Password Manager ya está creado!")).toBeInTheDocument()
    expect(screen.getByText("Recibirá un mensaje de correo con la confirmación")).toBeInTheDocument()
    expect(screen.queryByText("Ha habido un error")).not.toBeInTheDocument()
  })

  it('must show error info when hasError is truly', () => {
    store = mockStore({data: {view: 1, hasError: true}})
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View3Component/></I18nextProvider></Provider>)
    expect(screen.getByText("Ha habido un error")).toBeInTheDocument()
    expect(screen.getByText(/No hemos podido modificar tu Contraseña Maestra/i)).toBeInTheDocument()
    expect(screen.queryByText("¡Tu Password Manager ya está creado!")).not.toBeInTheDocument()
  })
})
