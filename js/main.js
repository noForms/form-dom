// 'use strict';
import DOM from './Dom.js'
import Config from './conf.js'

let dom = new DOM(Config, 'main.template.html')

dom.build().then(self => {
    dom.append('body')
})