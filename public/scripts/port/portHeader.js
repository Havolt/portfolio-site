
const vh = new Vue({
    el: '#vHead',
    data: {
        //Logo Section
        logoName: 'Mark F',
        logoNameFull: 'Mark Fitzpatrick',
        
        //Info Section
        infoOpen: false,
        infoClose: false,
        headInfoHeading: '',
        headInfoParagraph: []
    },
    methods: {
        toggleInfo: function() {
            this.infoOpen = !this.infoOpen;
            this.infoClose = !this.infoOpen;
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
                vh.headInfoHeading = el.name;
                el.description.map((el) => {
                    vh.headInfoParagraph.push(el);
                })
            }
        })

    });
})();
