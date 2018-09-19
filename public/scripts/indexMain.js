
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

        //Portfolio Section
        portFadeIn: false, 
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
            
            {name: 'To Do', img: '/imgs/port-td.jpg',
            link: '/port/to-do'},
            {name: 'Tetris', img: '/imgs/port-t.jpg',
            link: '/port/tetris'},
            {name: 'No Context Creepy', img: '/imgs/port-ncc.jpg',
            link: '/port/no-context-creepy'},
            {name: 'Wikipedia Search', img: '/imgs/port-wa.jpg',
            link: '/port/wikipedia-search'},
            {name: 'Offline Hacking', img: '/imgs/port-oh.jpg',  
            link: '/port/offline-hacking'},
            {name: 'Checkers', img: '/imgs/port-d.jpg',
            link: '/port/checkers'},
            {name: 'Calculator', img: '/imgs/port-c.jpg',
            link: '/port/calculator'},
            {name: 'Previous Portfolio', img: '/imgs/port-p.jpg',
            link: '/port/previous-portfolio'}   
        ],
        menuCurrPos : 0,
        contactInfo: [
            {
                icon : 'far fa-envelope',
                text : 'markfitz815@gmail.com',
                link : 'mailto:markfitz815@gmail.com'
            },
            {
                icon : 'fas fa-phone',
                text : '(00353) 87 104 2845',
                link : 'tel:00353871042845'
            }
        ]
        
        
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
                vueApp.portFadeIn = false;
                vueApp.contactFadeIn = false;
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
            vueApp.contactFadeIn = false;
            vueApp.portFadeIn = true;

        },
        contactFunc: (pos) => {
            if(vueApp.bioVisible) {
                vueApp.showBio();
            }
            vueApp.toggleIntro(true, false);
            vueApp.intLinksUnder(pos, vueApp.introLinks);
            vueApp.contactBool = true;
            vueApp.portfolioBool = false;
            vueApp.portFadeIn = false;
            vueApp.contactFadeIn = true;
 
        },
        changeMenuPos: (pos) => {
            vueApp.menuCurrPos = pos*2;
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
        portMenu: function() {
            const newOb = {};
            newOb.items = () => {
                const newArr = [];
                for(let i = 0; i < this.portItemsAll.length/2; i++){
                    const newObj = {};
                    if(i == this.menuCurrPos/2) {
                        newObj.activated = true;
                    } else {
                        newObj.activated = false;
                    }
                    newObj.val = i;
                    newArr.push(newObj)
                }
                return newArr;
            };
            return newOb;
        },
        portItemsCurr: function(){
            let itemArr = [];
            for(let i = this.menuCurrPos; i < this.menuCurrPos + 2; i++){
                console.log(i)
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

