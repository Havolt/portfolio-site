
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
        introLinks: [{
            text: 'Portfolio',
            place: 0,
            classes: {
                intLinkUnderline: false
            },
            func: (pos) => {
                return vueApp.portfolioFunc(pos);
            }
        }, {
            text: 'Contact',
            place: 1,
            classes: {
                intLinkUnderline: false
            },
            func: (pos) => {
                this.bool = true;
                return vueApp.contactFunc(pos);
            }
        }],
        linksVisible: false,
        introCardHalf: false,
        introCardFull: true,
        rightArrowHide: false,
        leftArrowHide: true,
        arrowAllowClick: true,
        portImgAnimate: false,

        //Minimize Section
        downArrowHide: true,
        minIntroImg: false,
        minIntroArrowCon: false,
        minIntroImgCon : false,
        mIntLinks: false,

        //maximize Section
        maxIntroImg: false,
        maxIntroArrowCon: false,
        maxIntroImgCon : false,
        maxIntLinks: false,

        //Links Section
        portfolioBool: false,
        contactBool: false,
        
        //Bio Section
        bioVisible: false,
        bioVisibleSk: false,
        bioVisibleRev: true,
        bioVisibleRevSk: true,
        aboutTitle: 'About Me',
        aboutPara: ' I hold a bachelor\'s degree in multimedia and have a passion for front-end web development but in the past few years I\'ve been delving into back-end with Node.js. I\'ve always had a strong interest in programming since I started delving into the code of The Elder Scrolls III: Morrowind. When I\'m not making websites I can be found running, reading or making video games.',
        skillList: [
            {
                icon: 'fas fa-mobile',
                desc: 'Focus on Responsive Design'
            },
            {
                icon: 'fas fa-palette',
                desc: 'Beautifully Designed Sites'
            },
            {
                icon: 'fas fa-code',
                desc: 'Strong Programming Skills'
            }
        ],
        portItemsAll: [
            {name: 'Offline Hacking', img: '/imgs/port-oh.jpg',  
            link: ''},
            {name: 'To Do', img: '/imgs/port-td.jpg',
            link: ''},
            {name: 'Tetris', img: '/imgs/port-td.jpg',
            link: ''},
            {name: 'No Context Creepy', img: '/imgs/port-t.jpg',
            link: ''}
        ],
        portItemsPos: 0
        
        
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
                this.linksVisible = true;
                return;
            }
            setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 25)
        },
        //toggle display of bio section
        showBio: function() {
            if(this.arrowAllowClick) {
                this.arrowAllowClick = false;
                if(!this.rightArrowHide){
                    this.introCardHalf = true;
                    this.introCardFull = false;
                    this.bioVisibleRev = false;
                    this.bioVisibleRevSk = false;
                    setTimeout(() => {this.bioVisible = true}, 600);
                    setTimeout(() => {
                        this.bioVisibleSk = true;
                        this.arrowAllowClick = true;
                    }, 1000);
                    ;
                } else {
                    setTimeout(() => {
                        this.bioVisible = false;
                        this.introCardHalf = false;
                        this.introCardFull = true;
                        this.bioVisibleSk = false;
                        this.arrowAllowClick = true;
                    }, 600);
                    setTimeout(() => {this.bioVisibleRev = true}, 300);
                    this.bioVisibleRevSk = true;
                }
                this.rightArrowHide = !this.rightArrowHide
                this.leftArrowHide= !this.leftArrowHide
            }
        },
        removeIntTxt: (v) => {
            let cont = false;
            if(v.display1.length > 0 && v.display2.length == v.display1.length) {
                v.display1.pop();
                cont = true;
            }
            if(v.display2.length > 0) {
                v.display2.pop();
                cont = true;
            }
            if(cont == true) {
                setTimeout(() => {vueApp.removeIntTxt(v)}, 15);
            }
        },
        toggleIntro: (min, max) => {
            
            vueApp.minIntroImgCon = min;
            vueApp.minIntroImg = min;
            vueApp.rightArrowHide = min;
            vueApp.leftArrowHide = true;
            vueApp.downArrowHide = max;
            vueApp.minIntroArrowCon = min;
            vueApp.mIntLinks = min;

            if(max) {
                vueApp.portfolioBool = false;
                vueApp.contactBool = false;
                vueApp.intTxtAnimate(vueApp.intTxtAnimData);
                vueApp.intLinksUnder(99, vueApp.introLinks);
            } else {
                vueApp.removeIntTxt(vueApp.intTxtAnimData);
            }

            vueApp.maxIntroImgCon = max;
            vueApp.maxIntroImg = max;
            vueApp.maxIntroArrowCon = max;
            vueApp.maxIntLinks = max;
            
        },
        intLinksUnder: (pos, arr) => {
            for(let i = 0; i < arr.length; i++) {
                if(i == pos) {
                    arr[i].classes.intLinkUnderline = true;
                } else {
                    arr[i].classes.intLinkUnderline = false;
                }
            }
        },
        portfolioFunc: (pos) => {
            if(vueApp.bioVisible) {
                vueApp.showBio();
            }
            vueApp.toggleIntro(true, false);
            vueApp.intLinksUnder(pos, vueApp.introLinks);
            vueApp.portfolioBool = true;
            vueApp.contactBool = false;
           


        },
        contactFunc: (pos) => {
            if(vueApp.bioVisible) {
                vueApp.showBio();
            }
            vueApp.toggleIntro(true, false);
            vueApp.intLinksUnder(pos, vueApp.introLinks);
            vueApp.contactBool = true;
            vueApp.portfolioBool = false;
 
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
        },
        portItemsCurr: function(){
            let itemArr = [];
            for(let i = this.portItemsPos; i < this.portItemsPos + 2; i++){
                itemArr.push(this.portItemsAll[i]);
            }
            return itemArr;
        }

        
    }
});

//Initial functions when app is loaded
(function initFunctions() {
    scriptLoad(scripts);
    toggleDisplay(document.querySelector('#vApp'));
    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 10);
})()

