import { useState } from 'react'
import MFAStore from '../../stores/mfaStore'
import NavigationBar from './components/navigationBar'
import styles from './index.module.css'

type Props = {
  store: MFAStore
  onBack: () => void
}

const Create = ({ store, onBack }: Props) => {
  const [name, setName] = useState('')

  const create = () => {
    store.createMFA(name)
    onBack()
  }

  return (
    <div>
      <NavigationBar onBack={onBack} onCreate={create} canCreate={name.length > 0} />
      <input
        data-testid="name_text_input"
        type="text"
        className={styles.inputName}
        autoFocus
        value={name}
        maxLength={25}
        onChange={(e) => setName(e.currentTarget.value)}
      />
    </div>
  )
}

export default Create
