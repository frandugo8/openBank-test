

import { useTranslation } from 'react-i18next';
import { resetView } from '../../shared/redux/slices/data.slice';
import { useAppSelector, RootState, useAppDispatch } from '../../shared/redux/store/store';
import { NextButtonService } from '../../shared/services/app/nextButton/nextButton.remote.service';
import styles from './footer.module.scss';

export default function FooterComponent() {
  const view = useAppSelector((state: RootState) => state.data.view)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return (
    <footer style={{justifyContent: view !== 3? "space-between" : "flex-end"}} className={styles.footer}>
      {view !== 3? 
        <>
          <button
            type="button"
            aria-label="cancel-button"
            className={styles.cancel}
            onClick={() => dispatch(resetView())}>
              {t("buttons.cancel")}
            </button>
          <button
            type="button"
            aria-label="next-button"
            className={styles.next}
            onClick={() => NextButtonService.setNextButtonSelection()}>
              {t("buttons.next")}
            </button>
        </>
        : <button type="button" className={styles.finish}>{t("buttons.finish")}</button>
      }
    </footer>
  );
}
