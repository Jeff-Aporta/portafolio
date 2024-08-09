function App() {
    MiniDrawerDriver = miniDrawer({
        estados: {
            "Perfil": {
                componente: () => <PaginaPerfil />,
                titulo: "Perfil",
                Icono: "fa-solid fa-user",
            },
            "Proyectos": {
                componente: () => <PaginaProyectos />,
                titulo: "Proyectos",
                Icono: "fa-solid fa-tasks",
            },
            "Librerías": {
                componente: () => <PaginaLibrerias />,
                titulo: "Librerías",
                Icono: "fa-solid fa-book",
                parametrosUso: ["filtro"],
                menuInferior: new generarMenuInferior({
                    opciones: {
                        "": {
                            label: "Sin filtro",
                            icono: "fa-solid fa-filter-circle-xmark",
                            ocultarSiEstaSeleccionado: true,
                            style: {
                                color: "hotpink"
                            }
                        },
                        "javascript": {
                            label: "Javascript",
                            icono: "fab fa-js",
                        },
                        "java": {
                            label: "Java",
                            icono: "fa-solid fa-mug-saucer",
                        },
                    },
                    onChange: function (_, newIndex) {
                        if (newIndex == this.calcIndex()) {
                            return;
                        }
                        actualizarParametro({
                            id: "filtrar",
                            valor: this.keys()[newIndex]
                        });
                        window.scrollTo(0, 0);
                        MiniDrawerDriver.update();
                    },
                    calcIndex: function () {
                        const index = this.keys().indexOf(parametroURL({ id: "filtrar" }));
                        if (index == -1) {
                            return this.defautIndex ?? 0;
                        }
                        return index;
                    },
                }),
            },
            "Configuración": {
                componente: () => <PaginaConfiguracion />,
                titulo: "Configuración",
                Icono: "fa-solid fa-cog",
                categoria: "principal",
            },
            "JFTP": {
                componente: function () {
                    return esquemaGeneralLibreria(this.contenido);
                },
                titulo: "JFTP",
                contenido: _JFTP_,
                type: "libreria-java",
            },
            "ASCIIMapLoader": {
                rel: "https://jeff-aporta.github.io/ASCIIMapLoader",
                componente: function () {
                    return esquemaGeneralLibreria(this.contenido);
                },
                titulo: _ASCIIMapLoader_.nombre,
                contenido: _ASCIIMapLoader_,
                type: "libreria-js",
            },
            "GeometryRectsNCircles": {
                rel: "https://jeff-aporta.github.io/Geometry-rects-n-circles-JS",
                componente: function () {
                    return esquemaGeneralLibreria(this.contenido);
                },
                titulo: _GEOMETRY_RECTS_N_CIRCLES_.nombre,
                contenido: _GEOMETRY_RECTS_N_CIRCLES_,
                type: "libreria-js",
            },
            "OrigenTel": {
                rel: "https://jeff-aporta.github.io/OrigenTel",
                componente: function () {
                    return esquemaGeneralLibreria(this.contenido);
                },
                titulo: _ORIGEN_TEL_.nombre,
                contenido: _ORIGEN_TEL_,
                type: "libreria-js",
            },
        },
        navegadorIzquierda: ["Perfil", 0, "Proyectos", "Librerías", 0, "Configuración"],
    });
    return (
        MiniDrawerDriver.componente
    );
}

ReactDOM.render(
    <ThemeProvider theme={themeSelected}>
        <CssBaseline />
        <App />
        <BotonLinkPortafolio />
    </ThemeProvider >,
    document.querySelector('body .app')
);

(()=>{
    const cls = CSScmds(`
        500px<-x->1000px?font-size: [14px,18px];
        x<700px?padding-left:(0px,);
    `).split(" ");
    document.body.classList.add(...cls);
})();