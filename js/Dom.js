import Template from './Template.js';

const DOM = function (config, template_path) {
    this._config = config;
    this.Template = new Template(template_path)
    this.Form = null;
    this.Object = {};
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
    let form = _config.fields.reduce((form, row) => {
        let divR = document.createElement('div');
        divR.className = `col-${row.colSize || 24}`;
        divR = (row.children || []).reduce((r, f) => {
            let temp_el = this.Template.fetchType(f.type)
            temp_el.querySelector('[no-title]').innerHTML = f.title
            temp_el = this.props(temp_el, f.props)
            temp_el = this.style(temp_el, f.style)
            temp_el = this.handle(temp_el, f.handle)
            r = this.handle_input(r)
            r.appendChild(temp_el)
            return r 
        }, divR)
        form.appendChild(divR)
        return form
    }, document.createElement('form'))
    return this.handle_input(form)
}

DOM.prototype.handle = function(node, handles){
    // set up events
    for(let targets in handles){
        let target = node.querySelector(`[no-target="${targets}"]`)
        if(!target) return node
        for(let event in handles[targets]){
            target[`on${event}`] = handles[targets][event]
        }
    }
    return node;
}

DOM.prototype.props = function(node, props){
    // for(let node in props) node[p] = props[p]
    for(let targets in props){
        let target = node.querySelector(`[no-target="${targets}"]`)
        if(!target) return node
        for(let pro in props[targets]){
            target[pro] = props[targets][pro]
        }
    }
    return node
}

DOM.prototype.style = function(node, styles){
    for(let targets in styles){
        let target = node.querySelector(`[no-target="${targets}"]`)
        if(!target) return node
        for(let style in styles[targets]){
            target.style[style] = styles[targets][style]
        }
    }
    return node
}

DOM.prototype.handle_input = function(form){
    form.oninput = event => {
        
    }
    return form
}

export default DOM;