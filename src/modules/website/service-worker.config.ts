if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/files/service-worker.js", {scope: "./"}).then((registration) => {
            // tslint:disable-next-line:no-console
            console.log("serviceWorker registrado com sucesso no escopo: ", registration.scope);
        }).catch((err) => {
            // registration failed :(
            // tslint:disable-next-line:no-console
            console.log("fala no registro do serviceworker: ", err);
        });
    });
}