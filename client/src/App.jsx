import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path='/' element={<Lobby />} />
        </Routes>
      </div>
    </>
  )
}
import Lobby from './screens/Lobby'


export default App
