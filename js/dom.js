const DOM = function (config, template_path) {
    this._config = config;
    this.Template = new this.Template(template_path)
}

DOM.prototype.Template = function (template_path) {
    this.handle = new EventTarget();
    this.template_path = template_path;
}

DOM.prototype.Template.prototype.parse = function (templateHTML) { // parse html to form dom.
    this.handle.dispatchEvent(new CustomEvent('template-will-parse', {
    }))
   let dom_parsed =  new DOMParser().parseFromString(templateHTML, "text/html");
    this.handle.dispatchEvent(new CustomEvent('template-was-parsed', {
        parsed: true
    }))
    return dom_parsed
}

DOM.prototype.Template.prototype.get = key => { // search inside self dom object

}

DOM.prototype.Template.prototype.fetch = path => {
    return fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'html/text'
        }
    });
}
DOM.prototype.Template.prototype.build = function () {
    return this.fetch(this.template_path)
        .then(template_response => template_response.text())
        .then(template_html => {
            this.document = this.parse(template_html);
            this.handle.dispatchEvent(new CustomEvent('template-request-end'))
            return new Promise((resolve) => {
                resolve(this)
            })
        })
}

DOM.prototype.build = function () {
    return new Promise((resolve) => {
        this.Template.build().then(() => resolve(this))
    })
}

DOM.prototype.appendInside = function(refElement){
    let queryElementRef = document.querySelector(refElement)
    if(!queryElementRef) return false;
    // 
    // build form element here and append inside element
    // queryElementRef.appendChild()
}


export default DOM;