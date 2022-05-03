

import styles from './input.module.scss';
import passwordNotVisibleIcon from '../../../../assets/shared/password-not-visible.svg'
import passwordVisibleIcon from '../../../../assets/shared/password-visible.svg'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

interface CheckboxProps {
  type: "text" | "password"
  id: string
  label: string
  style?: React.CSSProperties
  handleEnter(): void
}

export const InputComponent = forwardRef(({type, id, label, style, handleEnter}: CheckboxProps, ref: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    getValue() {
      return inputRef.current?.value
    }
  }))

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleEnter()
    }
  }

  return (
    <div style={style} className={styles.wrapper}>
      <label className={styles.wrapper__label}>{label}</label>
      
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef} 
          onKeyDown={handleKeyDown}
          className={styles.input}
          type={isVisible? "text" : type}
          maxLength={255}
          autoComplete={"none"}
          aria-label={id}/>

        {type === "password"?
          <button type="button" className={styles.showButton} onClick={() => setIsVisible(!isVisible)} aria-label="password-button">
            <img style={{opacity: isVisible? 0 : 1}} className={styles.showButton__icon} src={passwordNotVisibleIcon}  alt="show-password"/>
            <img style={{opacity: isVisible? 1 : 0}} className={styles.showButton__icon} src={passwordVisibleIcon} alt="hide-password"/>
          </button>
        : ""}
      </div>

    </div>
  )
})