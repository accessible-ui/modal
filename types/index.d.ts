import * as React from 'react'
import {
  TargetProps as DisclosureTargetProps,
  DisclosureControls,
  CloseProps as DisclosureCloseProps,
  TriggerProps as DisclosureTriggerProps,
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
export declare const Target: React.FC<TargetProps>
export declare const Trigger: React.FC<TriggerProps>
export interface ModalContextValue extends DisclosureContextValue {}
export interface ModalProps extends DisclosureProps {}
export interface ModalControls extends DisclosureControls {}
export interface TriggerProps extends DisclosureTriggerProps {}
export interface CloseProps extends DisclosureCloseProps {}
export interface TargetProps extends DisclosureTargetProps {}
