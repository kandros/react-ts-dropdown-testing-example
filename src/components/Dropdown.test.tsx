import * as React from 'react'
import { render, mount } from 'enzyme'
import { Dropdown, Props as DropdownProps } from './Dropdown'

interface Link {
  label: string
  url: string
}

const links: Link[] = [
  { label: 'google', url: 'https://google.com' },
  { label: 'netflix', url: 'https://netflix.com' },
  { label: 'hacker news', url: 'https://news.ycombinator.com' },
]

const enum selectors {
  dropdownContent = '[data-test="dropdown-content"]',
}

function renderDropdown(
  /**
   * Partial allow to have a subset of another type/interface
   * in this case is any field of DropdownProps but nullable
   */
  overrides: Partial<DropdownProps> = {},
) {
  return (
    <Dropdown
      renderTrigger={({ isOpen, toggle }) => (
        <button onClick={toggle}>{isOpen ? 'open' : 'close'}</button>
      )}
      renderContent={({ close }) => (
        <ul className="list">
          {links.map(l => <li key={l.url}>{l.label}</li>)}
        </ul>
      )}
      {...overrides}
    />
  )
}

describe('<Dropdown />', () => {
  it('renders without crashing', () => {
    render(renderDropdown())
  })

  it('starts closed', () => {
    const wrapper = mount(renderDropdown())
    expect(wrapper.state().isOpen).toBe(false)
  })

  it('can be start open', () => {
    const wrapper = mount(renderDropdown({ defaultIsOpen: true }))
    expect(wrapper.state().isOpen).toBe(true)
  })

  it('content container is not rendered if dropdown is closed', () => {
    const wrapper = mount(renderDropdown())
    expect(wrapper.state().isOpen).toBe(false)
    const content = wrapper.find(selectors.dropdownContent)
    expect(content.length).toBe(0)
  })

  it('content container is rendered if dropdown open', () => {
    const wrapper = mount(renderDropdown({ defaultIsOpen: true }))
    const content = wrapper.find(selectors.dropdownContent)
    expect(content.length).toBe(1)
  })

  it('content is not rendered if dropdown is closed', () => {
    const wrapper = mount(
      renderDropdown({
        renderContent: () => {
          return <span data-test-content="ciaone">weee</span>
        },
      }),
    )
    expect(wrapper.state().isOpen).toBe(false)
    const content = wrapper.find('[data-test-content="ciaone"]')
    expect(content.length).toBe(0)
  })

  it('content is rendered if dropdown is open', () => {
    const wrapper = mount(
      renderDropdown({
        renderContent: () => {
          return <span data-test-content="ciaone">weee</span>
        },
        defaultIsOpen: true,
      }),
    )
    const content = wrapper.find('[data-test-content="ciaone"]')
    expect(content.length).toBe(1)
  })

  it('dropdown closes after a clickin on content', () => {
    const wrapper = mount(
      renderDropdown({
        renderContent: () => {
          return <span data-test-content="ciaone">weee</span>
        },
        defaultIsOpen: true,
      }),
    )
    const content = wrapper.find('[data-test-content="ciaone"]')
    content.simulate('click')
    expect(content.length).toBe(1)
    expect(wrapper.state().isOpen).toBe(false)
  })
})
