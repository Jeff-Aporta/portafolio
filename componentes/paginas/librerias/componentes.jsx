function esquemaGeneralLibreria(objLib, props) {
    const indice = [];

    setTimeout(() => {
        PR.prettyPrint();
    }, 0);


    objLib.secciones.forEach((seccion, index) => {
        let id = seccion.nombre.replace(/\s+/g, "-").toLowerCase();
        seccion.id = id;
        indice.push({
            titulo: seccion.nombre,
            id
        });
    });

    return (
        <ThemeProvider theme={themeSelected}>
            <div className="fijo abajo derecha">
                <BotonGit
                    href={objLib.github}
                />
            </div>
            <EnvolventePagina>
                <Encabezado />
                <EnvolventeSeccion>
                    <Resumen {...objLib.resumen} />
                </EnvolventeSeccion>
                <Indice />
                {generarContenidoLibreria(objLib)}
                <br />
                {(objLib.footer ?? (() => ""))(props)}
            </EnvolventePagina>
        </ThemeProvider>
    );

    function Indice() {
        return <React.Fragment>
            <br />
            <br />
            <hr />
            <div className="indice">
                <h1>
                    Índice
                </h1>
                <ol
                    style={{
                        listStyleType: 'decimal-leading-zero',
                    }}
                >
                    {
                        indice.map(item => {
                            return (
                                <li
                                    style={{
                                        paddingLeft: '20px',
                                    }}
                                >
                                    <Link href={`#${item.id}`}>
                                        {item.titulo}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
            <br />
            <hr />
            <br />
            <br />
        </React.Fragment>;
    }

    function Encabezado() {
        return <React.Fragment>
            <h1
                style={{
                    fontSize: '400%',
                }}>
                <Titulo
                    texto={
                        objLib.nombre_render_as == "CodeInline" ?
                            (
                                <CodeInline>
                                    {objLib.nombre}
                                </CodeInline>
                            ) :
                            objLib.nombre
                    }
                />
                <HrGrueso width="50%" />
            </h1>
            <h1>
                {objLib.slogan}
            </h1>
        </React.Fragment>;
    }

    function generarContenidoLibreria(obj) {
        return obj.secciones.map(seccion => {
            return [
                <Seccion {...seccion} obj={obj} />,
                <br />,
                <br />
            ]
        });

        function Seccion({ nombre, id, nombre_render_as, contenido, obj }) {
            id ??= obj.id;
            contenido = contenido(obj);
            return (
                <div id={id}>
                    <h1>
                        <Titulo>
                            {
                                nombre_render_as == "CodeInline" ?
                                    (
                                        <CodeInline>
                                            {nombre}
                                        </CodeInline>
                                    ) :
                                    nombre
                            }
                        </Titulo>
                    </h1>
                    <EnvolventeSeccion>
                        <FormatoDoc>
                            {contenido}
                        </FormatoDoc>
                    </EnvolventeSeccion>
                </div>
            );
        }
    }
}

function Resumen({ desc, rel, img, descImg }) {
    return <div>
        <FormatoDoc>
            {desc}
        </FormatoDoc>
        <br />
        <br />

        <b>
            Puede:
        </b>
        <br />
        <br />
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                gap: '20px',
                wrap: 'nowrap',
            }}
        >
            <img
                src={
                    [
                        rel, img
                    ].filter(e => e).join("/")
                }
                style={{
                    float: 'left',
                    margin: '10px 40px 0 0',
                    width: '200px',
                    height: '200px',
                    borderRadius: '20px',
                }}
            />
            <ul className="punto-centrico">
                {
                    Array.isArray(descImg) ? descImg.map((item, index) => {
                        return (
                            <LIDoc>
                                {item}
                            </LIDoc>
                        );
                    }) : descImg
                }
            </ul>
        </div>
    </div>;
}

function BotonGit({ href }) {
    return <Button
        size="large"
        variant="contained"
        className="boton-github"
        startIcon={<i className="fab fa-github" />}
        href={href}
        target="_blank"
    >
        GitHub
    </Button>
}

function LIDoc({ children }) {
    return (<li>
        <FormatoDoc>
            {children}
        </FormatoDoc>
    </li>);
}

function FormatoDoc({ children, lastSpace = true }) {
    const puntuaciones = [".", ",", ";", ":", "-"];
    
    if (!children) {
        return;
    }
    if (children.type == React.Fragment) {
        return FormatoDoc({ children: children.props.children });
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
                // string = string.replaceAll("\n", " ");
                // while (string.includes("  ")) {
                //     string = string.replaceAll("  ", " ");
                // }
            }

            string = agrupadores(string);
            if (Array.isArray(string)) {
                if (string.length == 1) {
                    string = string[0];
                } else {
                    string = string.map((element, index) => {
                        return (
                            <RefString>
                                {element}
                            </RefString>
                        );
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
                    condicion: element.includes("()"),
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
                    condicion: mayusculas.length == 1 && mayusculas[0].index != 0,
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
                    </span><span className="puntuacion">()</span>
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

            const caracteresDePuntuacion = palabra.split("").filter((caracter) => puntuaciones.includes(caracter));
            caracteresDePuntuacion.pop();
            const soloGiones = caracteresDePuntuacion.every((caracter) => caracter == "-");

            palabra.split("").forEach((caracter, index, array) => {
                if (puntuaciones.includes(caracter)) {
                    retorno.push(acumulado);
                    retorno.push(
                        <span className="puntuacion">{caracter}</span>
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
                    <span className={`elemento-puntuado ${soloGiones ? "solo-giones" : ""}`}>
                        {
                            retorno.map((element, index) => {
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

            function retornarRetorno(){
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
            const agrupadores = [
                {
                    open: "¡",
                    close: "!",
                    clase: "exclamacion",
                    claseContenido: "contenido-exclamacion",
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
                    clase: "agrupador",
                    claseContenido: "contenido-agrupado",
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
                {
                    open: "`",
                    close: "`",
                    clase: "comilla",
                    claseContenido: "contenido-texto",
                },
            ]

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
                                retorno.push(
                                    <span className="agrupacion">
                                        <span className={agrupadorActual.clase}>
                                            {agrupadorActual.open}
                                        </span>
                                        <span className={agrupadorActual.claseContenido}>
                                            <RefString>
                                                {acumulado}
                                            </RefString>
                                        </span>
                                        <span className={agrupadorActual.clase}>
                                            {agrupadorActual.close}
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
                                retorno.push(`${agrupadorActual.open}${acumulado}`);
                            } else {
                                retorno.push(acumulado);
                            }
                            acumulado = "";
                        }
                        return condicion;
                    }
                }

                function buscarApertura() {
                    agrupadorActual = agrupadores.find((agrupador) => caracter == agrupador.open);
                    let next = array[index + 1];
                    let prev = array[index - 1];
                    if (agrupadorActual) {
                        if (next == agrupadorActual.close) {
                            agrupadorActual = undefined;
                        } else {
                            retorno.push(acumulado);
                            acumulado = "";
                        }
                    } else {
                        if (!agrupadores.some(agrupador => caracter == agrupador.close && prev == agrupador.open)) {
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

function CodeJava({
    nocode = false,
    linenumbers = true,
    children,
}) {
    let { multiLinea, str } = removerTabulacionesDeCodigo(children);

    children = str;

    return (
        <Code
            nocode={nocode}
            language="java"
            linenumbers={linenumbers && ((Array.isArray(children) && children.length > 1) || multiLinea)}
            children={children}
            onCopy={() => {
                MiniDrawerDriver.mensajeSimple.mostrarMensaje(<b>
                    <i className="fa-solid fa-check" /> Texto copiado al portapapeles
                </b>);
            }}
        />
    );
}