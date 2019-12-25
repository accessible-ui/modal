import {FC, createElement, cloneElement} from 'react'
import {
  Target as CollapseTarget,
  TargetProps as CollapseTargetProps,
  CollapseControls,
  CloseProps as CollapseCloseProps,
  TriggerProps as CollapseTriggerProps,
  Trigger as CollapseTrigger,
  CollapseProps,
  CollapseContextValue,
} from '@accessible/collapse'
export {
  Collapse as Modal,
  CollapseContext as ModalContext,
  CollapseConsumer as ModalConsumer,
  useCollapse as useModal,
  Close,
  useIsOpen,
  useControls,
} from '@accessible/collapse'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface ModalContextValue extends CollapseContextValue {}
export interface ModalProps extends CollapseProps {}
export interface ModalControls extends CollapseControls {}
export interface TriggerProps extends CollapseTriggerProps {}
export interface CloseProps extends CollapseCloseProps {}
export interface TargetProps extends CollapseTargetProps {}

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
    CollapseTarget,
    props,
    cloneElement(props.children, {
      role: childProps.role === void 0 ? 'dialog' : childProps.role,
      'aria-modal':
        childProps['aria-modal'] === void 0
          ? 'false'
          : childProps['aria-modal'],
      style: Object.assign({}, props.children.props.style, defaultStyles),
    })
  )
}

export const Trigger: FC<TriggerProps> = props => {
  const childProps = props.children.props
  return createElement(
    CollapseTrigger,
    props,
    cloneElement(props.children, {
      'aria-haspopup':
        childProps['aria-haspopup'] === void 0
          ? 'dialog'
          : childProps['aria-haspopup'],
    })
  )
}

/* istanbul ignore next */
if (__DEV__) {
  Target.displayName = 'Target'
  Trigger.displayName = 'Trigger'
}
