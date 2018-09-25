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

Template.prototype.fetchType = function(node_type){
    let search_template = this.document.querySelector(`[no-template="${node_type}"]`);
    if(!search_template) 
        throw new Error('node.type not exist in template file.');

    return search_template.cloneNode(true);
}



export default Template;