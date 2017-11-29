import * as React from 'react'
import { Dropdown } from './components/Dropdown'
import './App.css'
import 'bulma/css/bulma.css'

interface Link {
  label: string
  url: string
}

const links: Link[] = [
  { label: 'google', url: 'https://google.com' },
  { label: 'netflix', url: 'https://netflix.com' },
  { label: 'hacker news', url: 'https://news.ycombinator.com' },
]

interface State {
  selected: string
}

class App extends React.Component<{}, State> {
  state = {
    selected: '',
  }

  select = (value: string) => {
    this.setState({
      selected: value,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="notification is-primary">
          Selected: {this.state.selected}
        </div>
        <Dropdown
          renderTrigger={({ isOpen, toggle }) => (
            <button className="button" onClick={toggle}>
              {isOpen ? 'close' : 'open'}
            </button>
          )}
          renderContent={({ close }) => (
            <ul className="menu-list">
              {links.map(l => (
                <li
                  key={l.url}
                  onClick={() => {
                    this.select(l.label)
                  }}
                >
                  <a
                    href="#0"
                    className={
                      this.state.selected === l.label ? 'is-active' : ''
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    )
  }
}

export default App
