/*
 * @Author: chengyuan06 chengyuan06@baidu.com
 * @Date: 2023-02-12
 * @LastEditors: chengyuan06 chengyuan06@baidu.com
 * @LastEditTime: 2023-02-12
 * @FilePath: /svelte/tree.js
 * @Description: 
 */
//打印目录树
const fs = require('fs');
const path = require('path');

let pathParams = process.argv[2];//拿到路径参数，cmd命令中第三个参数

if(!pathParams){
	pathParams = './'
}

//转成绝对路径
pathParams = path.resolve(pathParams);

//层级标识
let index = 0;

async function dirTree(pathParams){//深度搜索
	
	if(!fs.statSync(pathParams).isFile()){//是否是一个文件
		console.log(markT(index),getName(pathParams))
		let dirLis = fs.readdirSync(pathParams);
		index++;//进入下一级
		for(let i=0; i<dirLis.length; i++){
			dirTree(path.join(pathParams,dirLis[i]));
		}
		index--;//返回上一级
	}else{
		console.log(markT(index),getName(pathParams))
	}	
}

//生成等比的文件间隔符
function markT(index){
	if(index === 0){
		return '你要读取的文件夹：'
	}
	let str = '';
	for(let i=0; i<index; i++){
		str += ' |---'
	}
	return str;
}

//返回目录名，或者文件名
function getName(pathParams){
	return path.parse(pathParams).base;
}
//指定生成目录树
dirTree(pathParams);
