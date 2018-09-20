
//Place scripts needed to load after Vue here
const scripts = ['introSec.js'];

//Toggles if element has the displayNone class
function toggleDisplay(el) {
    el.classList.toggle('displayNone');
}

const vueApp = new Vue({
    el: '#vApp',
    data: {
        scrollAllow : false,
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
        portFadeOut: false,
        portFadeOutRev: false,
        portImgAnimate: false,
        portItemClass: {
            fadeOutLeft: false,
            fadeInLeft: false,
            fadeOutRight: false,
            fadeInRight: false
        },
        portTouchList: [],
        checkingSwipe: false,

        //Contact Section
        contactFadeIn: false, 
        contactFadeOut: false,
        contactFadeInRev: false,

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
                link : 'mailto:markfitz815@gmail.com',
                target: '_self'
            },
            {
                icon : 'fas fa-phone',
                text : '(00353) 87 104 2845',
                link : 'tel:00353871042845',
                target: '_self'
                
            },
            {
                icon: 'fab fa-github',
                text: 'Github',
                link: 'https://github.com/Havolt',
                target: '_blank'
            },
            {
                icon: 'fab fa-linkedin',
                text: 'LinkedIn',
                link: 'https://www.linkedin.com/in/mark-fitzpatrick-491419100/',
                target: '_blank'
            },
            {
                icon: 'fab fa-twitter',
                text: 'Twitter',
                link: 'https://twitter.com/jetsetfitz',
                target: '_blank'
            }
        ],
        commentWarn: false,
        emailWarn: false,
        nameWarn: false,
        formShake: false,
        formValues: {
            name: '',
            email: '',
            comment: ''
        },
        touchList: [],
        touchAllow: true
        
        
    },
    methods: {
        scrollHandler: function(e, touchInp) {
            if(this.scrollAllow) {
                if(e.wheelDeltaY < 0 || touchInp == 1) {
                    if(!this.portfolioBool && !this.contactBool)  {
                        this.portfolioFunc(0);
                    }
                    else if(!this.contactBool && this.portfolioBool) {
                        this.contactFunc(1)
                    }
                    else {return}
                } else if(e.wheelDeltaY > 0 || touchInp == -1)  {
                    if(!this.contactBool && this.portfolioBool ) {
                        this.toggleIntro(false, true);
                    } else if(this.contactBool && !this.portfolioBool) {
                        this.portfolioFunc(0);
                    } else {return}
                } else {return }
                this.scrollAllow = false;
                setTimeout(() => {vueApp.scrollAllow = true;}, 1500)
            }
        },
        touchHandler: function(e) {
            if(this.touchAllow){
                if(this.touchList.length < 8) {
                    this.touchList.push(e.touches[0].clientY);
                }
                else {
                    this.touchAllow = false;
                    this.changeMenuPosTouchCheck(this.touchList, 'general');
                }
                if(this.touchList.length == 1) {
                    setTimeout(()=>{vueApp.touchList = []; vueApp.touchAllow = true;},400)
                }
            }
            
        },
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
                vueApp.contactFadeOut = true;
                vueApp.portFadeOut = true;
                setTimeout(() => {
                    vueApp.portfolioBool = false;
                    vueApp.contactBool = false;
                    vueApp.portFadeIn = false;
                    vueApp.contactFadeIn = false;
                    vueApp.contactFadeInRev = false;
                    vueApp.contactFadeOut = false;
                    vueApp.portFadeOut = false;
                    vueApp.portFadeOutRev = false;
                    vueApp.intTxtAnimate(vueApp.intTxtAnimData);
                    vueApp.intLinksUnder(99, vueApp.introLinks);
                }, 500)
                
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
            vueApp.contactFadeOut = true;
            vueApp.portFadeOut = false;
            vueApp.portFadeOutRev = false;
            vueApp.portItemClass.fadeOutLeft = false,
            vueApp.portItemClass.fadeInLeft = false,
            vueApp.portItemClass.fadeOutRight = false,
            vueApp.portItemClass.fadeInRight = false
            setTimeout(() => {
                vueApp.contactBool = false;
                vueApp.portfolioBool = true;
                vueApp.contactFadeIn = false;
                vueApp.contactFadeInRev = false;
                vueApp.portFadeIn = true;
            }, 600)
            

        },
        submitHandler: function(e) {
            const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const nameRx = /.{3,}/g
            const commentRx = /.{10,}/g

            let nameCheck = nameRx.test(String(this.formValues.name).toLowerCase());
            let emailCheck = emailRx.test(String(this.formValues.email).toLowerCase());
            let commentCheck = commentRx.test(String(this.formValues.comment).toLowerCase());

            nameCheck ? this.nameWarn = false : this.nameWarn = true;
            emailCheck ? this.emailWarn = false : this.emailWarn = true;
            commentCheck ? this.commentWarn = false : this.commentWarn = true;
            if(!nameCheck || !emailCheck || !commentCheck) { 
                return false;
            }
            

        },
        contactFunc: (pos) => {
            if(vueApp.bioVisible) {
                vueApp.showBio();
            }
            vueApp.toggleIntro(true, false);
            vueApp.intLinksUnder(pos, vueApp.introLinks);
            if(!vueApp.portfolioBool) {
                vueApp.portFadeOut = true;
            } else {
                vueApp.portFadeOutRev = true;
            }
            vueApp.contactFadeOut = false;
            setTimeout(() => {
                if(vueApp.portfolioBool) {
                    vueApp.contactFadeInRev = true;
                } else {
                    vueApp.contactFadeIn = true;
                }
                vueApp.portfolioBool = false;
                vueApp.contactBool = true;
                vueApp.portFadeIn = false;
                
            }, 600)
 
        },
        changeMenuPosTouch: (e) => {
            
            vueApp.portTouchList.push(e.targetTouches[0].clientX)
            if(vueApp.portTouchList.length > 7) {
                vueApp.changeMenuPosTouchCheck(vueApp.portTouchList, 'menu');
                vueApp.checkingSwipe = true;
            } else if(vueApp.portTouchList.length == 1) {
                setTimeout(() => {
                    vueApp.portTouchList = [];
                }, 500)
            }
        },
        changeMenuPosTouchCheck: (arr, context) => {
            let prevPos;
            let direction;
            let fullSwipe = true;
            let counter = 0;

            arr.map((el) => {
                if(prevPos == undefined) {
                    prevPos = el;
                    counter++;
                } else if (counter == 1) {
                    if(el > prevPos) { direction = -1;
                    } else { direction = 1;}
                    prevPos = el;
                    counter++;
                } else {
                    if(direction == 1) {
                        if(el > prevPos) { fullSwipe = false;}
                    }
                    else if(direction == -1) {
                        if(el < prevPos) {fullSwipe = false;}
                    }
                } 
            })

            if(fullSwipe) {
                if((direction == 1) && ((vueApp.menuCurrPos*2) < vueApp.portItemsAll.length+1) && context == 'menu') {
                    vueApp.changeMenuPos((vueApp.menuCurrPos/2)+1);
                }
                else if((direction == -1) && (vueApp.menuCurrPos > 0) && context == 'menu') {
                    vueApp.changeMenuPos((vueApp.menuCurrPos/2)-1);
                }
                else if(direction == 1 && context == 'general') {
                    vueApp.scrollHandler('', 1);
                }
                else if(direction == -1 && context == 'general') {
                    vueApp.scrollHandler('', -1);
                }
            }
            if(context == 'general') {
                vueApp.portTouchList = [];
                vueApp.checkingSwipe = false;
            }
        },
        changeMenuPos: (pos) => {

            vueApp.portItemClass.fadeOutLeft = false;
            vueApp.portItemClass.fadeOutRight = false;
            vueApp.portItemClass.fadeInLeft = false;
            vueApp.portItemClass.fadeInRight = false;

            if((pos*2) > vueApp.menuCurrPos) {
                vueApp.portItemClass.fadeOutLeft = true;
            } else {
                vueApp.portItemClass.fadeOutRight = true;
            }
            setTimeout(() => {
                vueApp.menuCurrPos = pos * 2;
            },400);
            setTimeout(() => {
                if(vueApp.portItemClass.fadeOutLeft == true) {
                    vueApp.portItemClass.fadeInRight = true;
                } else {
                    vueApp.portItemClass.fadeInLeft = true;
                }
            }, 450)

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
    setTimeout(() => {vueApp.scrollAllow = true;}, 1500);
})()

