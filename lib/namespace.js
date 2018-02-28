import kebabCase from 'lodash/kebabCase'
import hyperHTML from 'hyperhtml/esm'

export function Namespace(namespace) {
  return function(Class) {
    const componentName = `${namespace}-${kebabCase(Class.name)}`
    Object.assign(Class.prototype, {
      connectedCallback() {
        this.$attributes.forEach((attr)=> {
          this[attr] = this.getAttribute(kebabCase(attr))
        })
        console.log('Attaching shadowRoot')
        this.attachShadow({mode: 'open'})
        if(this.$template) {
          this.render()
        }
        this.attached && this.attached()
      },
      attributeChangedCallback(attr, oldVal, newVal) {
        console.log('Attribute changed')
        if(oldVal === newVal || !oldVal || !newVal) return
        this[attr] = newVal
        this.render()
      },
      render() {
        let rendered
        if(this.$renderFunction) {
          rendered = this.$renderFunction(this.$template, this)
        } else {
          rendered = this
            .$template
            .replace(/{{ *([a-zA-Z0-9]+) *}}/g, function(match, p1) {
              return '${this.' + p1 + '}'
            })
        }

        const template = Function(['html'], `return html \`${rendered}\``)
        template.call(this,hyperHTML.bind(this.shadowRoot))

        // Attach eventlisteners for attributes wrapped in parentheses
        const nodes = this.shadowRoot.childNodes
        nodes.forEach(n => {
        	const attrs = n.getAttributeNames && n.getAttributeNames()
          if(!attrs) return
          attrs.forEach(attr=> {
            const binding = attr.match(/\[(.*?)\]/)
            if(binding && binding.length) {
              // Get variable name
              const fnArray = attr.match(/\[(.*?)\]/)
              console.log('result',fnArray)
              if(!fnArray) return
              let v = fnArray[1]

              // Get value
              let val = n.getAttribute(attr)

              console.log('binding', v, '=', val)
              n.addEventListener('change', (e)=> {
                console.log('Change-event')
                this[v] = val ? val : e.target && e.target.value
                this.render()
              })
            }


          	const listener = attr.match(/\((.*?)\)/)
            if(listener && listener.length) {

              // Get function name
              const fnArray = n.getAttribute(attr).match(/[^\(]+/)
              console.log('Eventlistener', fnArray)
              if(!fnArray) return
              let fn = fnArray[0]

              // Get function value
              let val = n.getAttribute(attr).match(/\(\'([^\)]+)\'\)/)
              if(val) val = val[1]

            	n.addEventListener(listener[1], (e)=> {
                if(n.getAttribute(attr).includes('(')) {
                  console.log('function', typeof this[fn])
                  if(typeof this[fn] === 'function') return this[fn](val || e)
                } else {
                  let v = n.getAttribute(attr)
                  if(e[v]) this[v] = e[v]
                }
              })
            }
          })
        })
      }
    })

    customElements.define(componentName, Class)
  }
}
