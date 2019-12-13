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

An accessible modal component for React

## Quick Start

```jsx harmony
import {Modal, Dialog, Trigger, Close} from '@accessible/modal'

const Component = () => (
  <Modal>
    <Dialog>
      <div className="my-modal">
        <Close>
          <button>Close me</button>
        </Close>
      </div>
    </Dialog>

    <Trigger>
      <button>Open me</button>
    </Trigger>
  </Modal>
)
```

## API

### `<Modal>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `<Dialog>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `<Trigger>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `<Close>`

This is a convenience component that wraps any React element and adds an onClick handler which closes the modal.

#### Props

| Prop     | Type                 | Default     | Required? | Description                                                                                                                |
| -------- | -------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| children | `React.ReactElement` | `undefined` | Yes       | The child is cloned by this component and has aria attributes injected into its props as well as the events defined above. |

```jsx harmony
<Close>
  <button className="my-button">Close me</button>
</Close>

// <button
//   class="my-button"
//   aria-controls="popover--12"
//   aria-haspopup="dialog"
//   aria-expanded="false"
// >
//   Close me
// </button>
```

### `useModal()`

### `useControls()`

### `useIsOpen()`

## LICENSE

MIT
