import * as React from 'react'
import './Dropdown.css'

interface RendererProps {
  isOpen: boolean
  close: () => void
  open: () => void
  toggle: () => void
}

export interface Props {
  defaultIsOpen?: boolean
  renderTrigger: ((props: RendererProps) => React.ReactNode)
  renderContent: ((props: RendererProps) => React.ReactNode)
  containerTag?: any // JSX typesafety is hard 🤦🏻‍♂️
}

interface State {
  isOpen: boolean
}

/**
 * Using named export so that name changes with always match with import name
 */
export class Dropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: props.defaultIsOpen || false,
    }
  }

  setOpenState = (openState: boolean) => this.setState({ isOpen: openState })
  toggle = () => this.setOpenState(!this.state.isOpen)
  open = () => this.setOpenState(true)
  close = () => this.setOpenState(false)

  render() {
    const rendererProps: RendererProps = {
      isOpen: this.state.isOpen,
      close: this.close,
      open: this.open,
      toggle: this.toggle,
    }

    /**
     * This allow to use a user-defind tag or component instead of a span
     */
    const Container = this.props.containerTag || 'span'

    const { renderTrigger, renderContent } = this.props
    return (
      <Container className="wrapper">
        <div className="trigger">{renderTrigger(rendererProps)}</div>
        {this.state.isOpen && (
          <div
            onClick={this.close}
            className="dropdown-content"
            data-test="dropdown-content"
          >
            {renderContent(rendererProps)}
          </div>
        )}
      </Container>
    )
  }
}
