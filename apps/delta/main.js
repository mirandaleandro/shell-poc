var appName = "Delta";

document.getElementById('main-content').textContent += `${appName} is loaded. <br/>`;
var deltaButton;

// apps/app1.js
export function bootstrap() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is bootstrapped`);
        //document.getElementById('main-content').textContent += `${appName} is bootstrapped. <br/>`;
        resolve();
    });
}

export function mount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is mounted`);
        //document.getElementById('main-content').textContent += `${appName} is mounted.<br/>`;

        deltaButton = $(` <button class="btn btn-primary">${appName}</button> `)

        $("#main-content").append(deltaButton);

        resolve();
    });
}

export function unmount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is unmounted`);
        //document.getElementById('main-content').textContent = `${appName} is unomunted.<br/>`;
        $("#main-content").html("");
        resolve();
    });
}