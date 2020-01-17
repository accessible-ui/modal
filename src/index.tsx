import {FC, createElement, cloneElement} from 'react'
import {
  Target as DisclosureTarget,
  TargetProps as DisclosureTargetProps,
  DisclosureControls,
  CloseProps as DisclosureCloseProps,
  TriggerProps as DisclosureTriggerProps,
  Trigger as DisclosureTrigger,
  DisclosureProps,
  DisclosureContextValue,
} from '@accessible/disclosure'
export {
  Disclosure as Modal,
  DisclosureContext as ModalContext,
  DisclosureConsumer as ModalConsumer,
  useDisclosure as useModal,
  Close,
  useIsOpen,
  useControls,
} from '@accessible/disclosure'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface ModalContextValue extends DisclosureContextValue {}
export interface ModalProps extends DisclosureProps {}
export interface ModalControls extends DisclosureControls {}
export interface TriggerProps extends DisclosureTriggerProps {}
export interface CloseProps extends DisclosureCloseProps {}
export interface TargetProps extends DisclosureTargetProps {}

const defaultStyles = {
  position: 'fixed',
  margin: 'auto',
  left: '50%',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
}

export const Target: FC<TargetProps> = props => {
  const childProps = props.children.props
  return createElement(
    DisclosureTarget,
    props,
    cloneElement(props.children, {
      role: childProps.hasOwnProperty('role') ? childProps.role : 'dialog',
      'aria-modal': childProps.hasOwnProperty('aria-modal')
        ? childProps['aria-modal']
        : 'false',
      style: Object.assign({}, props.children.props.style, defaultStyles),
    })
  )
}

export const Trigger: FC<TriggerProps> = props => {
  const childProps = props.children.props
  return createElement(
    DisclosureTrigger,
    props,
    cloneElement(props.children, {
      'aria-haspopup': childProps.hasOwnProperty('aria-haspopup')
        ? childProps['aria-haspopup']
        : 'dialog',
    })
  )
}

/* istanbul ignore next */
if (__DEV__) {
  Target.displayName = 'Target'
  Trigger.displayName = 'Trigger'
}
