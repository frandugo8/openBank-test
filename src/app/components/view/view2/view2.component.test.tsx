
import "@testing-library/react"
import ReactDOM from "react-dom"
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import i18n from "../../../../i18n";
import View2Component from "./view2.component";
import { UserRemoteService } from "../../../shared/services/remote/users/user.remote.service";

let initialState = {data: {view: 1}}
let store: any
let spies: any

describe("View2Component", () => {
  const mockStore = configureStore()

  beforeEach(() => {
    loadSpies()
  })

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><I18nextProvider i18n={i18n}><View2Component/></I18nextProvider></Provider>, div);
  })

  it('must fill all inputs and then submits it checking password: Bad format', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View2Component/></I18nextProvider></Provider>)
    const passwordInput = screen.getByLabelText("password")
    const rePasswordInput = screen.getByLabelText("rePassword")
    const passwordTrackInput = screen.getByLabelText("passwordTrack")

    fireEvent.input(passwordInput, {target: { value: "1" }})
    fireEvent.input(rePasswordInput, {target: { value: "1" }})
    fireEvent.input(passwordTrackInput, {target: { value: "Test" }})


    fireEvent.keyDown(passwordInput, {key: "Enter"})
    expect(spies.userRemoteService.changeMasterPass).not.toHaveBeenCalled()
  })

  it('must fill all inputs and then submits it checking password and repassword: Not matching', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View2Component/></I18nextProvider></Provider>)
    const passwordInput = screen.getByLabelText("password")
    const rePasswordInput = screen.getByLabelText("rePassword")
    const passwordTrackInput = screen.getByLabelText("passwordTrack")

    fireEvent.input(passwordInput, {target: { value: "12345678Az" }})
    fireEvent.input(rePasswordInput, {target: { value: "12345678Ax" }})
    fireEvent.input(passwordTrackInput, {target: { value: "Test" }})


    fireEvent.keyDown(passwordInput, {key: "Enter"})
    expect(spies.userRemoteService.changeMasterPass).not.toHaveBeenCalled()
  })

  it('must fill all inputs and then submits it with ok status', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><I18nextProvider i18n={i18n}><View2Component/></I18nextProvider></Provider>)
    const passwordInput = screen.getByLabelText("password")
    const rePasswordInput = screen.getByLabelText("rePassword")
    const passwordTrackInput = screen.getByLabelText("passwordTrack")

    fireEvent.input(passwordInput, {target: { value: "12345678Az" }})
    fireEvent.input(rePasswordInput, {target: { value: "12345678Az" }})
    fireEvent.input(passwordTrackInput, {target: { value: "Test" }})


    fireEvent.keyDown(passwordInput, {key: "Enter"})
    expect(spies.userRemoteService.changeMasterPass).toHaveBeenCalled()
  })
})

function loadSpies() {
  spies = {
    userRemoteService: {
      changeMasterPass: jest.spyOn(UserRemoteService, "changeMasterPass").mockImplementation(() => Promise.resolve())}
  }
}