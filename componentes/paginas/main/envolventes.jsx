let windowWidth = window.innerWidth;

window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
});

function EnvolventePagina(props) {
    activadorCSSdeComponente(props);
    return (
        <ThemeProvider theme={themeSelected}>
            <CssBaseline />
            <div
                {...props}
                children={undefined}
                className={CSScmds(`
                        400px<-x->1000px?padding: [5px,50px] [10px,50px];
                    `,
                    "pagina"
                )}
            >
                <FormatoDoc>
                    {props.children}
                </FormatoDoc>
            </div>
        </ThemeProvider>
    );
}

function SubEnvolventeSeccion(props) {
    return <EnvolventeSeccion
        {...props}
        lvl={props.lvl ?? 2}
    />;
}

function EnvolventeSeccion(props) {
    props.elevation = props.lvl ?? 1;
    activadorCSSdeComponente(props);
    const seccion = props.lvl == 1;
    const subseccion = props.lvl > 1;
    const pad = seccion ? 30 : 20;
    return (
        <Paper
            {...props}
            className={[
                (seccion ? "seccion" : "subseccion"),
                ...CSScmds(`
                    400px<-x->1000px?padding: ${pad}px [10px,${pad}px];
                `).split(" ")
            ]}
        >
            <FormatoDoc>
                {props.children}
            </FormatoDoc>
        </Paper>
    );
}

function activadorCSSdeComponente(props) {
    props.style ??= {};
    Object.assign(props.style, {
        ...(() => {
            const style = {};
            if (props.relative) {
                style.position = "relative";
            }
            return style;
        })()
    });
}

const _agrupadores_ = [
    {
        open: "¡",
        close: "!",
        clase: "exclamacion",
        claseContenido: "contenido-exclamacion",
    },
    ...[
        {
            prevOpen: " ",
            clase: "",
        },
        {
            prevOpen: "&",
            clase: ["todo-blanco"],
        }
    ].map((sufix) => {
        return {
            open: "*",
            close: "*",
            prevOpen: sufix.prevOpen,
            nextClose: " ",
            clase: "negrita",
            claseContenido: [
                "contenido-negrita",
                ...sufix.clase,
            ].join(" "),
        }
    }),
    {
        open: "~",
        close: "~",
        prevOpen: " ",
        nextClose: " ",
        clase: "tachado",
        claseContenido: "contenido-tachado",
    },
    {
        open: "`",
        close: "`",
        clase: "monospace",
        claseContenido: "contenido-monospace",
    },
    {
        open: "{",
        close: "}",
        clase: "agrupador",
        claseContenido: "contenido-agrupado",
    },
    {
        open: "[",
        close: "]",
        clase: "agrupador",
        claseContenido: "contenido-agrupado",
    },
    {
        open: "(",
        close: ")",
        prevOpen: " ",
        nextClose: " ",
        clase: "agrupador",
        claseContenido: "contenido-agrupado",
    },
    {
        open: "(",
        close: ")",
        nextClose: " ",
        clase: "agrupadorF",
        claseContenido: "contenido-agrupadoF",
    },
    {
        open: '"',
        close: '"',
        clase: "comilla",
        claseContenido: "contenido-texto",
    },
    {
        open: "'",
        close: "'",
        clase: "comilla",
        claseContenido: "contenido-texto",
    },
];

const _puntuaciones_ = [".", ",", ";", ":", "-", "×", "+"];

