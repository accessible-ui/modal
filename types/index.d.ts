import * as React from 'react';
import type { DisclosureProps, DisclosureContextValue, TargetProps, TriggerProps, CloseButtonProps, UseA11yTargetOptions, UseA11yTriggerOptions, UseA11yCloseButtonOptions } from '@accessible/disclosure';
/**
 * This hook provides the current value of the modal's context object
 */
export declare function useModal(): ModalContextValue;
/**
 * This component creates the context for your modal target and trigger
 * and contains some configuration options.
 */
export declare function Modal(props: ModalProps): JSX.Element;
export declare namespace Modal {
    var displayName: string;
}
/**
 * A React hook for creating a headless modal target to [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).
 *
 * @param target A React ref or HTML element
 * @param options Configuration options
 */
export declare function useA11yTarget<T extends HTMLElement>(target: React.RefObject<T> | T | null, options?: UseA11yTargetOptions): {
    readonly 'aria-hidden': boolean;
    readonly id: string | undefined;
    readonly className: string | undefined;
    readonly style: {
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties;
} & {
    readonly role: "dialog";
    readonly style: {
        readonly visibility: "hidden" | "visible";
    } & React.CSSProperties & {
        readonly position: "fixed";
        readonly margin: "auto";
        readonly left: "50%";
        readonly top: "50%";
        readonly transform: "translate3d(-50%, -50%, 0)";
    };
};
/**
 * This component wraps any React element and turns it into a
 * modal target.
 */
export declare function Target(props: TargetProps): React.FunctionComponentElement<TargetProps>;
export declare namespace Target {
    var displayName: string;
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
export declare function useA11yTrigger<T extends HTMLElement>(target: React.RefObject<T> | T | null, options?: UseA11yTriggerOptions): {
    readonly 'aria-controls': string | undefined;
    readonly 'aria-expanded': boolean;
    readonly className: string | undefined;
    readonly style: React.CSSProperties | undefined;
} & {
    readonly onClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    readonly role: "button";
    readonly tabIndex: 0;
} & {
    readonly 'aria-haspopup': "dialog";
};
/**
 * This component wraps any React element and adds an `onClick` handler
 * which toggles the open state of the disclosure target.
 */
export declare function Trigger(props: TriggerProps): React.FunctionComponentElement<TriggerProps>;
export declare namespace Trigger {
    var displayName: string;
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
export declare function useA11yCloseButton<T extends HTMLElement>(target: React.RefObject<T> | T | null, options?: UseA11yCloseButtonOptions): {
    readonly 'aria-controls': string | undefined;
    readonly 'aria-expanded': boolean;
    readonly 'aria-label': "Close";
} & {
    readonly onClick: (event: React.MouseEvent<any, MouseEvent>) => void;
    readonly role: "button";
    readonly tabIndex: 0;
} & {
    readonly 'aria-haspopup': "dialog";
};
/**
 * This is a convenience component that wraps any React element and adds
 * an onClick handler which closes the disclosure.
 */
export declare function CloseButton(props: CloseButtonProps): React.FunctionComponentElement<CloseButtonProps>;
export declare namespace CloseButton {
    var displayName: string;
}
export type { TargetProps, TriggerProps, CloseButtonProps, UseA11yTargetOptions, UseA11yTriggerOptions, UseA11yCloseButtonOptions, } from '@accessible/disclosure';
export interface ModalProps extends DisclosureProps {
}
export interface ModalContextValue extends DisclosureContextValue {
}
