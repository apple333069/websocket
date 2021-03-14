var app = require("http").createServer();
var io = require("socket.io")(app);
app.listen(4000);
var clientCount = 0; //用戶數量
io.on("connection",(socket)=>{
  // 功能一：新用戶加入 廣播
  clientCount++;
  var nickname = "用戶 "+clientCount;
  io.emit("enter",nickname+" 加入聊天室!");
  // 功能二：將用戶聊天信息 廣播給所有人
  socket.on("message",(data)=>{
    io.emit("list",nickname+" : "+data);
  })
  // 功能三：當用戶退出時 廣播
  socket.on("disconnect",(data)=>{
    io.emit("leave",nickname+" 離開了...")
  })
})