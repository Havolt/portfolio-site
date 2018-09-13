
//Place scripts needed to load after Vue here
const scripts = ['introSec.js'];

//Toggles if element has the displayNone class
function toggleDisplay(el) {
    el.classList.toggle('displayNone');
}

const vueApp = new Vue({
    el: '#vApp',
    data: {
        intTxtAnimData: {
            text1: 'Hi. I\'m'.split(''),
            name: 'Mark Fitzpatrick'.split(''),
            text2: '. A Front End Web Developer.'.split(''),
            display1: [],
            displayName: [],
            display2: []
        },
        introLinks: ['Portfolio', 'Contact'],
        linksVisible: false,
        introCardHalf: false,
        introCardFull: true,
        rightArrowHide: false,
        leftArrowHide: true,
        //Bio Section
        bioVisible: false,
        aboutTitle: 'About Me',
        aboutPara: 'I\'ve always had a strong interest in programming since I started delving into the code of The Elder Scrolls III: Morrowind. I have a bachelor\'s degree in multimedia. I have a strong interest in front-end development but in the past few years I\'ve been delving into Node.js. When I\'m making websites I can be found running, reading or making video games.'
        
    },
    methods: {
         intTxtAnimate: function(v) {
            if(v.display1.length !== v.text1.length) {
                v.display1.push(v.text1[v.display1.length]);
            } else if(v.displayName.length !== v.name.length) {
                v.displayName.push(v.name[v.displayName.length]);
            } else if(v.display2.length !== v.text2.length) {
                v.display2.push(v.text2[v.display2.length]);
            }else {
                console.log(this.linksVisible);
                this.linksVisible = true;
                return;
            }
            setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 25)
        },
        showBio: function() {
            if(!this.rightArrowHide){
                this.introCardHalf = true;
                this.introCardFull = false;
                setTimeout(() => {this.bioVisible = true}, 800);
                ;
            } else {
                this.introCardHalf = false;
                this.introCardFull = true;
                this.bioVisible = false;
            }
            this.rightArrowHide = !this.rightArrowHide
            this.leftArrowHide= !this.leftArrowHide
            
        }

    },
    computed: {
        intTxtInfo1: function() {
            return this.intTxtAnimData.display1.join('');
        },
        intTxtInfo2: function(){
            return this.intTxtAnimData.display2.join('');
        },
        intTxtName: function(){
            return this.intTxtAnimData.displayName.join('');
        }
        
    }
});

//Initial functions when app is loaded
(function initFunctions() {
    scriptLoad(scripts);
    toggleDisplay(document.querySelector('#vApp'));
    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 10);
})()

