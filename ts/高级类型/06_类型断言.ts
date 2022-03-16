//有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。
const aLink = document.getElementById('link') as HTMLAnchorElement
console.log(aLink.href)
/*
 解释:
    1. 使用 `as` 关键字实现类型断言
    2. 关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）
    3. 通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了
 */
