import * as React from 'react'
import {
  Disclosure,
  Target as DisclosureTarget,
  Trigger as DisclosureTrigger,
  CloseButton as DisclosureCloseButton,
  useA11yTarget as useA11yDisclosureTarget,
  useA11yTrigger as useA11yDisclosureTrigger,
  useA11yCloseButton as useA11yDisclosureCloseButton,
  useDisclosure,
} from '@accessible/disclosure'
import type {
  DisclosureProps,
  DisclosureContextValue,
  TargetProps,
  TriggerProps,
  CloseButtonProps,
  UseA11yTargetOptions,
  UseA11yTriggerOptions,
  UseA11yCloseButtonOptions,
} from '@accessible/disclosure'

const defaultStyles = {
  position: 'fixed',
  margin: 'auto',
  left: '50%',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
} as const

/**
 * This hook provides the current value of the modal's context object
 */
export function useModal(): ModalContextValue {
  return useDisclosure()
}

/**
 * This component creates the context for your modal target and trigger
 * and contains some configuration options.
 */
export function Modal(props: ModalProps) {
  return <Disclosure {...props} />
}

/**
 * A React hook for creating a headless modal target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export function useA11yTarget<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseA11yTargetOptions = {}
) {
  const disclosureProps = useA11yDisclosureTarget(target, options)
  return Object.assign(disclosureProps, {
    role: 'dialog',
    style: Object.assign({}, disclosureProps.style, defaultStyles),
  } as const)
}

/**
 * This component wraps any React element and turns it into a
 * modal target.
 */
export function Target(props: TargetProps) {
  const childProps = props.children.props
  return React.createElement(
    DisclosureTarget,
    props,
    React.cloneElement(props.children, {
      role: childProps.hasOwnProperty('role') ? childProps.role : 'dialog',
      style: Object.assign({}, childProps.style, defaultStyles),
    })
  )
}

/**
 * A React hook for creating a headless disclosure trigger to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
 * In addition to providing accessibility props to your component, this
 * hook will add events for interoperability between actual <button> elements
 * and fake ones e.g. <a> and <div> to the target element
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export function useA11yTrigger<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseA11yTriggerOptions = {}
) {
  return Object.assign(useA11yDisclosureTrigger(target, options), {
    'aria-haspopup': 'dialog',
  } as const)
}

/**
 * This component wraps any React element and adds an `onClick` handler
 * which toggles the open state of the disclosure target.
 */
export function Trigger(props: TriggerProps) {
  const childProps = props.children.props
  return React.createElement(
    DisclosureTrigger,
    props,
    React.cloneElement(props.children, {
      'aria-haspopup': childProps.hasOwnProperty('aria-haspopup')
        ? childProps['aria-haspopup']
        : 'dialog',
    })
  )
}

/**
 * A React hook for creating a headless close button to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
 * In addition to providing accessibility props to your component, this
 * hook will add events for interoperability between actual <button> elements
 * and fake ones e.g. <a> and <div> to the target element.
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export function useA11yCloseButton<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  options: UseA11yCloseButtonOptions = {}
) {
  return Object.assign(useA11yDisclosureCloseButton(target, options), {
    'aria-haspopup': 'dialog',
  } as const)
}

/**
 * This is a convenience component that wraps any React element and adds
 * an onClick handler which closes the disclosure.
 */
export function CloseButton(props: CloseButtonProps) {
  const childProps = props.children.props
  return React.createElement(
    DisclosureCloseButton,
    props,
    React.cloneElement(props.children, {
      'aria-haspopup': childProps.hasOwnProperty('aria-haspopup')
        ? childProps['aria-haspopup']
        : 'dialog',
    })
  )
}

export type {
  TargetProps,
  TriggerProps,
  CloseButtonProps,
  UseA11yTargetOptions,
  UseA11yTriggerOptions,
  UseA11yCloseButtonOptions,
} from '@accessible/disclosure'

export interface ModalProps extends DisclosureProps {}
export interface ModalContextValue extends DisclosureContextValue {}

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  Modal.displayName = 'Modal'
  Target.displayName = 'Target'
  Trigger.displayName = 'Trigger'
  CloseButton.displayName = 'CloseButton'
}
