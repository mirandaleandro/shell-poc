var appName = "Beta";

document.getElementById('main-content').textContent += `${appName} is loaded. <br/>`;

// apps/app1.js
export function bootstrap() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is bootstrapped`);
        document.getElementById('main-content').textContent += `${appName} is bootstrapped. <br/>`;
        resolve();
    });
}

export function mount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is mounted`);
        document.getElementById('main-content').textContent += `${appName} is mounted.<br/>`;
        resolve();
    });
}

export function unmount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is unmounted`);
        document.getElementById('main-content').textContent = `${appName} is unomunted.<br/>`;
        resolve();
    });
}