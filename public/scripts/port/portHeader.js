
const vh = new Vue({
    el: '#vHead',
    data: {
        //Logo Section
        logoName: 'Mark F',
        logoNameFull: 'Mark Fitzpatrick',
        
        //Info Section
        infoOpen: false
    },
    methods: {
        toggleInfo: function() {
            this.infoOpen = !this.infoOpen;
        }
    }
})