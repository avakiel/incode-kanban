import './App.css'
import { Header } from './components/header/Header'
import { TaskColumn } from './components/taskColumn/TaskColumn'
import { Terminal } from './components/terminal/Terminal'



function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TaskColumn />
      </main>
      <footer>
        <Terminal />
      </footer>
    </div>
  )
}

export default App
