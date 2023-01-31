import { observer } from 'mobx-react'
import { MFA } from '../../../../types/mfa'
import ExpirationIndicator from './ExpirationIndicator'
import styles from './index.module.css'

type Props = {
  mfa: MFA
  isEditting: boolean
} & MoveBarProps

const MFAView = ({ mfa, isEditting, onMoveUp, onMoveDown }: Props) => {
  return (
    <div className={styles.container}>
      {isEditting && <MoveBar onMoveUp={onMoveUp} onMoveDown={onMoveDown} />}
      <img className={styles.image} alt={mfa.provider} src={mfa.image} />
      <div className={styles.detail}>
        <div className={styles.provider}>{mfa.provider}</div>
        <div className={styles.code}>{mfa.code.substring(0, 3) + ' ' + mfa.code.substring(3, 6)}</div>
      </div>
      <ExpirationIndicator exp={mfa.exp} />
    </div>
  )
}

type MoveBarProps = {
  onMoveUp: () => void
  onMoveDown: () => void
}
const MoveBar = ({ onMoveUp, onMoveDown }: MoveBarProps) => {
  return (
    <div className={styles.moveButtonContainer}>
      <button className={styles.moveButton} onClick={onMoveUp}>
        ⬆
      </button>
      <button className={styles.moveButton} onClick={onMoveDown}>
        ⬇
      </button>
    </div>
  )
}

export default observer(MFAView)
