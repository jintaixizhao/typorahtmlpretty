const fs = require("fs")
const path = require('path')
const dirRoot = path.resolve(__dirname, '..')

let fileName = process.argv[2] || "test.html"

fs.readFile(dirRoot +"/file/"+ fileName,"utf8",function(err,data){
	if(err){
		console.log(err)
	}else{
		data=data.replace(/<link.*?\/>/,"")//引用谷歌的样式表，会报错，所以去掉
				 .replace(/@font-face.*?}/g,"")//引入字体，会报错，所以去掉
				 .replace(/<p><img/g,"<p style='text-align:center'><img style='padding:5px;border:thin solid #ccc;border-radius:5px'")//原样式是图片居左，改为居中，且带有边框
				 .replace(/disabled='disabled'/g,"")//复选框都是禁用状态，改为可选状态
				 .replace(/\n/g,"")//去掉所有的换行符，即压缩文件
		fs.writeFile(dirRoot +"/dist/"+ fileName,data,"utf8",function(err,data){
			if(err){
				console.log(err)
			}else{
				console.log("file has been created successfully!")
			}
		})

	}
})