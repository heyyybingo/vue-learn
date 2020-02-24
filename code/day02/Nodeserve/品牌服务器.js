//导入http内置模块
const http = require('http')

const url = require('url')
//创建一个http服务器
const server = http.createServer()

var list = [
  { id: 1, name: '奔驰', ctime: new Date() },
  { id: 2, name: '宝马', ctime: new Date() },
  { id: 3, name: '丰田', ctime: new Date() }
]

server.on('request', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")

  // 获取请求路径
  var pathname = url.parse(req.url).pathname;
  var query = url.parse(req.url, true).query;

  if (pathname === '/api/getprodlist') {
    //var scriptStr = 'show()'
    //console.log(query)
    //  var scriptStr = query.callback + '()'
    console.log(list)
    //把标签内容发给客户端，客户端把这个字符串当作js执行
    result = { status: 0, list }
    res.end(JSON.stringify(result))
  } else {
    res.send('404')
  }
})


//指定端口
server.listen(3000, function () {
  console.log('server listen on http://127.0.0.1:3000')
})