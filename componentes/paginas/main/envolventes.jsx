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

function SubEnvolventeSeccion(props, lvl=2) {
    return <EnvolventeSeccion
        {...props}
        lvl={lvl}
        className="subseccion"
    />;
}

function EnvolventeSeccion(props, lvl=1) {
    props.elevation = lvl;
    activadorCSSdeComponente(props);
    return (
        <Paper
            {...props}
            children={undefined}
            className="seccion"
        >
            {props.children}
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