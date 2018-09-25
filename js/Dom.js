import Template from './Template.js';

const DOM = function (config, template_path) {
    this._config = config;
    console.log(this._config)
    this.Template = new Template(template_path)
    this.Form = null;
}

DOM.prototype.build = function () {
    return new Promise((resolve) => {
        this.Template.build().then(() => {
            resolve(this)
        })
    })
}

DOM.prototype.append = function(ref_element){
    let query_element_ref = document.querySelector(ref_element)
    if(!query_element_ref) throw new Error(`${ref_element} is not valid!`);
    // build form element here and append inside element
    query_element_ref.appendChild(this.renderForm())
    // console.log(this.renderForm())
}

DOM.prototype.renderForm = function(_config = this._config){
    return _config.fields.reduce((form, row) => {
        let divR = document.createElement('div');
        divR.className = `col-${row.colSize || 24}`;
        divR = (row.children || []).reduce((r, f) => {
            let temp_el = this.Template.fetchType(f.type)
            temp_el = this.Template.putProps(temp_el, f.props)
            temp_el = this.handle(temp_el, f.handle)
            r.appendChild(temp_el)
            return r 
        }, divR)
        form.appendChild(divR)
        return form
    }, document.createElement('form'))
}

DOM.prototype.handle = function(node, handles){
    // set up events
    for(let targets in handles){
        let target = node.querySelector(`[no-handle="${targets}"]`)
        console.dir(target)
        for(let event in handles[targets]){
            target[`on${event}`] = handles[targets][event]
        }
    }
    return node;
}


export default DOM;