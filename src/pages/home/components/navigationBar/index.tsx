import styles from './index.module.css'

type Props = {
  onEdit: () => void
  onCreate: () => void
}

const NavigationBar = ({ onEdit, onCreate }: Props) => {
  return (
    <div className={styles.container}>
      <button data-testid="edit_button" className={styles.button} onClick={onEdit}>
        Edit
      </button>
      <div className={styles.title}>Tokens</div>
      <button data-testid="add_button" className={styles.button} style={{ fontSize: 25 }} onClick={onCreate}>
        ＋
      </button>
    </div>
  )
}

export default NavigationBar
