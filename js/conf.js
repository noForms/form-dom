import Config from './Config.js';
const _config = new Config({
    fields: [
        [
            {
                type: 'text',
                fid: '',
                event: {
                    click: event => {
                        console.log(event)
                    },
                },
                attr: {
                    required: true
                }
            }
        ]
    ]
})

export default _config;