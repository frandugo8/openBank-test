

import styles from './app.module.scss';
import FooterComponent from './components/footer/footer.component';
import StepViewComponent from './components/step-view/step-view.component';
import ViewComponent from './components/view/view.component';

export default function AppComponent() {
  return (
    <div className={styles.app}>
      <StepViewComponent />
      <ViewComponent/>
      <FooterComponent/>
    </div>
  );
}
