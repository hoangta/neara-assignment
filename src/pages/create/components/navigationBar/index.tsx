import styles from './index.module.css'

type Props = {
  onBack: () => void
  onCreate: () => void
  canCreate: boolean
}

const NavigationBar = ({ onBack, onCreate, canCreate }: Props) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onBack}>
        Back
      </button>
      <div className={styles.title}>New token</div>
      <button className={styles.button} onClick={onCreate} disabled={!canCreate}>
        Add
      </button>
    </div>
  )
}

export default NavigationBar
