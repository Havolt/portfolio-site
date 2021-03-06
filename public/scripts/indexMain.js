//Place scripts needed to load after Vue here


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
        rightArrowHide: true,
        leftArrowHide: true,
        arrowAllowClick: true,
        introImgConSmall : false,
        introArrowSmall : false,
        introLinkSmall: false,
        boldNameSmall: false,
        removingLetters: false,
        addingLetters: false,
        introImgConSmallMax: false,

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
        aboutPara: [ `I have been programming for many years now with projects done for major companies such as Walmart, American Express, Renault, SquareSpace, Deutsche Bank and many more. I have a strong passion for front-end web development and creating fun web games.`,
        `Most of my programming time is spent with JavaScript where I've a great knowledge of back-end work with Node and on the front-end have a lot of experience with multiple frameworks such as Vue. `,
        `When I\'m not making websites I can be found running, reading or sipping some green tea.`],
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
            link: '/port/nc-creepy'},
            {name: 'Wikipedia Search', img: '/imgs/port-wa.jpg',
            link: '/port/wikipedia-search'},
            {name: 'Offline Hacker', img: '/imgs/port-oh.jpg',  
            link: '/port/offline-hacker'},
            {name: 'Checkers', img: '/imgs/port-d.jpg',
            link: '/port/checkers'},
            {name: 'Calculator', img: '/imgs/port-c.jpg',
            link: '/port/calculator'},
            {name: 'Previous Portfolio', img: '/imgs/port-p.jpg',
            link: '/port/prev-portfolio'}   
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
                isIcon: 'contactIconSmall',
                link: 'https://github.com/Havolt',
                target: '_blank'
            },
            {
                icon: 'fab fa-linkedin',
                text: 'LinkedIn',
                isIcon: 'contactIconSmall',
                link: 'https://www.linkedin.com/in/mark-fitzpatrick-491419100/',
                target: '_blank'
            },
            {
                icon: 'fab fa-twitter',
                text: 'Twitter',
                isIcon: 'contactIconSmall',
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
        touchAllow: true,
        touchCheckList: [],
        checkGen: false,
        checkPort: false,
        buttonDisabled: false,
        contactComplete: false
    },
    methods: {
        preLoadPortImages: function() {
            this.portItemsAll.map((el) => {
                const imgLoad = new Image();
                imgLoad.classList.add('displayNone');
                imgLoad.src = el.img;
                document.querySelector('.hImg').appendChild(imgLoad)
            })
            document.querySelector('#vApp').removeChild(document.querySelector('.hImg'));
        },
        scrollHandler: function(e, touchInp) {
            if(this.scrollAllow && (window.innerHeight > document.querySelector('.siteSec').offsetHeight)) {
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
        intTxtAnimate: function(v) {
            
            if(!vueApp.removingLetters){
                vueApp.addingLetters = true;
                if(v.display1.length !== v.text1.length) {
                    v.display1.push(v.text1[v.display1.length]);
                } else if(v.displayName.length !== v.name.length) {
                    v.displayName.push(v.name[v.displayName.length]);
                } else if(v.display2.length !== v.text2.length) {
                    v.display2.push(v.text2[v.display2.length]);
                }else {
                    this.linksVisible = true;
                    vueApp.addingLetters = false;
                    return;
                }
                setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 25)
            }
            else {
                setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 25)
            }
        },
        //toggle display of bio section
        showBio: function(fromMinArrow, fromMaxArrow) {
            //When expanding arrow is pressed
            if(this.arrowAllowClick) {
                this.arrowAllowClick = false;
                
                if(!this.rightArrowHide){
                    vueApp.removeIntTxt(vueApp.intTxtAnimData);
                    this.boldNameSmall = true;
                    this.introImgConSmall = true;
                    this.introImgConSmallMax = false;
                    this.introArrowSmall = true;
                    this.introLinkSmall = true;
                    this.introCardHalf = true;
                    this.introCardFull = false;
                    this.bioVisibleRev = false;
                    this.bioVisibleRevSk = false;
                    setTimeout(() => {this.bioVisible = true}, 600);
                    setTimeout(() => {
                        this.bioVisibleSk = true;
                        this.arrowAllowClick = true;
                    }, 1000);
                    
                } 
                //When retracting bio arrow pressed
                else {
                    
                    setTimeout(() => {
                        if(fromMinArrow) {
                            vueApp.intTxtAnimate(vueApp.intTxtAnimData)
                        }
                        this.boldNameSmall = false;
                        this.introImgConSmall = false;
                        this.introArrowSmall = false;
                        this.introLinkSmall = false;
                        this.bioVisible = false;
                        this.introCardHalf = false;
                        this.introCardFull = true;
                        this.bioVisibleSk = false;
                        this.arrowAllowClick = true;
                        if(fromMinArrow) {
                            this.introImgConSmallMax = true;
                        }else {
                            this.introImgConSmallMax = false;
                        }
                    }, 600);
                    setTimeout(() => {this.bioVisibleRev = true}, 300);
                    this.bioVisibleRevSk = true;
                }
                this.rightArrowHide = !this.rightArrowHide
                this.leftArrowHide= !this.leftArrowHide
            }
        },
        removeIntTxt: (v) => {
            
            
            if(!vueApp.addingLetters) {
                vueApp.removingLetters = true;
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
                else {
                    vueApp.removingLetters = false;
                }
            }
            else {
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
            vueApp.introImgConSmallMax = false;
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
            else {
                vueApp.buttonDisabled = true;
                
                fetch('/form', {
                    method: "POST", 
                    mode: "cors", 
                    cache: "no-cache",
                    credentials: "same-origin", 
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    redirect: "follow", 
                    referrer: "no-referrer", 
                    body: JSON.stringify({
                        name: this.formValues.name,
                        email: this.formValues.email,
                        comment: this.formValues.comment
                    }), 
                })
                .then((res) => {
                    if(res.status == 200){
                        vueApp.contactComplete = true;
                        setTimeout(() => {
                            vueApp.formValues.name = '';
                            vueApp.formValues.email = '';
                            vueApp.formValues.comment = '';
                        },400)
                    }
                })
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
            vueApp.introImgConSmallMax = false;
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
        touchHandler: function(e) {
            if(!vueApp.checkGen){
                if(this.touchList.length < 8) {
                    this.touchList.push(e.touches[0].clientY);
                }
                else {
                        vueApp.touchCheckList.push({arr: vueApp.touchList, ctx: 'general'});
                        vueApp.checkGen = true
                        if(vueApp.touchCheckList.length == 1){  
                            setTimeout(() => {
                                vueApp.touchSort();
                            },50);
                        }
                }
                if(this.touchList.length == 1) {
                    setTimeout(()=>{
                        vueApp.checkGen = false;
                        vueApp.checkPort = false;
                        vueApp.touchCheckList = [];
                        vueApp.touchList = []
                        vueApp.portTouchList = [];
                    },400)
                }
            }
            
        },
        changeMenuPosTouch: (e) => {
            if(!vueApp.checkPort) {
                vueApp.portTouchList.push(e.targetTouches[0].clientX)
                if(vueApp.portTouchList.length > 8) {
                    vueApp.touchCheckList.push({arr: vueApp.portTouchList, ctx: 'menu'});
                    vueApp.checkPort = true
                    if(vueApp.touchCheckList.length == 1){  
                        setTimeout(() => {
                            vueApp.touchSort();
                        },50);
                    }
                }
            } else if(vueApp.portTouchList.length == 1) {
                setTimeout(() => {
                    vueApp.checkGen = false;
                    vueApp.checkPort = false;
                    vueApp.touchCheckList = [];
                    vueApp.touchList = []
                    vueApp.portTouchList = [];
                }, 400)
            }
        },
        touchSort: function() {
            if(vueApp.touchCheckList.length == 1) {
                vueApp.touchCheck(vueApp.touchCheckList[0].arr, vueApp.touchCheckList[0].ctx);
            } 
            else {
                let sizeArr = [];
                vueApp.touchCheckList.map((el) => {
                    let c;
                    if(el.arr[0] < el.arr[el.arr.length-1]) {
                        c = el.arr[el.arr.length-1] - el.arr[0];
                    } else {
                        c = el.arr[0] - el.arr[el.arr.length-1];
                    }
                    sizeArr.push(c);
                })
                if(sizeArr[0] > sizeArr[1]) {
                    vueApp.touchCheck(vueApp.touchCheckList[0].arr, vueApp.touchCheckList[0].ctx);
                }else {
                    vueApp.touchCheck(vueApp.touchCheckList[1].arr, vueApp.touchCheckList[1].ctx);
                }
            }

           
        },
        touchCheck: (arr, context) => {
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

            vueApp.checkGen = false;
            vueApp.checkPort = false;
            vueApp.touchCheckList = [];
            vueApp.touchList = []
            vueApp.portTouchList = [];
            
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

function siteReady() {
    toggleDisplay(document.querySelector('#vApp'));
    setTimeout(() => {vueApp.intTxtAnimate(vueApp.intTxtAnimData)}, 10);
    setTimeout(() => {vueApp.rightArrowHide = false;}, 300);
    setTimeout(() => {vueApp.scrollAllow = true;}, 1500);
}

//Initial functions when app is loaded
(function initFunctions() {
    vueApp.preLoadPortImages()
    document.querySelector('.introImg').addEventListener('load', () =>{
        document.querySelector('#loadApp').classList.add('displayNone');
        setTimeout(() => {
            siteReady()
        }, 220);
    })
    
})()

