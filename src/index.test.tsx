/* jest */
import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render, fireEvent} from '@testing-library/react'
import {
  Modal,
  Trigger,
  Target,
  Close,
  useControls,
  useIsOpen,
  useModal,
} from './index'

const click_ = fireEvent.click
fireEvent.click = (...args) => {
  fireEvent.mouseDown(...args)
  return click_(...args)
}

describe('<Modal>', () => {
  it('should have a custom id', () => {
    const result = render(
      <Modal id="foobar">
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should provide context to function child', () => {
    let cxt

    render(
      <Modal>
        {context => {
          cxt = context
          return <div />
        }}
      </Modal>
    )

    expect(cxt).toMatchSnapshot()
  })
})

describe('<Target>', () => {
  it('should open and close on Trigger click', () => {
    const result = render(
      <Modal>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('closed')
  })

  it('should close on escape key', () => {
    const result = render(
      <Modal>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
    fireEvent.keyDown(result.getByText('Hello world'), {
      key: 'Escape',
      code: 27,
    })
    expect(result.asFragment()).toMatchSnapshot('closed')
  })

  it(`shouldn't close on escape key if prop is false`, () => {
    const result = render(
      <Modal>
        <Target closeOnEscape={false}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
    fireEvent.keyDown(result.getByText('Hello world'), {
      key: 'Escape',
      code: 27,
    })
    expect(result.asFragment()).toMatchSnapshot('still open')
  })

  it(`should assign to custom styles when opened or closed`, () => {
    const result = render(
      <Modal>
        <Target>
          <div style={{fontSize: '2rem'}}>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply custom classname when opened or closed`, () => {
    const result = render(
      <Modal>
        <Target>
          <div className="custom">Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply user defined openClass and closedClass`, () => {
    const result = render(
      <Modal>
        <Target closedClass="closed" openClass="open">
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply user defined openStyle and closedStyle`, () => {
    const result = render(
      <Modal>
        <Target closedStyle={{display: 'none'}} openStyle={{display: 'block'}}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should be initially open when defined as such`, () => {
    const result = render(
      <Modal defaultOpen>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('initially open')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('closed')
  })

  it(`should act like a controlled component when 'open' prop is specified`, () => {
    const result = render(
      <Modal open>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('initially open')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('still open')

    result.rerender(
      <Modal open={false}>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('still closed')
  })

  it('should render into a portal by default ID', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portals')
    document.body.appendChild(portalRoot)

    const result = render(
      <Modal open>
        <Target portal>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    fireEvent.click(result.getByText('open me'))
    expect(result.baseElement).toMatchSnapshot()
    document.body.removeChild(portalRoot)
  })

  it('should render into a portal by custom selector object', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'portals')
    document.body.appendChild(portalRoot)

    const result = render(
      <Modal open>
        <Target portal={{container: '.portals'}}>
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    fireEvent.click(result.getByText('open me'))
    expect(result.baseElement).toMatchSnapshot()
    document.body.removeChild(portalRoot)
  })

  it('should render into a portal by custom selector', () => {
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('class', 'portals')
    document.body.appendChild(portalRoot)

    const result = render(
      <Modal open>
        <Target portal=".portals">
          <div>Hello world</div>
        </Target>

        <Trigger>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    fireEvent.click(result.getByText('open me'))
    expect(result.baseElement).toMatchSnapshot()
    document.body.removeChild(portalRoot)
  })

  it('should override role', () => {
    const result = render(
      <Modal>
        <Target>
          <div role='other-role'>Hello world</div>
        </Target>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should override aria-modal', () => {
    const result = render(
      <Modal>
        <Trigger>
          <div aria-modal='true'>Hello world</div>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })
})

describe('<Trigger>', () => {
  it('should have openClass and closedClass', () => {
    const result = render(
      <Modal>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger closedClass="closed" openClass="open">
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it('should have openStyle and closedStyle', () => {
    const result = render(
      <Modal>
        <Target>
          <div>Hello world</div>
        </Target>

        <Trigger closedStyle={{display: 'none'}} openStyle={{display: 'block'}}>
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it('should override aria-haspopup', () => {
    const result = render(
      <Modal>
        <Trigger>
          <div aria-haspopup='grid'>Hello world</div>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })
})

describe('<Close>', () => {
  it('should close the modal', () => {
    const result = render(
      <Modal defaultOpen={true}>
        <Target>
          <div>
            <Close>
              <button data-testid="close">Close me</button>
            </Close>
            Hello world
          </div>
        </Target>

        <Trigger closedClass="closed" openClass="open">
          <button>open me</button>
        </Trigger>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByTestId('close'))
    expect(result.asFragment()).toMatchSnapshot('closed')
  })
})

describe('useControls()', () => {
  it('should have toggle, open, close keys', () => {
    const {result} = renderHook(() => useControls(), {wrapper: Modal})
    expect(Object.keys(result.current)).toStrictEqual([
      'open',
      'close',
      'toggle',
    ])
  })
})

describe('useIsOpen()', () => {
  it('should return boolean', () => {
    const {result} = renderHook(() => useIsOpen(), {wrapper: Modal})
    expect(typeof result.current).toBe('boolean')
  })
})

describe('useModal()', () => {
  it('should return context', () => {
    const {result} = renderHook(() => useModal(), {wrapper: Modal})
    expect(result.current).toMatchSnapshot()
  })
})
