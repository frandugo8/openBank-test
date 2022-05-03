

import "@testing-library/react"
import { render, screen, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom"
import { InputComponent } from "./input.component";

describe("InputComponent", () => {
  const handleEnter = jest.fn()

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InputComponent id="password" type={"text"} label={"password"} handleEnter={handleEnter}/>, div);
  })

  it('must show password when button is clicked', () => {
    render(<InputComponent id="password" type={"password"} label={"password"} handleEnter={handleEnter}/>)
    const button = screen.getByLabelText("password-button")
    const passwordNotVisible = screen.getByAltText("show-password")
    const passwordVisible = screen.getByAltText("hide-password")

    expect(passwordNotVisible).toHaveStyle("opacity: 1")
    expect(passwordVisible).toHaveStyle("opacity: 0")

    fireEvent.click(button)

    expect(passwordNotVisible).toHaveStyle("opacity: 0")
    expect(passwordVisible).toHaveStyle("opacity: 1")
  })

  it('must trigger handleEnter when Enter key is clicked', () => {
    render(<InputComponent id="password" type={"password"} label={"password"} handleEnter={handleEnter}/>)
    const input = screen.getByLabelText("password")
    fireEvent.keyDown(input, {key: "Enter"})
    expect(handleEnter).toHaveBeenCalled()
  })
})

