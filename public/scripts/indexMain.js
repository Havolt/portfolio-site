if(typeof Vue === 'undefined') {
    const newVue = document.createElement('script');
    newVue.src="/scripts/vue.js";
    document.body.appendChild(newVue);
}

//Toggles if element has the displayNone class
function toggleDisplay(el) {
    el.classList.toggle('displayNone');
}
//Initial functions when app is loaded
function initFunctions() {
    toggleDisplay(document.querySelector('#vApp'));
}

onload = () =>{
    const vueApp = new Vue({
        el: '#vApp',
        data: {
            test: 'test data here'
        }
    })

    initFunctions();
}