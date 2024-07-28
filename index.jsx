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
                componente: () => <PaginaLibreriaJFTP />,
                titulo: "JFTP",
                Icono: "fa-solid fa-server",
                contenido: _JFTP_
            },
            "ASCIIMapLoader": {
                rel: "https://jeff-aporta.github.io/ASCIIMapLoader",
                componente: function () {
                    return <PaginaASCIIMapLoader {
                        ...{
                            rel: this.rel,
                            inclusionEnPortafolio: true,
                        }
                    } />
                },
                titulo: "ASCII Map Loader",
                Icono: "fa-solid fa-map",
                contenido: _ASCIIMapLoader_
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
    </ThemeProvider >,
    document.querySelector('body .app')
);