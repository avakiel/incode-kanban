import './App.css'
import { Header } from './components/header/Header'
import { TaskColumn } from './components/taskColumn/TaskColumn'
import { Terminal } from './components/terminal/Terminal'

const boxes = ['ToDo', 'In Progress', 'Done']

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TaskColumn columnName={boxes} />
      </main>
      <footer>
        <Terminal />
      </footer>
    </div>
  )
}

export default App
