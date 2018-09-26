
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
            links: []
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
    }
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
            }
            else {
                vh.headInfo.links.push(el);
            }
        })

    });
})();
