import { useState, useEffect } from 'react'
import MFAStore from './stores/mfaStore'
import Home from './pages/home'
import Create from './pages/create'
import './App.css'

enum Screen {
  Home,
  Create,
}

const store = new MFAStore()

const App = () => {
  const [screen, setScreen] = useState<Screen>(Screen.Home)

  useEffect(() => {
    store.start()
  }, [])

  const getContent = () => {
    switch (screen) {
      case Screen.Home:
        return <Home store={store} onCreate={() => setScreen(Screen.Create)} />

      case Screen.Create:
        return <Create store={store} onBack={() => setScreen(Screen.Home)} />
    }
  }

  return <div className="app">{getContent()}</div>
}

export default App
