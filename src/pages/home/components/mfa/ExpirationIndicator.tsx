import { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react'
import styles from './ExpirationInficator.module.css'

type Props = {
  exp: Date
}

const indicatorRadius = 14
const strokeDasharray = 2 * indicatorRadius * Math.PI

const ExpirationIndicator = ({ exp }: Props) => {
  const circleRef = useRef<SVGCircleElement>(null)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0)

  useEffect(() => {
    const remainingSeconds = (exp.getTime() - new Date().getTime()) / 1000
    circleRef.current?.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: strokeDasharray }], {
      duration: remainingSeconds * 1000,
    })
    setRemainingSeconds(remainingSeconds)
    const timer = setInterval(() => setRemainingSeconds((r) => Math.max(r - 1, 0)), 1000)
    return () => clearInterval(timer)
  }, [exp])

  return (
    <div className={styles.indicatorContainer}>
      <svg className={styles.indicatorItem}>
        <circle
          ref={circleRef}
          className={styles.circle}
          cx="20"
          cy="20"
          r={indicatorRadius}
          fill="none"
          stroke="gray"
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDasharray}
        />
      </svg>
      <div className={styles.countdownLabel}>{remainingSeconds.toFixed()}</div>
    </div>
  )
}

export default observer(ExpirationIndicator)
