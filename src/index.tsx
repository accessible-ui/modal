import React, {useRef, useMemo, useContext, useCallback} from 'react'
import useSwitch from '@react-hook/switch'
import useMergedRef from '@react-hook/merged-ref'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import {useId} from '@reach/auto-id'
import Portalize from 'react-portalize'
import tabbable from 'tabbable'
import clsx from 'clsx'
import raf from 'raf'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface ModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  id: string
  dialogRef: React.MutableRefObject<HTMLElement | null>
  triggerRef: React.MutableRefObject<HTMLElement | null>
}

export interface ModalControls {
  open: () => void
  close: () => void
  toggle: () => void
}

// @ts-ignore
export const ModalContext = React.createContext<ModalContextValue>({}),
  {Consumer: ModalConsumer} = ModalContext,
  useModal = () => useContext<ModalContextValue>(ModalContext),
  useIsOpen = () => useModal().isOpen,
  useControls = (): ModalControls => {
    const {open, close, toggle} = useModal()
    return {open, close, toggle}
  }

const portalize = (
  Component,
  portal: boolean | undefined | null | string | Record<any, any>
) => {
  if (portal === false || portal === void 0 || portal === null) return Component
  const props: Record<string, any> = {children: Component}
  if (typeof portal === 'string') props.container = portal
  else Object.assign(props, portal)
  return React.createElement(Portalize, props)
}

const defaultStyles = {
  position: 'fixed',
  margin: 'auto',
  left: 0,
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
}

export interface DialogProps {
  portal?: boolean | undefined | null | string | Record<any, any>
  closeOnEscape?: boolean
  openClassName?: string
  closedClassName?: string
  openStyle?: React.CSSProperties
  closedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}

export const Dialog: React.FC<DialogProps> = React.forwardRef<
  JSX.Element | React.ReactElement,
  DialogProps
>(
  (
    {
      closeOnEscape = true,
      portal,
      openClassName = 'modal--open',
      closedClassName,
      openStyle,
      closedStyle,
      children,
    },
    userRef: any
  ) => {
    const {id, isOpen, close, dialogRef} = useModal()
    const ref = useMergedRef(dialogRef, userRef)

    // handles closing the modal when the ESC key is pressed
    useLayoutEffect(() => {
      const current = dialogRef?.current
      if (current && isOpen) {
        // Focuses on the first focusable element
        raf(() => {
          const tabbableEls = tabbable(current)
          if (tabbableEls.length > 0) tabbableEls[0].focus()
        })
        // Closes the modal when escape is pressed
        if (closeOnEscape) {
          const callback = event => parseInt(event.code) === 27 && close()
          current.addEventListener('keyup', callback)
          return () => current.removeEventListener('keyup', callback)
        }
      }

      return
    }, [dialogRef.current, isOpen, close, closeOnEscape])

    return portalize(
      React.cloneElement(children, {
        id,
        role: 'dialog',
        'aria-modal': 'false',
        'aria-hidden': String(!isOpen),
        className:
          clsx(
            children.props.className,
            isOpen ? openClassName : closedClassName
          ) || void 0,
        style: Object.assign(
          {},
          defaultStyles,
          children.props.style,
          isOpen ? openStyle : closedStyle
        ),
        ref,
      }),
      portal
    )
  }
)

export interface CloseProps {
  children: JSX.Element | React.ReactElement
}

export const Close: React.FC<CloseProps> = React.forwardRef<
  JSX.Element | React.ReactElement,
  CloseProps
  >(({children}, ref) => {
  const {close, isOpen, id} = useModal()
  const onClick = useCallback(
    e => {
      close()
      children.props.onClick?.(e)
    },
    [close, children.props.onClick]
  )

  return React.cloneElement(children, {
    'aria-controls': id,
    'aria-haspopup': 'dialog',
    'aria-expanded': String(isOpen),
    'aria-label': children.props['aria-label'] || 'Close',
    onClick,
    ref,
  })
})

export interface TriggerProps {
  openClassName?: string
  closedClassName?: string
  openStyle?: React.CSSProperties
  closedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}

export const Trigger: React.FC<TriggerProps> = React.forwardRef<
  JSX.Element | React.ReactElement,
  TriggerProps
>(
  (
    {openClassName, closedClassName, openStyle, closedStyle, children},
    userRef: any
  ) => {
    const {isOpen, id, toggle, triggerRef} = useModal()
    const ref = useMergedRef(triggerRef, userRef)
    const seen = useRef<boolean>(false)
    const onClick = useCallback(
      e => {
        toggle()
        children.props.onClick?.(e)
      },
      [toggle, children.props.onClick]
    )

    // returns the focus to the opener when the modal box closes if focus is
    // not an event that triggers opening the modal
    useLayoutEffect(() => {
      if (!isOpen) {
        if (seen.current) raf(() => triggerRef.current?.focus())
        seen.current = true
      }
    }, [isOpen])

    return React.cloneElement(children, {
      'aria-controls': id,
      'aria-haspopup': 'dialog',
      'aria-expanded': String(isOpen),
      className:
        clsx(
          children.props.className,
          isOpen ? openClassName : closedClassName
        ) || void 0,
      style: Object.assign(
        {},
        children.props.style,
        isOpen ? openStyle : closedStyle
      ),
      onClick,
      ref,
    })
  }
)

export interface ModalProps {
  open?: boolean
  defaultOpen?: boolean
  id?: string
  children:
    | React.ReactChild
    | React.ReactChild[]
    | JSX.Element[]
    | JSX.Element
    | ((context: ModalContextValue) => React.ReactChild)
}

export const Modal: React.FC<ModalProps> = ({
  id,
  open,
  defaultOpen,
  children,
}) => {
  // eslint-disable-next-line prefer-const
  let [isOpen, toggle] = useSwitch(defaultOpen)
  isOpen = open === void 0 || open === null ? isOpen : open
  id = `modal--${useId(id)}`
  const triggerRef = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLElement | null>(null)
  const context = useMemo(
    () => ({
      id,
      open: toggle.on,
      close: toggle.off,
      toggle,
      isOpen,
      triggerRef,
      dialogRef,
    }),
    [id, isOpen, toggle.on, toggle.off, toggle]
  )

  return (
    <ModalContext.Provider
      value={context}
      // @ts-ignore
      children={typeof children === 'function' ? children(context) : children}
    />
  )
}

/* istanbul ignore next */
if (__DEV__) {
  Modal.displayName = 'Modal'
  Dialog.displayName = 'Dialog'
  Trigger.displayName = 'Trigger'
}
