

import styles from './view3.module.scss';
import successIcon from '../../../../assets/shared/success.svg'
import errorIcon from '../../../../assets/shared/error.svg'
import { RootState, useAppSelector } from '../../../shared/redux/store/store';
import { useTranslation } from 'react-i18next';


export default function View3Component() {
  const hasError = useAppSelector((state: RootState) => state.data.hasError)
  const { t } = useTranslation()

  return (
    <div className={styles.view}>

      <div className={styles.header}>
        <img src={!hasError? successIcon : errorIcon} className={styles.header__icon} alt="success"/>

        <h2 className={styles.header__title}>
          {!hasError
            ? t('view3.success.title')
            : t('view3.error.title')
          }
        </h2>
      </div>

      <p className={styles.view__paragraph}>
        {!hasError
          ? t('view3.success.info')
          : t('view3.error.info')
        }
      </p>
    </div>
  );
}