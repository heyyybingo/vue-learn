//导入http内置模块
const http = require('http')

const urlModule = require('url')
//创建一个http服务器
const server = http.createServer()


server.on('request', function (req, res) {
  const { pathname: url, query } = urlModule.parse(req.url, true)
  //const url = req.url
  console.log(url)
  if (url === '/getscript') {
    //var scriptStr = 'show()'
    console.log(query)
    var scriptStr = query.callback + '()'
    console.log(scriptStr)
    //把标签内容发给客户端，客户端把这个字符串当作js执行
    res.end(scriptStr)
  } else {
    res.send('404')
  }
})


//指定端口
server.listen(3000, function () {
  console.log('server listen on http://127.0.0.1:3000')
})