/**
 * 简单请求
 * 1.只能是get和post   head
 * 2.不能用自定义请求头 Authorization
 * 3.如果是 post请求，请求content-type 必须是www/
 * 复杂请求
 * put delete patch
 * 
 * 
 * 复杂请求--->先发一个空请求options====>判断跨域的情况（预检请求）
 */