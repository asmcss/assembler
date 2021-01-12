const crt = document.createElement('script');
document.head.appendChild(crt);
Object.defineProperty(document, 'currentScript', {
    value: crt
});