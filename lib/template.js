export function Template(content, handler=false) {
  //console.log("escaped string", content)
  //console.log("evaled", eval("`"+content+"`"))
  return function(Class) {
    if(handler) Class.prototype.$renderFunction = handler
    Class.prototype.$template = content
  }
}
