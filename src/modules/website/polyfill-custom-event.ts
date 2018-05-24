export class CustomEvent {
    constructor(event: any, params: any) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
}

if (typeof (window as any).CustomEvent !== "function") {
    (window as any).CustomEvent = CustomEvent;
}