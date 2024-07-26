function Titulo({ texto, children }) {
    if (children && !texto) {
        texto = children;
    }
    return <React.Fragment    >
        <i class="fa-solid fa-greater-than" />
        {(() => {
            if (texto) {
                return <React.Fragment>
                    &nbsp;
                    {texto}
                    &nbsp;
                </React.Fragment>;
            }
        })()}
        <i className="fa-solid fa-window-minimize titilar_anim" />
    </React.Fragment>;
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
    return (
        <Code
            {...props}
            linenumbers={false}
            className="solo-texto mini"
            esCopiable={false}
        />
    );
}

function Code({
    nocode = false,
    language,
    linenumbers = true,
    children,
    className = "",
    style = {},
    esCopiable = true,
    onCopy = () => 0,
}) {
    let idR = Math.random().toString().replace("0.", "idR-");
    return (<pre
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
            position: "relative",
            margin: "40px 0",
            ...style,
        }}
    >
        {esCopiable ? <BotonCopiar /> : ""}
        {children}
    </pre >);

    function BotonCopiar() {
        return <TooltipTheme
            title="Copiar"
            placement="left"
        >
            <Button
                variant="contained"
                style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    padding: "10px",
                    minWidth: "0",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 200, 255, 0.2)",
                }}
                onClick={() => {
                    navigator.clipboard.writeText(document.getElementById(idR).innerText);
                    onCopy();
                }}
            >
                <i className="fa-solid fa-copy" />
            </Button>
        </TooltipTheme>;
    }
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
        <Button
            variant="contained"
            href="https://jeff-aporta.github.io/portafolio/"
            target="_blank"
            style={{
                backgroundColor: "midnightblue",
                border: "1px solid #333",
            }}
            startIcon={<i className="fa-solid fa-briefcase" />}
        >
            Web Jeffrey Agudelo
        </Button>
    );
}