function Titulo({ texto, children }) {
    if (children && !texto) {
        texto = children;
    }
    const [iz, der] = (() => {
        const a = <i className="fa-solid fa-greater-than" />;
        if (windowWidth < 700 && texto) {
            return ["", ""];
        }
        if (windowWidth < 800 && texto) {
            return [a, ""];
        }
        return [
            a,
            <i className="fa-solid fa-window-minimize titilar_anim" />,
        ]
    })();

    return <span
        className={CSScmds(`
                700px<x<1000px?font-size: [80%,90%,100%];
            `,
            "anim1s"
        )}
    >
        {iz}
        {(() => {
            if (texto) {
                return <React.Fragment>
                    {iz ? " " : ""}
                    {texto}
                    {der ? " " : ""}
                </React.Fragment>;
            }
        })()}
        {der}
    </span>;
}

function HrGrueso({ grosor = 5, color = "white", width = "100%", centrar = false }) {
    return <hr
        className={CSScmds(`
            400px<-x->1000px?border: [${grosor / 1.5}px, ${grosor}px] solid ${color};
        `)}
        style={{
            width,
            borderRadius: '10px',
            margin: centrar ? '0 auto' : '0',
        }} />;
}

function Resaltar({ children, color = "skyblue" }) {
    return <b
        style={{
            color,
        }}
    >
        {children}
    </b>;
}

function EspacioVertical({ height = '20px' }) {
    return <div
        style={{
            height,
        }} />;
}

function CodeInline(props) {
    return <Code
        {...props}
        linenumbers={false}
        className={`solo-texto mini ${props.className ? props.className : ""}`}
        esCopiable={false}
    />
}

function Code({
    nocode = false,
    language,
    linenumbers = true,
    children,
    className = "",
    style = {},
    esCopiable = true,
    scroll = true,
    onCopy = () => 0,
}) {
    let idR = Math.random().toString().replace("0.", "idR-");

    let { multiLinea, str } = removerTabulacionesDeCodigo(children);

    children = str;

    linenumbers = (linenumbers && ((Array.isArray(children) && children.length > 1) || multiLinea));

    const precode = (
        <pre
            id={idR}
            className={`
                prettyprint 
                ${nocode ?
                    "nocode" :
                    language ?
                        `lang-${language}` :
                        ""
                }
                ${linenumbers && !nocode ? "linenums:1" : ""}
                ${className}
            `}
            style={{
                ...style,
            }}
        >
            {removerTabulacionesDeCodigo(children).str}
        </pre >
    );

    if (!scroll) {
        return precode;
    }

    return (
        <div className="code-component">
            <div className={`code-container ${className}`}>
                {precode}
            </div>
            {esCopiable ? <BotonCopiar /> : ""}
        </div>
    );

    function BotonCopiar() {
        return (
            <div
                style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                }}
            >
                <TooltipTheme
                    title="Copiar"
                    placement="left"
                >
                    <Button
                        variant="contained"
                        style={{
                            padding: "15px",
                            minWidth: "0",
                            borderRadius: "50%",
                            backgroundColor: "rgba(40, 40, 80)",
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(document.getElementById(idR).innerText);
                            onCopy();
                        }}
                    >
                        <i className="fa-solid fa-copy" />
                    </Button>
                </TooltipTheme>
            </div>
        );
    }
}

function removerTabulacionesDeCodigo(str) {
    let multiLinea = false;
    if (typeof str == "string") {
        str = str.split("\n");
        while (str[0].trim() == "") {
            str.shift();
        }
        while (str[str.length - 1].trim() == "") {
            str.pop();
        }
        if (str.length > 1) {
            multiLinea = true;
        }

        let espaciosAlInicio = str.find((linea) => linea.trim()).match(/^\s*/)[0].length ?? 0;

        str = str.map((linea) => {
            return linea.split("").reduce((acumulado, caracter, index) => {
                if (index < espaciosAlInicio && caracter == " ") {
                    return acumulado;
                }
                return acumulado + caracter;
            }, "");
        }).join("\n");
    }
    return {
        multiLinea,
        str
    };
}

