function esquemaGeneralLibreria(objLib) {
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
            <Typography
                variant="h1"
                style={{
                    fontWeight: 'bolder',
                }}
            >
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
                <EspacioVertical heigth="30px" />
            </Typography>
            <SloganElement />
            <EspacioVertical height="30px" />
            <HrGrueso width="60%" />
            <EspacioVertical height="20px" />
            <GitElement />
            <EspacioVertical height="40px" />
        </React.Fragment>;

        function SloganElement() {
            return (
                <Typography
                    variant="h4"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '30px',
                        maxWidth: '80%',
                        textWrap: 'balance',
                        fontWeight: 'lighter',
                    }}
                >
                    {objLib.slogan}
                </Typography>
            );
        }

        function GitElement() {
            const istyle = {
                fontSize: '180%',
            };
            return (
                <Typography
                    variant="h5"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '30px',

                        border: '4px solid #252525',
                        padding: '15px',
                        borderRadius: '50px',

                        scale: '0.75',
                        transformOrigin: '0 0',
                    }}
                >
                    <span style={istyle}>
                        <i className="fa-brands fa-github" />
                    </span>
                    <span
                        style={{
                            marginTop: '-15px',
                        }}
                    >
                        <small style={{ color: "gray" }}>
                            <small>
                                Github:
                            </small>
                        </small>
                        <br />
                        <Link href={objLib.github} target="_blank" color="inherit" underline="hover">
                            {objLib.github}
                        </Link>
                    </span>
                </Typography>
            );
        }
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
    const descR = (
        <FormatoDoc>
            {desc}
        </FormatoDoc>
    );
    const c1 = "500px<x<700px?display: (none,);"
    const c2 = "500px<x<700px?display: (,none);width: 65%;";
    return <div>
        <p className={CSScmds(c1)}>
            {descR}
        </p>
        <div
            className={CSScmds(`
                x<700px?flex-direction:(column,row);
                700px<-x->1000px?gap: [10px,20px];
            `)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                wrap: 'wrap',
            }}
        >
            <span
                className={CSScmds(`
                    x<500px?display: (flex,inline-flex);width: (100%,);
                `)}
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <img
                    src={
                        [
                            rel, img
                        ].filter(e => e).join("/")
                    }
                    className={[
                        "anim1s",
                        CSScmds(`
                            700px<-x->1000px?margin: 10px [10px,40px] 0 0;
                            500px<x<700px?width: (200px,180px,250px);height: (200px,180px,250px);
                        `)
                    ].join(' ')}
                    style={{
                        objectFit: 'cover',
                        float: 'left',
                        borderRadius: '20px',
                    }}
                />
                <p className={CSScmds(c2)}>
                    {descR}
                </p>
            </span>
            <BRO x="x>500px" />
            <ul
                className={[
                    "punto-centrico",
                    CSScmds(`
                        x<500px?display: (none,);
                        500px<-x->1000px?font-size: [10px,15px];
                    `)
                ].join(' ')}
            >
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
        className={[
            "boton-github",
            ...CSScmds(`
                400px<-x->1000px?font-size: [10px,20px];
                x<600px?scale: (0.9,);
            `).split(' ')
        ].join(' ')}
        startIcon={<i className="fab fa-github" />}
        href={href}
        target="_blank"
    >
        GitHub
    </Button>
}

function LIDoc({ children, titulo = false }) {
    if (titulo) {
        return <LIDocTitulo>{children}</LIDocTitulo>;
    }
    return (<li>
        <FormatoDoc>
            {children}
        </FormatoDoc>
    </li>);
}

function LIDocTitulo({ children }) {
    if (Array.isArray(children)) {
        const titulo = children.shift();
        return (
            <LIDoc>
                <Typography variant="subtitle1">
                    <Resaltar>{titulo}:</Resaltar>
                </Typography>
                <Typography variant="subtitle2" style={{ marginLeft: "20px" }}>
                    <FormatoDoc>
                        {children}
                    </FormatoDoc>
                </Typography>
            </LIDoc>
        );
    }
    if (typeof children === 'string') {
        if (children.includes(":")) {
            const split = children.split(":");
            const titulo = split.shift();
            return (
                <LIDocTitulo>
                    {[
                        titulo,
                        split.join(":")
                    ]}
                </LIDocTitulo>
            );
        }
    }
    return <LiDoc>{children}</LiDoc>;
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