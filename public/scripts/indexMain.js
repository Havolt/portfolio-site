
//Place scripts needed to load after Vue here
const scripts = ['introSec.js'];

//Toggles if element has the displayNone class
function toggleDisplay(el) {
    el.classList.toggle('displayNone');
}

const vueApp = new Vue({
    el: '#vApp',
    data: {
        test: 'test data here',
        intTxtAnimData: {
            text: 'Hi. I\'m Mark Fitzpatrick. A Front End Web Developer.'.split(''),
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
                setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 25)
            }
        }
    },
    computed: {
        intTxtInfo: function() {
            return this.intTxtAnimData.display.join('');
        }
    }
});

//Initial functions when app is loaded
(function initFunctions() {
    console.log(scripts);
    scriptLoad(scripts);
    toggleDisplay(document.querySelector('#vApp'));
    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 10);
})()

