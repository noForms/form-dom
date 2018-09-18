const Config = function(configs){
    this.proxyConfig = new Proxy(configs, {});
}

Config.prototype.fetch = function(){
    console.log(this)
}

export default Config