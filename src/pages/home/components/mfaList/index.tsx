import { observer } from 'mobx-react'
import { MFA } from '../../../../types/mfa'
import MFAView from '../mfa'

type Props = {
  mfas: MFA[]
  isEditting: boolean
  switchMFAs: (p1: number, p2: number) => void
}

const MFAList = ({ mfas, isEditting, switchMFAs }: Props) => {
  return (
    <div>
      {mfas.map((mfa, idx) => (
        <MFAView
          mfa={mfa}
          key={idx}
          isEditting={isEditting}
          onMoveUp={() => switchMFAs(idx, idx - 1)}
          onMoveDown={() => switchMFAs(idx, idx + 1)}
        />
      ))}
    </div>
  )
}

export default observer(MFAList)
