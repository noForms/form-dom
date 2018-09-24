const Config = function(configs){
    this.proxyConfig = new Proxy(configs, {});
    this.fields = this.proxyConfig.fields
}

Config.prototype.fetch = function(){
    console.log(this)
}

Config.prototype.fieldsToList = function(_Config = this){
    return this.proxyConfig.fields.reduce((acc, value) => [...acc, ...value],[])
}

Config.prototype.getByFID = function(fid){

}

export default Config