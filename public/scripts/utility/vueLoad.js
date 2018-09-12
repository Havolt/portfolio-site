if(typeof Vue === 'undefined') {
    const newVue = document.createElement('script');
    newVue.src="/scripts/utility/vue.js";
    document.body.appendChild(newVue);
}

onload = () => {
    scriptLoad('indexMain.js')
}