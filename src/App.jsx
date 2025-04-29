import { useState } from 'react'
import MenuPage from './menu/MenuPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MenuPage />
    </>
  )
}

export default App
