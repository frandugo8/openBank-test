
import { Subject } from 'rxjs';

const subject: any = new Subject()

export const NextButtonService = {
  setNextButtonSelection: () => subject.next(),
  onNextButtonSelection: () => subject.asObservable()
}