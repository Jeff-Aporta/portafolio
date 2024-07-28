function generarMenuInferior(props) {
    asignarPropiedades(this, props);

    this.keys = function () {
        return Object.keys(this.opciones);
    }

    this.opcionIDSeleccionada = function () {
        return this.keys()[this.calcIndex()];
    }
}

function GenerarContenidoLibreria(props) {
    asignarPropiedades(this, props);
    this.githubPage = this.github.replaceAll("https://github.com/Jeff-Aporta", "https://jeff-aporta.github.io");
    this.resumen.rel = this.githubPage;
    this.resumen.img = this.img;
}

function asignarPropiedades(t,props) {
    Object.entries(props).forEach(([k, v]) => {
        if (typeof v === "function") {
            t[k] = v.bind(t);
        } else {
            t[k] = v;
        }
    });
}