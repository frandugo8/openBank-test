

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputComponent } from '../../../shared/components/input/input.component';
import { setLastViewWithErrors, setNextView } from '../../../shared/redux/slices/data.slice';
import { useAppDispatch } from '../../../shared/redux/store/store';
import { NextButtonService } from '../../../shared/services/app/nextButton/nextButton.remote.service';
import { UserRemoteService } from '../../../shared/services/remote/users/user.remote.service';
import styles from './view2.module.scss';

export default function View2Component() {
  const passwordRef = useRef<any>(null)
  const rePasswordRef = useRef<any>(null)
  const passwordTrackRef = useRef<any>(null)
  const [submitError, setSubmitError] = useState<"password" | "rePassword" | undefined>(undefined)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    const subscription = NextButtonService.onNextButtonSelection().subscribe(() => {
      const password: string = passwordRef.current.getValue()
      const rePassWord: string = rePasswordRef.current.getValue()
      const passwordTrack: string = passwordTrackRef.current.getValue()
  
      if (passwordValidation()) {
        UserRemoteService.changeMasterPass(password, rePassWord, passwordTrack).then(() => {
          dispatch(setNextView())
        }).catch(() => {
          dispatch(setLastViewWithErrors())
        })
      }
    })
  
    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])

  const handleEnter = (): void => {
    NextButtonService.setNextButtonSelection()
  }

  const passwordValidation = (): boolean => {
    const isPassWordOk = /^(?=.*[1-9])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/.test(passwordRef.current.getValue())
    const isRePasswordOk = passwordRef.current.getValue() === rePasswordRef.current.getValue()

    if (!isPassWordOk) setSubmitError("password")
    else if (!isRePasswordOk) setSubmitError("rePassword")
    return isPassWordOk && isRePasswordOk
  }

  return (
    <div className={styles.view}>
      <h1>{t('view2.title')}</h1>
      <p>{t('view2.details')}</p>

      {submitError
      ? <div className={styles.error}>
        {submitError === "password"
        ? t('view2.error.password')
        : t('view2.error.rePassword')}
        </div>
      : ""}

      <form className={styles.inputs}>
        <InputComponent
          ref={passwordRef}
          id="password"
          style={{marginTop: "2rem", marginRight: "2rem"}}
          label={t('view2.input.password')}
          type={"password"}
          handleEnter={handleEnter}/>

        <InputComponent
          ref={rePasswordRef}
          id="rePassword"
          style={{marginTop: "2rem"}}
          label={t('view2.input.rePassword')}
          type={"password"}
          handleEnter={handleEnter}/>
      </form>

      <p>{t('view2.trackInfo')}</p>

      <InputComponent
        ref={passwordTrackRef}
        id="passwordTrack"
        label={t('view2.input.passwordTrack')}
        type={"text"}
        handleEnter={handleEnter}/>
    </div>
  );
}