// export default {    /*这是新的ES6的写法，现在还不支持*/
module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }
}