function ChipCode(props) {
    let label = props.label;
    delete props.label;
    return (
        <Chip
            {...props}
            style={{
                backgroundColor: props.nocode ? "rgba(0,0,0,0.4)" : "black",
                color: "white",
            }}
            label={
                <Code
                    className={`
                        solo-texto
                        ${props.nocode ? "nocode" : ""}
                    `}
                    linenumbers={false}
                    esCopiable={false}
                >
                    {label}
                </Code>
            }
        />
    );
}

function BotonLinkPortafolio() {
    return (
        <ThemeProvider theme={themeSelected}>
            <Paper
                style={{
                    textAlign: "center",
                    padding: "40px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch",
                    gap: "20px",

                }}
            >
                <Portafolio />
            </Paper>
        </ThemeProvider>
    );

    function Social() {
        return (
            <div
                style={{
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",

                    gap: "30px",

                    fontSize: "40px",

                    scale: "0.85",
                }}
            >
                <IconoSocial
                    icono="fa-brands fa-whatsapp"
                    tooltip="WhatsApp"
                    outlineColor="green"
                    url="https://wa.link/1tmqmt"
                />

                <IconoSocial
                    icono="fa-brands fa-youtube"
                    tooltip="YouTube"
                    outline="8px"
                    iconoColor="red"
                    outlineColor="white"
                    url="https://www.youtube.com/@JeffAporta"
                />
            </div>
        );

        function IconoSocial({ icono, tooltip, iconoColor = "white", outline = "15px", outlineColor = "black", url = "" }) {
            const pstyle = {
                position: "absolute",
                top: "0",
                left: "0",
            };
            return (
                <TooltipTheme
                    title={tooltip}
                    placement="right"
                >
                    <Link
                        href={url}
                        target="_blank"
                        underline="none"
                    >
                        <span
                            style={{
                                position: "relative",
                            }}
                        >
                            <i
                                className={icono}
                                style={{
                                    ...pstyle,
                                    WebkitTextStroke: `${outline} ${outlineColor}`,
                                }}
                            />
                            <i
                                className={icono}
                                style={{
                                    ...pstyle,
                                    color: iconoColor,
                                }}
                            />
                            <i
                                className={icono}
                                style={{
                                    opacity: "0",
                                }}
                            />
                        </span>
                    </Link>
                </TooltipTheme>
            );
        }
    }

    function Portafolio() {
        return (
            <div
                style={{
                    display: "inline-block",
                    padding: "20px",
                    border: "10px solid #333",
                    borderRadius: "25px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <img
                        src="https://jeff-aporta.github.io/portafolio/src/imgs/jeff-profile.png"
                        style={{
                            background: "black",
                            width: "100px",
                            aspectRatio: "1/1",
                            borderRadius: "50%",
                            objectFit: "cover",
                            objectPosition: "right",
                            backgroundImage: "url(https://jeff-aporta.github.io/portafolio/src/imgs/back.gif)",
                            backgroundSize: "cover",
                            backgroundBlendMode: "hard-light",
                            border: "2px solid white",
                        }}
                    />
                    <Social />
                </div>
                <EspacioVertical height="10px" />
                <Typography variant="h5">
                    Puedes ver más de mi trabajo en mi
                </Typography>
                <EspacioVertical height="10px" />
                <Button
                    variant="outlined"
                >
                    <Link
                        href="https://jeff-aporta.github.io/portafolio/"
                        target="_blank"
                        underline="none"
                    >
                        <Typography variant="h4">
                            <b>
                                Portafolio
                            </b>
                        </Typography>
                        <Typography variant="h6">
                            <small>
                                (Jeffrey Agudelo)
                            </small>
                        </Typography>
                    </Link>
                </Button>
            </div>
        );
    }
}