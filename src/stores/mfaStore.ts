import { makeAutoObservable } from 'mobx'
import { MFA } from '../types/mfa'
import epicgamesIcon from './assets/epicgames.png'
import redditIcon from './assets/reddit.png'
import binanceIcon from './assets/binance.png'
import googleIcon from './assets/google.png'
import facebookIcon from './assets/facebook.png'
import appleIcon from './assets/apple.png'

interface Provider {
  name: string
  image: string
}

const providers: Provider[] = [
  { name: 'Epic Games', image: epicgamesIcon },
  { name: 'Reddit', image: redditIcon },
  { name: 'Binance', image: binanceIcon },
  { name: 'Google', image: googleIcon },
  { name: 'Facebook', image: facebookIcon },
]

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}
export default class MFAStore {
  mfas: MFA[] = []

  constructor() {
    makeAutoObservable(this)
  }

  start() {
    this.randomMFAs(4)
    setInterval(() => this.randomMFAs(4), 60000)
  }

  randomMFAs(max: number) {
    let mfas: MFA[] = []
    for (let i = 0; i < max; i++) {
      const index = getRandomInt(providers.length)
      const { name, image } = providers[index]
      const code = String(getRandomInt(999999)).padStart(6, '0')
      const exp = new Date()
      exp.setSeconds(exp.getSeconds() + 60)
      const mfa = { provider: name, code, image, exp }
      mfas.push(mfa)
    }
    this.mfas = mfas
  }

  createMFA(name: string) {
    const code = String(getRandomInt(999999)).padStart(6, '0')
    const exp = new Date()
    exp.setSeconds(exp.getSeconds() + 60)
    const mfa = { provider: name, code, image: appleIcon, exp }
    this.mfas.push(mfa)
  }

  switchMFAs(p1: number, p2: number) {
    if (p1 === p2 || p1 < 0 || p2 < 0 || p1 >= this.mfas.length || p2 >= this.mfas.length) return
    const temp = this.mfas[p1]
    this.mfas[p1] = this.mfas[p2]
    this.mfas[p2] = temp
  }
}
