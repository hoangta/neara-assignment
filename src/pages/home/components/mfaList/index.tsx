import { observer } from 'mobx-react'
import { MFA } from '../../../../types/mfa'
import MFAView from '../mfa'

type Props = {
  mfas: MFA[]
  isEditing: boolean
  switchMFAs: (p1: number, p2: number) => void
}

const MFAList = ({ mfas, isEditing, switchMFAs }: Props) => {
  return (
    <div>
      {mfas.map((mfa, idx) => (
        <MFAView
          index={idx}
          mfa={mfa}
          key={idx}
          isEditing={isEditing}
          onMoveUp={() => switchMFAs(idx, idx - 1)}
          onMoveDown={() => switchMFAs(idx, idx + 1)}
        />
      ))}
    </div>
  )
}

export default observer(MFAList)