function FormatoDoc({ children }) {
    if (!children) {
        return;
    }
    if (Array.isArray(children)) {
        return (children.map((child, index) => {
            return (
                <RefString>
                    {child}
                </RefString>
            )
        }));
    }

    return (
        <RefString>
            {children}
        </RefString>
    )

    function RefString({ children }) {
        if (!children) {
            return "";
        }

        if (typeof children != "string") {
            return children;
        }

        let retorno = children;

        retorno = tratamientoDeString(retorno);

        if (Array.isArray(retorno) && retorno.length == 1) {
            retorno = retorno[0];
        }

        separarPorEspacios();

        return retorno;

        function separarPorEspacios() {
            if (!Array.isArray(retorno)) {
                return;
            }
            let retornoEspaciado = [];
            retorno.forEach((element, index, array) => {
                retornoEspaciado.push(element);
                if (index < array.length - 1) {
                    retornoEspaciado.push(" ");
                }
            });
            retorno = retornoEspaciado;
        }

        function tratamientoDeString(string) {
            if (typeof string != "string") {
                return string;
            } else {
                string = string.trim();
                if (!string) {
                    return string;
                }
            }

            string = agrupadores(string).filter(Boolean);

            if (Array.isArray(string)) {
                if (string.length == 1) {
                    string = string[0];
                } else {
                    string = string.filter(Boolean).map((element, index) => {
                        if (typeof element == "string") {
                            return (
                                <RefString>
                                    {element}
                                </RefString>
                            );
                        }
                        return element;
                    });
                }
            }
            if (typeof string != "string") {
                return string;
            }

            let retorno = [];
            let acumulado = "";

            string.split(" ").forEach((element, index, array) => {

                if (element.trim()) {
                    aplicarTransformacion();
                }

                function aplicarTransformacion() {
                    if (aplicarPuntuacionesEnElemento()) {
                        return;
                    } else {
                        aplicarReglas();
                    }

                    if (index == array.length - 1) {
                        acumulado += " ";
                        añadirAcumulado();
                    }

                    function añadirAcumulado() {
                        retorno.push(acumulado.trim());
                        acumulado = "";
                    }

                    function aplicarPuntuacionesEnElemento() {
                        element = buscarPuntuacion(element);
                        const cambio = element.cambio;
                        element = element.resultado;

                        if (cambio) {
                            añadirAcumulado();
                            if (Array.isArray(element)) {
                                retorno.push(
                                    <span className="elemento-puntuado">
                                        {element}
                                    </span>
                                );
                            } else {
                                retorno.push(element);
                            }
                        }
                        return cambio;
                    }

                    function aplicarReglas() {
                        let reglas = Object.values(reglasFormato(element, retorno)).filter((regla) => regla.condicion);

                        if (reglas.length) {
                            añadirAcumulado();
                            reglas.shift().accion();
                        } else if (index == array.length - 1) {
                            acumulado += element + " ";
                            añadirAcumulado();
                        } else {
                            acumulado += element + " ";
                        }
                    }
                }
            });

            if (retorno.length == 1) {
                retorno = retorno[0];
            }

            return retorno;
        }

        function reglasFormato(element, retorno) {
            const mayusculas = element
                .split("")
                .map((caracter, index) => {
                    return { caracter, index }
                }).filter((caracterIndex) =>
                    caracterIndex.caracter == caracterIndex.caracter.toUpperCase() &&
                    esLetra(caracterIndex.caracter)
                );

            const esNumero = !Number.isNaN(Number(element));

            return [
                {
                    condicion: ["react", "javascript", "material-ui", "babel"].includes(element.toLowerCase()),
                    nombre: "coincidencias",
                    accion: () => {
                        retorno.push(
                            <span className="palabra coincidencia">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: element.endsWith("()"),
                    nombre: "funcion",
                    accion: () => {
                        retorno.push(
                            <Funcion>
                                {element}
                            </Funcion>
                        );
                    }
                },
                {
                    condicion: ["/", "@"].some(e => element.includes(e)),
                    nombre: "formato-anomalo",
                    accion: () => {
                        retorno.push(
                            <span className="formato-anomalo">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: esNumero,
                    nombre: "numero",
                    accion: () => {
                        retorno.push(
                            <span className="numero">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: ES_SNAKE_UPPER_CASE(element),
                    nombre: "snake-upper-case",
                    accion: () => {
                        retorno.push(
                            <span className="snake-upper-case">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: mayusculas.length == element.length,
                    nombre: "todo-mayuscula",
                    accion: () => {
                        retorno.push(
                            <span className="palabra todo-mayuscula">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: mayusculas.length > 1,
                    nombre: "parcialmente-mayuscula",
                    accion: () => {
                        retorno.push(
                            <span className="palabra parcialmente-mayuscula">
                                {element}
                            </span>
                        );
                    }
                },
                {
                    condicion: mayusculas.length == 1 && mayusculas[0].index != 0 && element.endsWith(")") && element.includes("("),
                    nombre: "funcion",
                    accion: () => {
                        retorno.push(
                            <Funcion>
                                {element}
                            </Funcion>
                        );
                    }
                },
            ];
        }

        function Funcion({ children }) {
            return (
                <span className="elemento-funcion">
                    <span className="funcion">
                        {children.replaceAll("()", "")}
                    </span>{(() => {
                        if (children.includes("()")) {
                            return <span className="puntuacion">()</span>
                        }
                    })()}
                </span>
            );
        }

        function esLetra(caracter) {
            let ascii = caracter.toUpperCase().charCodeAt(0);
            return ascii > 64 && ascii < 91;
        };

        function buscarPuntuacion(palabra) {
            let retorno = [];

            let acumulado = "";

            const caracteresDePuntuacion = palabra.split("").filter((caracter) => _puntuaciones_.includes(caracter));
            caracteresDePuntuacion.pop();
            const soloGiones = caracteresDePuntuacion.length && caracteresDePuntuacion.every((caracter) => caracter == "-");
            const soloMultiplicadores = caracteresDePuntuacion.length && caracteresDePuntuacion.every((caracter) => caracter == "×");

            palabra.split("").forEach((caracter, index, array) => {
                if (_puntuaciones_.includes(caracter)) {
                    retorno.push(acumulado);
                    retorno.push(
                        <span
                            className={`
                                puntuacion
                                ${caracter == "×" ? "times" : ""}
                            `}
                        >
                            {caracter}
                        </span>
                    );
                    acumulado = "";
                } else {
                    acumulado += caracter;
                }
                if (acumulado && index == array.length - 1) {
                    retorno.push(acumulado);
                }
            });

            if (retorno.length == 2 && typeof retorno[0] == "string") {
                retorno[0] = <RefString>{retorno[0]}</RefString>;
            }

            if (retorno.length > 2) {
                retorno = (
                    <span
                        className={`
                            elemento-puntuado
                            ${soloGiones ? "solo-guiones" : ""}
                            ${soloMultiplicadores ? "solo-multiplicadores" : ""}
                        `}
                    >
                        {
                            retorno.filter(e => e).map((element, index) => {
                                if (typeof element == "string") {
                                    return (
                                        ES_SNAKE_UPPER_CASE(element) ?
                                            <span className="snake-upper-case">
                                                {element}
                                            </span> :
                                            <span className="obj-call">
                                                {element}
                                            </span>
                                    );
                                }
                                return element;
                            })
                        }
                    </span>
                )
                return retornarRetorno();
            }

            if (retorno.length > 1) {
                return retornarRetorno();
            }
            return {
                resultado: palabra,
                cambio: false,
            };

            function retornarRetorno() {
                return {
                    resultado: retorno,
                    cambio: true,
                };
            }
        }

        function ES_SNAKE_UPPER_CASE(palabra) {
            if (!palabra.includes("_")) {
                return false;
            }
            return palabra.replaceAll("_", "").split("").reduce((acumulado, caracter, index) => {
                acumulado &&= (caracter == caracter.toUpperCase() && esLetra(caracter));
                return acumulado;
            }, true);
        }

        function agrupadores(string) {
            let retorno = [];
            let agrupadorActual;
            let acumulado = "";

            string.split("").forEach((caracter, index, array) => {
                if (agrupadorActual) {
                    agrupando();
                } else {
                    buscarApertura();
                }

                function agrupando() {
                    if (seEncontroCierre()) {
                        return;
                    }
                    if (seAlcanzoAlFinal()) {
                        return;
                    }

                    noHayAgrupacion();

                    function noHayAgrupacion() {
                        acumulado += caracter;
                    }

                    function seEncontroCierre() {
                        const condicion = caracter == agrupadorActual.close;
                        if (condicion) {
                            if (acumulado) {
                                //caso especial
                                retorno.push(
                                    <span className="agrupacion">
                                        <span className={agrupadorActual.claseContenido}>
                                            {(() => {
                                                if (agrupadorActual.funcion) {
                                                    return (
                                                        <Funcion>
                                                            {agrupadorActual.funcion}
                                                        </Funcion>
                                                    );
                                                }
                                            })()}
                                            <RefString>
                                                <span className={agrupadorActual.clase}>
                                                    {agrupadorActual.open}
                                                </span>
                                                {acumulado}
                                                <span className={agrupadorActual.clase}>
                                                    {agrupadorActual.close}
                                                </span>
                                            </RefString>
                                        </span>
                                    </span>
                                );
                            } else {
                                retorno.push(`${agrupadorActual.open}${agrupadorActual.close}`);
                            }
                            acumulado = "";
                            agrupadorActual = undefined;
                        }
                        return condicion;
                    }

                    function seAlcanzoAlFinal() {
                        const condicion = index == array.length - 1;
                        if (condicion) {
                            if (agrupadorActual) {
                                retorno.push(
                                    <span className="agrupacion-sin-cierre">
                                        {agrupadorActual.open}
                                        <RefString>
                                            {acumulado}
                                        </RefString>
                                    </span>
                                );
                            } else {
                                retorno.push(acumulado);
                            }
                            acumulado = "";
                        }
                        return condicion;
                    }
                }

                function buscarApertura() {
                    let next = array[index + 1];
                    let prev = array[index - 1];

                    agrupadorActual = _agrupadores_.find((agrupador) => {
                        const prevOpen = agrupador.prevOpen && prev ? prev == agrupador.prevOpen : true;
                        return caracter == agrupador.open && prevOpen;
                    });

                    if (agrupadorActual) {
                        const nextClose = agrupadorActual.nextClose && next ? next == agrupadorActual.nextClose : true;
                        if (next == agrupadorActual.close && nextClose) {
                            agrupadorActual = undefined;
                        } else {
                            if (agrupadorActual && agrupadorActual.clase == "agrupadorF") {
                                const palabras = acumulado.split(" ");
                                const funcion = palabras.pop();
                                agrupadorActual.funcion = funcion;
                                retorno.push(
                                    <React.Fragment>
                                        {palabras.join(" ")}
                                    </React.Fragment>
                                );
                            } else {
                                retorno.push(acumulado);
                            }

                            acumulado = "";
                        }
                    } else {
                        const agrupador = _agrupadores_.find(agrupador => caracter == agrupador.close && prev == agrupador.open);
                        if (agrupador) {
                            acumulado += [agrupador.open, agrupador.close].join("");
                        } else {
                            acumulado += caracter;
                        }
                        if (index == array.length - 1) {
                            retorno.push(acumulado);
                            acumulado = "";
                        }
                    }
                }
            });

            return retorno;
        }
    }
}