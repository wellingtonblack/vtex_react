export interface FlagProps {
    flagsHtml: string;
}

export interface FlagState {
    flags: FlagModel[];
}

export interface FlagModel {
    content: string;
    className: string;
}