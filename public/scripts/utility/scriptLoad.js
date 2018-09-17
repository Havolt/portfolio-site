function scriptLoad(items) {
    if(typeof items === 'object'){
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