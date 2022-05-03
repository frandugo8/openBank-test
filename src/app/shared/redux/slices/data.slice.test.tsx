
import reducer, { resetView, setLastViewWithErrors, setNextView } from './data.slice'

let previousState

describe("DataSlice", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({view: 1})
  })

  it('should set next view', () => {
    previousState = {view: 1}
  
    expect(reducer(previousState, setNextView())).toEqual({view: 2})
  })

  it('should set last view with error', () => {
    previousState = {view: 2}
  
    expect(reducer(previousState, setLastViewWithErrors())).toEqual({view: 3, hasError: true})
  })

  it('should reset view', () => {
    previousState = {view: 2}
  
    expect(reducer(previousState, resetView())).toEqual({view: 1})
  })
})



