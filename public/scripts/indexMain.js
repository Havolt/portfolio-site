if(typeof Vue === 'undefined') {
    const newVue = document.createElement('script');
    newVue.src="/scripts/vue.js";
    document.body.appendChild(newVue);
}



onload = () => {

//Toggles if element has the displayNone class
function toggleDisplay(el) {
    el.classList.toggle('displayNone');
}
//Initial functions when app is loaded
function initFunctions() {
    toggleDisplay(document.querySelector('#vApp'));
    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 10);
}

    const vueApp = new Vue({
        el: '#vApp',
        data: {
            test: 'test data here',
            intTxtAnimData: {
                text: 'Hi. I\'m Mark. A Front End Web Developer'.split(''),
                display: []

            },
            headerList: [
                'Home',
                'About',
                'Portfolio',
                'Contact'
            ]
        },
        methods: {
            intTxtAnimate: function(v) {
                v.display.push(v.text[v.display.length]);

                if(v.display.length !== v.text.length) {
                    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 40)
                }
            }
        },
        computed: {
            intTxtInfo: function() {
                return this.intTxtAnimData.display.join('');
            }
        }
    })

    initFunctions();
}