(function() {
    const fav =  document.createElement('link');
    fav.href = '/imgs/favicon-mf.png';
    fav.rel = 'shortcut icon';
    document.getElementsByTagName('head')[0].appendChild(fav);
})();

function scriptLoad(items) {
    if(typeof items === 'object'){
        console.log(items)
        items.map((el) => {
            const newScr = document.createElement('script');
            newScr.src = "/scripts/" + el;
          
            document.body.appendChild(newScr);
        })
    } else {
        const newScr = document.createElement('script');
        newScr.src = "/scripts/" + items;
        document.body.appendChild(newScr);
    }
}