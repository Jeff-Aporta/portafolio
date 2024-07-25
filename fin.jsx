let _URL = window.location.href;

let p;

window.navigation.addEventListener("navigate", (e) => {
    let href = e.destination.url;
    if (_URL != href) {
        if (href.includes("#")) {
            href = href.split("#")[0];
            setTimeout(() => {
                window.history.replaceState({}, '', href);
            }, 10);
        }
        _URL = href;
        aplicarParametros(href);
    }
})

function buscarPagina(id) {
    esquemaContenido.listaDePaginas.find(pagina => pagina.ID == id)?.accion();
    esquemaContenido.BotonesOpcion.find(pagina => pagina.Texto && pagina.Texto == id)?.accion();
}

function aplicarParametros(href) {
    let url = new URL(href ?? window.location.href);
    if (p == url.searchParams.get("p")) {
        return;
    }
    p = url.searchParams.get("p") || "Perfil";

    esquemaContenido.listaDePaginas.find(pagina => pagina.ID == p)?.accion(false);
    esquemaContenido.BotonesOpcion.find(boton => boton.Texto == p)?.accion(false);
}

aplicarParametros();