import Config from './Config.js';
const _config = new Config({
    fields: [
        {
            colSize: 10,
            children: [
                {
                    type: 'input',
                    fid: 'name',
                    on: {
                        click: event => {
                            console.log(event)
                        },
                    },
                    props: {
                        required: true
                    }
                },
                {
                    type: 'input',
                    fid: 'name',
                    on: {
                        click: event => {
                            console.log(event)
                        },
                    },
                    props: {
                        required: true
                    }
                }
            ]
        }
    ]
})

export default _config;