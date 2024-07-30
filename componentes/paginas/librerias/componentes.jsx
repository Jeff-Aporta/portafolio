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

function FormatoDoc({ children }) {
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
        if (typeof children == "string") {

            if (!children.trim()) {
                return children;
            }

            let retorno = [];
            let acumulado = "";

            if (agrupadores()) {
                return children;
            }

            children.split(" ").forEach((element, index, array) => {

                element = buscarPuntuacion(element);

                const cambio = element.cambio;
                element = element.resultado;

                if (cambio) {
                    if (Array.isArray(element)) {
                        element.forEach((elemento) => {
                            retorno.push(elemento);
                        });
                    } else {
                        retorno.push(element);
                    }
                } else {
                    const mayusculas = element
                        .split("")
                        .map((caracter, index) => {
                            return { caracter, index }
                        }).filter((caracterIndex) =>
                            caracterIndex.caracter == caracterIndex.caracter.toUpperCase() &&
                            esLetra(caracterIndex.caracter)
                        );

                    const esNumero = !Number.isNaN(Number(element));

                    if (element.endsWith("()")) {
                        retorno.push(
                            <span className="funcion">
                                {element.slice(0, -2)}<span className="puntuacion">()</span>
                            </span>
                        );
                    } else if (["/", "@"].some(e => element.includes(e))) {
                        retorno.push(
                            <span className="formato-anomalo">
                                {element}
                            </span>
                        );
                    } else if (esNumero) {
                        retorno.push(
                            <span className="numero">
                                {element}
                            </span>
                        );
                    } else if (ES_SNAKE_UPPER_CASE(element)){
                        retorno.push(
                            <span className="snake-upper-case">
                                {element}
                            </span>
                        );
                    } else if (mayusculas.length == element.length) {
                        retorno.push(
                            <span className="palabra todo-mayuscula">
                                {element}
                            </span>
                        );
                    } else if (mayusculas.length > 1) {
                        retorno.push(
                            <span className="palabra parcialmente-mayuscula">
                                {element}
                            </span>
                        );
                    } else if (mayusculas.length == 1 && mayusculas[0].index != 0) {
                        retorno.push(
                            <span className="funcion">
                                {element}
                            </span>
                        );
                    } else {
                        retorno.push(
                            element
                        );
                    }
                }

                if (index < array.length - 1) {
                    retorno.push(" ");
                }

            });
            return retorno;
        }
        return children;

        function esLetra(caracter) {
            let ascii = caracter.toUpperCase().charCodeAt(0);
            return ascii > 64 && ascii < 91;
        };

        function buscarPuntuacion(palabra) {
            const puntuaciones = [".", ",", ";", ":"];
            let retorno = [];

            let acumulado = "";

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
                retorno = retorno.map((element, index) => {
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
                });
            }

            if (retorno.length > 1) {
                return {
                    resultado: retorno,
                    cambio: true,
                };
            }
            return {
                resultado: palabra,
                cambio: false,
            };
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

        function agrupadores() {
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

            children.split("").forEach((caracter, index, array) => {
                if (agrupadorActual) {
                    if (caracter == agrupadorActual.close) {
                        acumulado = acumulado.trim();
                        if (!acumulado) {
                            acumulado = `${agrupadorActual.open}${agrupadorActual.close}`;
                            agrupadorActual = undefined;
                        } else {
                            retorno.push(
                                <span className="agrupacion">
                                    <span className={agrupadorActual.clase}>
                                        {agrupadorActual.open}
                                    </span><span className={agrupadorActual.claseContenido}>
                                        {acumulado}
                                    </span><span className={agrupadorActual.clase}>
                                        {agrupadorActual.close}
                                    </span>
                                </span>
                            );
                        }
                        acumulado = "";
                        agrupadorActual = undefined;
                    } else if (index == array.length - 1) {
                        retorno.push(
                            <RefString>
                                {agrupadorActual.open}{acumulado}
                            </RefString>
                        );
                    } else {
                        acumulado += caracter;
                    }
                } else {
                    agrupadorActual = agrupadores.find((agrupador) => caracter == agrupador.open);
                    if (!agrupadorActual) {
                        acumulado += caracter;
                    } else {
                        retorno.push(
                            <RefString>
                                {acumulado}
                            </RefString>
                        );
                        acumulado = "";
                    }
                }
            });

            if (retorno.length > 1) {
                children = retorno;
                return true;
            }
            return false;
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