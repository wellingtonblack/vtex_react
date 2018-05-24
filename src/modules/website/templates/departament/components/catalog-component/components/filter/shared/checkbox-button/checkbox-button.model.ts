export interface CheckboxButtonProps {
    value: any;
    status: boolean;
    innerContent?: boolean;
    color?: string;
    handleCheck?(value: string, state: boolean): void;
}

export interface CheckboxButtonState {
    status: boolean;
}