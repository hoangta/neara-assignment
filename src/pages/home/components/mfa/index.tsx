import { observer } from 'mobx-react'
import { MFA } from '../../../../types/mfa'
import ExpirationIndicator from './ExpirationIndicator'
import styles from './index.module.css'

type MoveBarProps = {
  onMoveUp: () => void
  onMoveDown: () => void
  index?: number
}

const MoveBar = ({ index, onMoveUp, onMoveDown }: MoveBarProps) => {
  return (
    <div className={styles.moveButtonContainer}>
      <button data-testid={`moveup_button_${index}`} className={styles.moveButton} onClick={onMoveUp}>
        ⬆
      </button>
      <button data-testid={`movedown_button_${index}`} className={styles.moveButton} onClick={onMoveDown}>
        ⬇
      </button>
    </div>
  )
}

type Props = {
  mfa: MFA
  isEditing: boolean
} & MoveBarProps

const MFAView = ({ index = 0, mfa, isEditing, onMoveUp, onMoveDown }: Props) => {
  return (
    <div className={styles.container}>
      {isEditing && <MoveBar index={index} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />}
      <img className={styles.image} alt={mfa.provider} src={mfa.image} />
      <div className={styles.detail}>
        <div className={styles.provider}>{mfa.provider}</div>
        <div className={styles.code}>{mfa.code.substring(0, 3) + ' ' + mfa.code.substring(3, 6)}</div>
      </div>
      <ExpirationIndicator exp={mfa.exp} />
    </div>
  )
}

export default observer(MFAView)
