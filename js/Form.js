const Form = function(_config, Template){
    this._template = Template;
    this._config = _config;
    this._template.fetchType('button')
    this.handle = new EventTarget();
}

Form.prototype.render = function(_config, _template){
    return (10);
}

export default Form;