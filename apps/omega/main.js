var appName = "Omega";



document.getElementById('main-content').textContent += `${appName} is loaded. <br/>`;
let omegaAppContainer;

// apps/app1.js
export function bootstrap() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is bootstrapping`);

        System.import('apps/omega/app.bundle.js').then(()=>{
            omegaAppContainer = $('<div id="omega-app"><crm ng-if="oogabooga"></crm></div>');
            $(document.body).append(omegaAppContainer);

            angular.element(omegaAppContainer).ready(function () {
                angular.bootstrap(omegaAppContainer, ["crm"]);
                console.log(`${appName} is bootstrapped`);
                resolve();
            });

        });
    });
}

export function mount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is mounted`);
        /*omegaAppContainer.append($('<crm ng-if="oogabooga"></crm>'));*/
        angular.element(omegaAppContainer).scope().oogabooga = true;
        angular.element(omegaAppContainer).scope().$digest();
        resolve();
    });
}

export function unmount() {
    return new Promise((resolve, reject) => {
        console.log(`${appName} is unmounted`);
        omegaAppContainer.empty();
        resolve();
    });
}