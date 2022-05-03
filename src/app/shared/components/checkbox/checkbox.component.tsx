

import styles from './checkbox.module.scss';
import checkIcon from '../../../../assets/shared/check.svg'

interface CheckboxProps {
  style?: React.CSSProperties
  isSelected: boolean
  toggleCheckbox(): void
}

export default function CheckboxComponent({style, isSelected, toggleCheckbox}: CheckboxProps) {
  return (
    <button
      style={style}
      type="button"
      aria-label="checkbox"
      className={styles.checkbox}
      onClick={toggleCheckbox}>
      <img style={{opacity: isSelected? 1 : 0}} src={checkIcon} alt="checkbox-check" className={styles.checkbox__icon}/>
    </button>
  );
}