const config = {
    server: {
        // host: 'http://127.0.0.1/freeClass'
        // host: 'http://192.168.43.220/freeClass'
        host: 'https://www.starchild.cn:8443/freeClass'
    },
    code: {
        success: '0000',
        fail: '500',
        classMax: '1201',
    },
    role: {
        teacher: '0',
        student: '1'
    }
}

config.server.host = config.server.host;

export default config;