
const vh = new Vue({
    el: '#vHead',
    data: {
        //Logo Section
        logoName: 'Mark F',
        logoNameFull: 'Mark Fitzpatrick',
        
        //Info Section
        infoOpen: false,
        infoClose: false,
        headInfo: {
            heading: '',
            icon: '',
            paragraph: [],
            links: [],
            github: ''
        },

        //Drop Down Section
        dropDownBool: false
    },
    methods: {
        toggleInfo: function() {
            this.infoOpen = !this.infoOpen;
            this.infoClose = !this.infoOpen;
        },
        toggleDrop: function() {
            this.dropDownBool = !this.dropDownBool;
        }
    },
    template: `
    <div> 
        <div class="headContain">
                    <div class="headLogo">
                        <a href="/">
                            <div class="headPic">
                                <img src="/imgs/head-logo.png" alt="">
                            </div>
                            <div class="headText headTextShort">{{logoName}}</div>
                            <div class="headText headTextLong">{{logoNameFull}}</div>
                        </a>
                    </div>
                
                <div class="headInfo">
                    <div @click="toggleInfo" v-if="!infoOpen" class="headInfoIcon fa fa-book"></div>
                    <div @click="toggleInfo" v-else class="headInfoIcon headInfoIconOpen fa fa-book-open"></div>
                </div>

                <div class="headList">
                    <!-- Widescreen drop down menu -->
                    <div @click="toggleDrop" v-bind:class="{headListMainWithDrop: dropDownBool}" class="headListMain">
                        <div class="headListMainTxt">
                            <div v-bind:class="headInfo.icon" class="headListMainTxtIcon"></div>
                            <div class="headListMainTxtText">{{headInfo.heading}}</div>
                            <div class="headListMainTxtArrow fas fa-sort-down"></div>
                        </div>
                        <div v-bind:class="{headDisplayNone: !dropDownBool}" class="headListDrop">
                            <div class="headListDropItem" v-for="item in headInfo.links">
                                <a v-bind:href="item.route">
                                    <div v-bind:class="item.icon" class="headListDropIcon"></div>
                                    <div class="headListDropText">{{item.name}}</div>
                                </a> 
                            </div>
                        </div>
                    </div>
                    <!--Mobile screen drop down menu-->
                    <div @click="toggleDrop" v-bind:class="{headListMainWithDrop: dropDownBool}" class="headListMainSmall">
                            <div class="headListMainSmallTxt">
                                    <div v-bind:class="headInfo.icon" class="headListMainSmallTxtIcon"></div>
                                    <div class="headListMainSmallArrow fas fa-sort-down"></div>
                            </div>
                            <div v-bind:class="{headDisplayNone: !dropDownBool}" class="headListDrop">
                                    <div class="headListDropItem" v-for="item in headInfo.links">
                                        <a v-bind:href="item.route">
                                            <div v-bind:class="item.icon" class="headListDropIcon"></div>
                                            <div class="headListDropText">{{item.name}}</div>
                                        </a> 
                                    </div>
                            </div>
                            <div v-bind:class="{headDisplayNone: !dropDownBool}" class="headListSmallDropCover"></div>
                    </div>
                </div>
            </div>
            
            <div v-bind:class="{headInfoOpen: infoOpen, headInfoClose: infoClose}" class="headInfoSec">
                <div class="headInfoHeading">{{headInfo.heading}}</div>
                <div v-for="item in headInfo.paragraph" class="headInfoPara">{{item}}</div>
                <div class="headInfoPara headInfoParaLink"><a v-bind:href="headInfo.github" target="_blank">You can find the code for this project here.</a></div>
                <div @click="toggleInfo" class="headInfoArrow fa fa-angle-up"></div>
            </div>
        </div>
    `
});


(function initSettings(){

    let pathName = window.location.pathname.split('').splice(6).join('');

    fetch("/scripts/port/portItemsInfo.json")
    .then(response => response.json())
    .then((json) => {
        json.items.map((el) => {
            if(el.route == pathName) {
                console.log('yes!')
                vh.headInfo.heading = el.name;
                vh.headInfo.icon = el.icon;
                el.description.map((el) => {
                    vh.headInfo.paragraph.push(el);
                })
                vh.headInfo.github = el.github;
            }
            else {
                vh.headInfo.links.push(el);
            }
        })

    });
})();
