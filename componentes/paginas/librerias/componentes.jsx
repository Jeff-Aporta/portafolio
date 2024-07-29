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
            const id = obj.id;
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
        const terminaciones = ["", ".", ",", ":", ";"]
        const comillas = ["\"", "'"]
        const caracteresRaros = ["/", "@"]
        if (typeof children == "string") {
            let retorno = [];
            let acumulado = "";
            children.split(" ").forEach((element, index, array) => {

                if (terminaciones.some((terminacion) => element.endsWith("()" + terminacion))) {
                    if (acumulado) {
                        retorno.push(acumulado);
                        acumulado = "";
                    }
                    retorno.push(
                        <Resaltar color="plum">
                            {element}
                        </Resaltar>
                    );
                    retorno.push(" ");
                } else {
                    if (acumulado && element.startsWith("(")) {
                        // cuando se detecta un parentesis al inicio de una palabra
                        retorno.push(acumulado);
                        acumulado = "";
                    }
                    if (acumulado && comillas.some((comilla) => element.startsWith(comilla))) {
                        // cuando se detecta una comilla al inicio de una palabra
                        retorno.push(acumulado);
                        acumulado = "";
                    }
                    const esLetra = (caracter) => {
                        let ascii = caracter.toUpperCase().charCodeAt(0);
                        return ascii > 64 && ascii < 91;
                    };

                    const contarMayusculas = element.split("").filter((letra) =>
                        letra == letra.toUpperCase() &&
                        esLetra(letra) &&
                        !terminaciones.includes(letra)
                    ).length;
                    let tieneFormatoRaro = (element.includes(".") && !element.endsWith("."));
                    tieneFormatoRaro ||= caracteresRaros.some((caracter) => element.includes(caracter));
                    const NoEstaAcumulandoEncierro = [acumulado, element].every(test =>
                        !test.startsWith("(") &&
                        !comillas.some((comilla) => test.startsWith(comilla))
                    );

                    if (NoEstaAcumulandoEncierro) {
                        // No está acumulando una frase entre parentesis o comillas
                        if (
                            contarMayusculas > 1 ||
                            tieneFormatoRaro ||
                            Number(element) == element
                        ) {
                            retorno.push(acumulado + " ");
                            retorno.push(
                                <Resaltar color="LemonChiffon">
                                    {element}
                                </Resaltar>
                            );
                            acumulado = "";
                        } else {
                            acumulado += element;
                        }
                    } else {
                        acumulado += element;
                    }
                    let terminacionComilla;
                    if (comillas.some((comilla) =>
                        acumulado.endsWith(comilla) ||
                        (terminacionComilla = terminaciones.find((terminacion) => acumulado.endsWith(comilla + terminacion)))
                    )) {
                        // Se detecto una frase entre comillas
                        retorno.push((() => {
                            return (
                                <span>
                                    <Resaltar color="gold">
                                        {terminacionComilla ? acumulado.slice(0, -1) : acumulado}
                                    </Resaltar>{terminacionComilla}
                                </span>
                            );
                        })());
                        acumulado = "";
                    }
                    if (acumulado.startsWith("(") && terminaciones.some((terminacion) => acumulado.endsWith(")" + terminacion))) {
                        // Se detecto una frase entre parentesis
                        retorno.push(
                            <Resaltar>
                                {acumulado.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")")}
                            </Resaltar>
                        );
                        acumulado = "";
                    }
                    if (index == array.length - 1) {
                        retorno.push(acumulado);
                    }
                    acumulado += " ";
                }
            });
            return retorno;
        }
        return children;
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