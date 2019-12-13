/* jest */
import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render, fireEvent} from '@testing-library/react'
import {Modal, ModalToggle, ModalBox, useControls, useIsOpen, useModal} from './index'

describe('<Modal>', () => {
  it('should have a custom id', () => {
    const result = render(
      <Modal id="foobar">
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
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
          return <div/>
        }}
      </Modal>
    )

    expect(cxt).toMatchSnapshot()
  })
})

describe('<ModalBox>', () => {
  it('should open and close on ModalToggle click', () => {
    const result = render(
      <Modal>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
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
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
    fireEvent.keyUp(result.getByText('Hello world'), {key: 'Escape', code: 27})
    expect(result.asFragment()).toMatchSnapshot('closed')
  })

  it(`shouldn't close on escape key if prop is false`, () => {
    const result = render(
      <Modal>
        <ModalBox closeOnEscape={false}>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('closed initially')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
    fireEvent.keyUp(result.getByText('Hello world'), {key: 'Escape', code: 27})
    expect(result.asFragment()).toMatchSnapshot('still open')
  })

  it(`should assign to custom styles when opened or closed`, () => {
    const result = render(
      <Modal>
        <ModalBox>
          <div style={{fontSize: '2rem'}}>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply custom classname when opened or closed`, () => {
    const result = render(
      <Modal>
        <ModalBox>
          <div className="custom">Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply user defined openClassName and closedClassName`, () => {
    const result = render(
      <Modal>
        <ModalBox closedClassName="closed" openClassName="open">
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should apply user defined openStyle and closedStyle`, () => {
    const result = render(
      <Modal>
        <ModalBox
          closedStyle={{display: 'none'}}
          openStyle={{display: 'block'}}
        >
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it(`should be initially open when defined as such`, () => {
    const result = render(
      <Modal defaultOpen>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('initially open')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('closed')
  })

  it(`should act like a controlled component when 'open' prop is specified`, () => {
    const result = render(
      <Modal open>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot('initially open')
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('still open')

    result.rerender(
      <Modal open={false}>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
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
        <ModalBox portal>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
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
        <ModalBox portal={{container: '.portals'}}>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
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
        <ModalBox portal=".portals">
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle>
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    fireEvent.click(result.getByText('open me'))
    expect(result.baseElement).toMatchSnapshot()
    document.body.removeChild(portalRoot)
  })
})

describe('<ModalToggle>', () => {
  it('should have openClassName and closedClassName', () => {
    const result = render(
      <Modal>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle closedClassName="closed" openClassName="open">
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })

  it('should have openStyle and closedStyle', () => {
    const result = render(
      <Modal>
        <ModalBox>
          <div>Hello world</div>
        </ModalBox>

        <ModalToggle
          closedStyle={{display: 'none'}}
          openStyle={{display: 'block'}}
        >
          <button>open me</button>
        </ModalToggle>
      </Modal>
    )

    expect(result.asFragment()).toMatchSnapshot()
    fireEvent.click(result.getByText('open me'))
    expect(result.asFragment()).toMatchSnapshot('open')
  })
})

describe('useControls()', () => {
  it('should have toggle, open, close keys', () => {
    const {result} = renderHook(() => useControls(), {wrapper: Modal})
    expect(Object.keys(result.current)).toStrictEqual(['open', 'close', 'toggle'])
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