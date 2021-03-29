import html from 'https://cdn.skypack.dev/snabby?min'


function init (options={}) {
    const model = {
        open: !!options.open
        //state: 'closed' // closed | opening | open | closing
    }

    return model
}


function view (model, drawerContent, update) {

    const _hookInsertBack = function (vnode) {
        document.body.appendChild(vnode.elm)

        document.body.onkeydown = function (ev) {
          if (ev.which === 27 && model.drawer.open)
            toggleDrawer()
        }
    }


    const toggleDrawer = function () {
        model.drawer.open = !model.drawer.open
        update()
    }


    return html`
      <div class="drawer"
           style="position: fixed;
                left: -250px;
                top: 0px;
                width: 250px;
                height: 100%;
                z-index: 200;
                background-color: white;
                color: black;
                overflow-y: auto;
                padding: 8px;
                box-sizing: border-box;
                transition: left 0.18s ease-in-out 0s;
                border-right: 1px solid #f0f0f0;"
           @style:left=${model.drawer.open ? '0px' : '-250px'}>
        
        ${drawerContent}

        <div class="drawer-back"
             @hook:insert=${_hookInsertBack}
             @style:display=${model.drawer.open ? '' : 'none'}
             @style:delayed:opacity=${model.drawer.open ? '0.6' : '0' }
             @on:click=${toggleDrawer}
             style="z-index: 199;
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0px;
                top: 0px;
                background-color: black;
                opacity: 0.6;
                transition: opacity 0.14s ease-in-out 0s;
                cursor: pointer;"></div>

      </div>`
}


export default { init, view }
