function EnvolventePagina(props) {
    activadorCSSdeComponente(props);
    return (
        <ThemeProvider theme={themeSelected}>
            <CssBaseline />
            <div
                {...props}
                className="pagina"
            />
        </ThemeProvider>
    );
}

function SubEnvolventeSeccion(props) {
    if (!props.elevation) {
        props.elevation ??= 2;
    }
    return <EnvolventeSeccion
        {...props}
        className="subseccion"
    />;
}

function EnvolventeSeccion(props) {
    props.elevation ??= 1;
    activadorCSSdeComponente(props);
    return (
        <Paper
            {...props}
            className="seccion"
        />
    );
}

function activadorCSSdeComponente(props) {
    props.style ??= {};
    Object.assign(props.style, {
        ...(()=>{
            const style = {};
            if (props.relative) {
                style.position = "relative";
            }
            return style;
        })()
    });
}