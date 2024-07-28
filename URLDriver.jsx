let _URL = window.location.href;

function parametroURL({ url = window.location.href, id = "p" } = {}) {
    return new URL(url).searchParams.get(id) ?? "Perfil";
}

function actualizarParametro({ id, valor }) {
    let url = new URL(window.location.href);
    if (!valor) {
        url.searchParams.delete(id);
    } else {
        url.searchParams.set(id, valor);
    }
    window.history.pushState({}, '', url);
}