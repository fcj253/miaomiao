module.exports =  {
    devServer : {
        host: '0.0.0.0',
        public:'192.168.43.123:8080',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck:true,
        open: true, // 配置自动启动浏览器
        proxy : {
            '/ajax' : {
                target : 'https://m.maoyan.com',
                changeOrigin : true
            }
        }
    }
}