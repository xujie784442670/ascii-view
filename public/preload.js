window.config = require('./config')
window.onerror = function(e){
    utools.showNotification(JSON.stringify(e))
}
