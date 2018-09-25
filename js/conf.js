import Config from './Config.js';
const _config = new Config({
    fields: [
        {
            colSize: 10,
            children: [
                {
                    type: 'calc',
                    fid: 'name',
                    title: 'Handle',
                    handle: {
                        input: {
                            input: console.log
                        },
                        btn: {
                            click: console.log
                        }
                    },
                    props: {
                        input: {
                            required: true,
                        }
                    },
                    style: {
                        dis: {
                            width: '50px'
                        },
                        btn: {
                            background: '#999',
                            color:'#fff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '3px 20px'
                        }
                    }
                }
            ]
        }
    ]
})

export default _config;