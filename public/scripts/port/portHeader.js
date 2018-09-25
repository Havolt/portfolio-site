
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
        headInfoParagraph: ''
    },
    methods: {
        toggleInfo: function() {
            this.infoOpen = !this.infoOpen;
            this.infoClose = !this.infoOpen;
        }
    }
});


(function initSettings(){
    vh.headInfoHeading = headInfoData.title;
    vh.headInfoParagraph = headInfoData.paragraph;
})();
