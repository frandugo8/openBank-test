
import "@testing-library/react"
import { render, screen, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom"
import CheckboxComponent from "./checkbox.component";

describe("CheckboxComponent", () => {
  const toggleCheckbox = jest.fn()

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CheckboxComponent isSelected={false} toggleCheckbox={toggleCheckbox}/>, div);
  })

  it('must toggleCheckbox when checkbox is clicked', () => {
    render(<CheckboxComponent isSelected={false} toggleCheckbox={toggleCheckbox}/>)
    const button = screen.getByLabelText("checkbox")
    fireEvent.click(button)
    expect(toggleCheckbox).toHaveBeenCalled()
  })
})

