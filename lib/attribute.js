export function Attribute(value) {
  return function(Class) {
    if(!Class.prototype.$attributes) Class.prototype.$attributes = []
    Class.prototype.$attributes.push(value)
    Class.prototype[value] = ''
    console.log('Added attribute', Class.prototype.$attributes)
    //Class.prototype.observedAttributes = Class.prototype.$attributes
    Object.assign(Class.prototype.constructor, {
      get observedAttributes() {
        return Class.prototype.$attributes
      }
    })
  }
}
