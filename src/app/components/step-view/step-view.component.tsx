

import styles from './step-view.module.scss';
import checkIcon from '../../../assets/shared/check.svg'
import { RootState, useAppSelector } from '../../shared/redux/store/store';

export default function StepViewComponent() {
  const view = useAppSelector((state: RootState) => state.data.view)
  const STEPS: Array<number> = [1, 2, 3]

  return (
    <div className={styles.wrapper}>
      <div className={styles.steps}>
        <div className={styles.line}>
          <div style={{width: `${((view - 1)/(STEPS.length - 1))*100}%`}} className={styles.line__highlighted}/>
        </div>

        {STEPS.map((step: number, index: number) => 
          <div key={index} className={view === step && view !== 3
            ? `${styles.displayer} ${styles.displayer___active}`
            : view > step || view === 3? `${styles.displayer} ${styles.displayer___completed}`
            : styles.displayer}>
            <div style={{opacity: view > step || view === 3? 0 : 1}} className={styles.displayer__number}>{step}</div>
            <img style={{opacity: view > step || view === 3? 1 : 0}} src={checkIcon} className={styles.displayer__check} alt="img"/>
          </div>
        )}
      </div>
    </div>
  );
}
