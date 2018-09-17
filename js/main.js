// 'use strict';
import DOM from './dom.js'
import Config from './conf.js'

let dom = new DOM(Config, 'main.template.html')

dom.build().then(self => {
    console.log(self)
})