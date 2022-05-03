

import styles from './view1.module.scss';
import group3svg from "../../../../assets/img/group-3.svg"
import groupsvg from "../../../../assets/img/group.svg"
import { useTranslation } from 'react-i18next';
import CheckboxComponent from '../../../shared/components/checkbox/checkbox.component';
import { NextButtonService } from '../../../shared/services/app/nextButton/nextButton.remote.service';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../shared/redux/store/store';
import { setNextView } from '../../../shared/redux/slices/data.slice';

export default function View1Component() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)

  useEffect(() => {
    const subscription = NextButtonService.onNextButtonSelection().subscribe(() => {
      if (isCheckboxSelected) dispatch(setNextView())
    })
  
    return () => {
      subscription.unsubscribe()
    }
  }, [isCheckboxSelected, dispatch])

  const toggleCheckbox = (): void => {
    setIsCheckboxSelected(!isCheckboxSelected)
  }

  return (
    <div className={styles.view}>
      <h1>{t('view1.title')}</h1>

      <div className={styles.images}>
        <div className={styles.content}>
          <img className={styles.content__image} src={groupsvg} alt="info"/>
          <p>{t('view1.info')}</p>
        </div>
  
        <div className={styles.content}>
          <img className={styles.content__image} src={group3svg} alt="security"/>
          <p>{t('view1.security')}</p>
        </div>
      </div>

      

      <h2 style={{marginTop: "3rem"}}>{t('view1.how_works.title')}</h2>
      <p>{t('view1.how_works.details')}</p>

      <h2 style={{marginTop: "3rem"}}>{t('view1.what_data.title')}</h2>
      <p>{t('view1.what_data.details')}</p>

      <div className={styles.view__dataProtection}>
        <CheckboxComponent
          style={{marginRight: "1rem"}}
          isSelected={isCheckboxSelected}
          toggleCheckbox={toggleCheckbox}/>
        {t('view1.checkbox')}
      </div>
    </div>
  );
}
