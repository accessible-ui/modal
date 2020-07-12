<hr>
<div align="center">
  <h1 align="center">
    &lt;Modal&gt;
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/modal">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/modal?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@accessible/modal">
    <img alt="Types" src="https://img.shields.io/npm/types/@accessible/modal?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/modal">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/modal?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/modal">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/modal?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/modal">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/modal?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/modal?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/modal</pre>
<hr>

An accessible and versatile modal component for React

## Features

- [x] **Style-agnostic** You can use this component with the styling library of your choice. It
      works with CSS-in-JS, SASS, plain CSS, plain `style` objects, anything!
- [x] **Portal-friendly** The modal target will render into React portals of your choice when configured
      to do so.
- [x] **a11y/aria-compliant** This component works with screen readers out of the box and manages
      focus for you.

## Quick Start

[Check out the example on **CodeSandbox**](https://codesandbox.io/s/accessiblemodal-example-v4koo)

```jsx harmony
import * as React from 'react'
import * as Modal from '@accessible/modal'

const Component = () => (
  <Modal.Modal>
    <Modal.Trigger>
      <button>Open me</button>
    </Modal.Trigger>

    <Modal.Target>
      <div className='my-modal'>
        <Modal.CloseButton>
          <button>Close me</button>
        </Modal.CloseButton>

        <div>You did a thing</div>
      </div>
    </Modal.Target>
  </Modal.Modal>
)
```

## API

### Components

| Component                       | Description                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`<Modal>`](#modal)             | This component creates the context for your modal target and trigger and contains some configuration options. |
| [`<Target>`](#target)           | This component wraps any React element and turns it into a modal target.                                      |
| [`<Trigger>`](#trigger)         | This component wraps any React element and turns it into a modal trigger.                                     |
| [`<CloseButton>`](#closebutton) | This is a convenience component that wraps any React element and adds an onClick handler to close the modal.  |  |

### Hooks

| Hook                                                        | Description                                                                                                                                                       |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`useModal()`](#usemodal)                                   | This hook provides the value of the modal's [ModalContextValue object](#modalcontextvalue).                                                                       |
| [`useA11yTarget()`](#usea11ytargettarget-options)           | A React hook for creating a headless modal target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).  |
| [`useA11yTrigger()`](#usea11ytriggertarget-options)         | A React hook for creating a headless modal trigger to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html). |
| [`useA11yCloseButton()`](#usea11yclosebuttontarget-options) | A React hook for creating a headless close button to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).  |

### &lt;Modal&gt;

This component creates the context for your modal target and trigger and contains some
configuration options.

#### Props

| Prop        | Type                      | Default     | Required? | Description                                                                                                                                               |
| ----------- | ------------------------- | ----------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultOpen | `boolean`                 | `false`     | No        | This sets the default open state of the modal. By default the modal is closed.                                                                            |
| open        | `boolean`                 | `undefined` | No        | This creates a controlled modal component where the open state of the modal is controlled by this property.                                               |
| onChange    | `(open: boolean) => void` | `undefined` | No        | This callback is invoked any time the `open` state of the modal changes.                                                                                  |
| id          | `string`                  | `undefined` | No        | By default this component creates a unique id for you, as it is required for certain aria attributes. Supplying an id here overrides the auto id feature. |
| children    | `React.ReactNode`         | `undefined` | No        | Your modal contents and any other children.                                                                                                               |

### useA11yTarget(target, options?)

A React hook for creating a headless modal target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).

#### Arguments

| Argument | Type                                               | Required? | Description                 |
| -------- | -------------------------------------------------- | --------- | --------------------------- |
| target   | <code>React.RefObject&lt;T&gt; \| T \| null</code> | Yes       | A React ref or HTML element |
| options  | [`UseA11yTargetOptions`](#usea11ytargetoptions)    | No        | Configuration options       |

#### UseA11yTargetOptions

```ts
export interface UseA11yTargetOptions {
  /**
   * Adds this class name to props when the modal is open
   */
  openClass?: string
  /**
   * Adds this class name to props when the modal is closed
   */
  closedClass?: string
  /**
   * Adds this style to props when the modal is open
   */
  openStyle?: React.CSSProperties
  /**
   * Adds this style to props when the modal is closed
   */
  closedStyle?: React.CSSProperties
  /**
   * Prevents the `window` from scrolling when the target is
   * focused after opening.
   */
  preventScroll?: boolean
  /**
   * When `true`, this closes the target element when the `Escape`
   * key is pressed.
   * @default true
   */
  closeOnEscape?: boolean
}
```

#### Returns

```ts
interface A11yProps {
  readonly role: 'dialog'
  readonly 'aria-hidden': boolean
  readonly id: string | undefined
  readonly className: string | undefined
  readonly style: {
    readonly visibility: 'hidden' | 'visible'
    readonly position: 'fixed'
    readonly margin: 'auto'
    readonly left: '50%'
    readonly top: '50%'
    readonly transform: 'translate3d(-50%, -50%, 0)'
  }
}
```

#### Example

```jsx harmony
import * as React from 'react'
import {useA11yTarget} from '@accessible/modal'

const MyTarget = () => {
  const ref = React.useRef(null)
  const a11yProps = useA11yTarget(ref, {closeOnEscape: false})

  return (
    <div ref={ref} {...a11yProps}>
      I am the modal dialog
    </div>
  )
}
```

### &lt;Target&gt;

This component wraps any React element and turns it into a modal target.

#### Props

| Prop          | Type                                              | Default         | Required? | Description                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------- | --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| portal        | <code>boolean \| string \| PortalizeProps </code> | `false`         | No        | When `true` this will render the modal into a React portal with the id `#portals`. You can render it into any portal by providing its query selector here, e.g. `#foobar`, `[data-portal=true]`, or `.foobar`. |
| closeOnEscape | `boolean`                                         | `true`          | No        | By default the modal will close when the `Escape` key is pressed. You can turn this off by providing `false` here.                                                                                             |
| closedClass   | `string`                                          | `undefined`     | No        | This class name will be applied to the child element when the modal is `closed`.                                                                                                                               |
| openClass     | `string`                                          | `"modal--open"` | No        | This class name will be applied to the child element when the modal is `open`.                                                                                                                                 |
| closedStyle   | `React.CSSProperties`                             | `undefined`     | No        | These styles will be applied to the child element when the modal is `closed` in addition to the default styles that set the target's visibility.                                                               |
| openStyle     | `React.CSSProperties`                             | `undefined`     | No        | These styles name will be applied to the child element when the modal is `open` in addition to the default styles that set the target's visibility.                                                            |
| preventScroll | `boolean`                                         | `false`         | No        | When `true` this will prevent your browser from scrolling the document to bring the newly-focused tab into view.                                                                                               |
| children      | `React.ReactElement`                              | `undefined`     | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above.                                                                                     |

#### Example

```jsx harmony
<Target>
  <div className='alert'>Alert</div>
</Target>
```

### useA11yTrigger(target, options?)

A React hook for creating a headless modal trigger to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
In addition to providing accessibility props to your component, this hook will add events
for interoperability between actual <button> elements and fake ones e.g. <a> and <div> to the
target element

#### Arguments

| Argument | Type                                               | Required? | Description                 |
| -------- | -------------------------------------------------- | --------- | --------------------------- |
| target   | <code>React.RefObject&lt;T&gt; \| T \| null</code> | Yes       | A React ref or HTML element |
| options  | [`UseA11yTriggerOptions`](#usea11ytriggeroptions)  | No        | Configuration options       |

#### UseA11yTriggerOptions

```ts
export interface UseA11yTriggerOptions<E = React.MouseEvent<any, MouseEvent>> {
  /**
   * Adds this class name to props when the modal is open
   */
  openClass?: string
  /**
   * Adds this class name to props when the modal is closed
   */
  closedClass?: string
  /**
   * Adds this style to props when the modal is open
   */
  openStyle?: React.CSSProperties
  /**
   * Adds this style to props when the modal is closed
   */
  closedStyle?: React.CSSProperties
  /**
   * Adds an onClick handler in addition to the default one that
   * toggles the modal's open state.
   */
  onClick?: (e: E) => any
}
```

#### Returns

```ts
interface A11yProps<E extends React.MouseEvent<any, MouseEvent>> {
  readonly 'aria-haspopup': 'dialog'
  readonly 'aria-controls': string | undefined
  readonly 'aria-expanded': boolean
  readonly role: 'button'
  readonly tabIndex: 0
  readonly className: string | undefined
  readonly style: React.CSSProperties | undefined
  readonly onClick: (event: React.MouseEvent<any, MouseEvent>) => void
}
```

#### Example

```jsx harmony
import * as React from 'react'
import {useA11yTrigger} from '@accessible/modal'

const MyTrigger = () => {
  const ref = React.useRef(null)
  const a11yProps = useA11yTrigger(ref, {
    openClass: 'open',
    closedClass: 'closed',
  })

  return (
    <button ref={ref} {...a11yProps}>
      Clicking me toggles the modal dialog
    </button>
  )
}
```

### &lt;Trigger&gt;

This component wraps any React element and adds an `onClick` handler which toggles the open state
of the modal target.

#### Props

| Prop        | Type                  | Default     | Required? | Description                                                                                                                |
| ----------- | --------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| closedClass | `string`              | `undefined` | No        | This class name will be applied to the child element when the modal is `closed`.                                           |
| openClass   | `string`              | `undefined` | No        | This class name will be applied to the child element when the modal is `open`.                                             |
| closedStyle | `React.CSSProperties` | `undefined` | No        | These styles will be applied to the child element when the modal is `closed`.                                              |
| openStyle   | `React.CSSProperties` | `undefined` | No        | These styles name will be applied to the child element when the modal is `open`.                                           |
| children    | `React.ReactElement`  | `undefined` | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above. |

```jsx harmony
<Trigger on='click'>
  <button className='my-button'>Open me!</button>
</Trigger>
```

### useA11yCloseButton(target, options?)

A React hook for creating a headless close button to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
In addition to providing accessibility props to your component, this hook will add events
for interoperability between actual <button> elements and fake ones e.g. <a> and <div> to the
target element

#### Arguments

| Argument | Type                                                      | Required? | Description                 |
| -------- | --------------------------------------------------------- | --------- | --------------------------- |
| target   | <code>React.RefObject&lt;T&gt; \| T \| null</code>        | Yes       | A React ref or HTML element |
| options  | [`UseA11yCloseButtonOptions`](#usea11yclosebuttonoptions) | No        | Configuration options       |

#### UseA11yCloseButtonOptions

```ts
export interface UseA11yCloseButtonOptions<
  E = React.MouseEvent<any, MouseEvent>
> {
  /**
   * Adds an onClick handler in addition to the default one that
   * closes the modal.
   */
  onClick?: (e: E) => any
}
```

#### Returns

```ts
interface A11yProps<E extends React.MouseEvent<any, MouseEvent>> {
  readonly 'aria-haspopup': 'dialog'
  readonly 'aria-controls': string | undefined
  readonly 'aria-expanded': boolean
  readonly 'aria-label': 'Close'
  readonly onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  readonly role: 'button'
  readonly tabIndex: 0
}
```

#### Example

```jsx harmony
import * as React from 'react'
import {useA11yCloseButton} from '@accessible/modal'

const MyTrigger = () => {
  const ref = React.useRef(null)
  const a11yProps = useA11yCloseButton(ref, {
    onClick: () => console.log('Closing!'),
  })

  return (
    <button ref={ref} {...a11yProps}>
      Clicking me closes the modal dialog
    </button>
  )
}
```

### &lt;CloseButton&gt;

This is a convenience component that wraps any React element and adds an onClick handler which closes the modal.

#### Props

| Prop     | Type                 | Default     | Required? | Description                                                                                                                |
| -------- | -------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| children | `React.ReactElement` | `undefined` | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above. |

```jsx harmony
<CloseButton>
  <button className='my-button'>Close me</button>
</CloseButton>
```

### useModal()

This hook provides the value of the modal's [ModalContextValue object](#modalcontextvalue)

### ModalContextValue

```typescript
export interface ModalContextValue {
  /**
   * The open state of the modal
   */
  isOpen: boolean
  /**
   * Opens the modal
   */
  open: () => void
  /**
   * Closes the modal
   */
  close: () => void
  /**
   * Toggles the open state of the modal
   */
  toggle: () => void
  /**
   * A unique ID for the modal target
   */
  id?: string
}
```

#### Example

```jsx harmony
const Component = () => {
  const {open, close, toggle, isOpen} = useModal()
  return <button onClick={toggle}>Toggle the modal</button>
}
```

## LICENSE

MIT
