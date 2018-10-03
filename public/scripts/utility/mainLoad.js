

if(typeof Vue === 'undefined') {
    const newVue = document.createElement('script');
    newVue.src="/scripts/utility/vue.js";
    document.body.appendChild(newVue);
}

onload = () => {
    let checkPort = window.location.pathname.split('').splice(0, 6).join('');
    if(window.location.pathname == '/'){
        scriptLoad('indexMain.js')
    } else if(checkPort == '/port/') {
        const styleS = document.createElement("link");
        styleS.type = "text/css";
        styleS.rel = "stylesheet";
        styleS.href = "/styles/port/portHeader.css";
        document.head.appendChild(styleS);

        let pathName = window.location.pathname.split('').splice(6).join('');
        
        const styleS2 = document.createElement("link");
        styleS2.type = "text/css";
        styleS2.rel = "stylesheet";
        styleS2.href = `/styles/port/${pathName}.css`;
        document.head.appendChild(styleS2);

        scriptLoad([`/port/${pathName}.js`,'/port/portHeader.js'])
    }
}