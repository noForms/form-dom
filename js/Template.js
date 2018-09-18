const Template = function (template_path) {
    this.handle = new EventTarget();
    this.template_path = template_path;
}

Template.prototype.parse = function (template_html) { // parse html to form dom.
    this.handle.dispatchEvent(new CustomEvent('template-will-parse', {
    }))
   let dom_parsed =  new DOMParser().parseFromString(template_html, "text/html");
    this.handle.dispatchEvent(new CustomEvent('template-was-parsed', {
        parsed: true
    }))
    return dom_parsed
}

Template.prototype.get = key => { // search inside self dom object
}

Template.prototype.fetch = path => {
    return fetch(path, {
        method: 'GET',
        headers: {
            'Content-Type': 'html/text'
        }
    });
}

Template.prototype.build = function () {
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


export default Template;