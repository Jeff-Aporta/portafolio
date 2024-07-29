function EnvolventePagina(props) {
    activadorCSSdeComponente(props);
    return (
        <ThemeProvider theme={themeSelected}>
            <CssBaseline />
            <div
                {...props}
                children={undefined}
                className="pagina"
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
    return (
        <Paper
            {...props}
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