import Form from './form.js';
import Template from './Template.js';

const DOM = function (config, template_path) {
    this._config = config;
    this.Template = new Template(template_path)
    this.Form = null;
}

DOM.prototype.build = function () {
    return new Promise((resolve) => {
        this.Template.build().then(() => {
            this.Form = new Form(this._config, this.Template, this.Template.document)
            resolve(this)
        })
    })
}

DOM.prototype.appendInside = function(ref_element){
    let query_element_ref = document.fetchTemplate(ref_element)
    if(!query_element_ref) throw new Error(`${ref_element} is not valid!`);
    // 
    // build form element here and append inside element
    // queryElementRef.appendChild()
}

Form.prototype.fetchTemplate = function(type_template){
    let search_template = this._template.document.querySelector(`[no-template="${type_template}"]`);
    if(!search_template) 
        throw new Error('type_template not exist in template file.');

    return search_template.cloneNode(true);
}


export default DOM;