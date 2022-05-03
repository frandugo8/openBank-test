
import { RootState, useAppSelector } from '../../shared/redux/store/store';
import styles from './view.module.scss';
import View1Component from './view1/view1.component';
import View2Component from './view2/view2.component';
import View3Component from './view3/view3.component';


export default function ViewComponent() {
  const view = useAppSelector((state: RootState) => state.data.view)

  return (
    <div className={styles.view}>
      { view === 1? <View1Component/>
        : view === 2? <View2Component/>
        : <View3Component/>
      }
    </div>
  );
}
