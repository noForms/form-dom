import Config from './Config.js';
const _config = new Config({
    fields: [
        {
            colSize: 10,
            children: [
                {
                    type: 'input',
                    fid: 'name',
                    handle: {
                        input: {
                            click: (event) => {
                                console.log(event)
                            },
                            input: (event) => {
                                console.log(event)
                            }
                        },
                        btn: {
                            click: console.log
                        }
                    },
                    props: {
                        required: true
                    }
                }
            ]
        },
        {
            title: "Crédito Impostos",
            fields: [
                {

                }
            ]
        }
    ]
})

export default _config;