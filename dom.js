const DOM = function (config, template_path) {
    this._config = config;
    this.Template = new this.Template(template_path)
}

DOM.prototype.Template = function (template_path) {
    this.handle = new EventTarget();
    this.fetch(template_path)
        .then(template_response => template_response.text())
        .then(template_html => {
            this.handle.dispatchEvent(new CustomEvent('template-request-end'), {
                template_html
            })
            this._dom = this.parse(template_html);
        }).catch(error => {
            return new Error('Template path is not valid.');
        })
}

DOM.prototype.Template.prototype.parse = function(templateHTML){ // parse html to form dom.
    this.handle.dispatchEvent(new CustomEvent('template-will-parse', {
    }))
    this.selfHTMLDOM = new DOMParser().parseFromString(templateHTML, "text/html");
    this.handle.dispatchEvent(new CustomEvent('template-was-parsed', {
        parsed: true
    }))
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

DOM.prototype.build = () => {
    return ''
}


let dom = new DOM({}, 'main.template.html');

// dom.Template.handle.addEventListener('template-request-end', function(event){
//     console.log(event)
// })