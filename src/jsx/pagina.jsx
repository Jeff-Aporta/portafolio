function envolventePagina({ children, style, className = "" }) {
    return (
        <ThemeProvider theme={themeSelected}>
            <CssBaseline />
            <div
                className={className}
                style={{
                    padding: "80px 50px",
                    ...style,
                }}
            >
                {children}
            </div>
        </ThemeProvider>
    );
}

function envolventeSeccion({ children, style, className = "", elevacion = 1 }) {
    return (
        <Paper
            elevation={elevacion}
            className={className}
            style={{
                padding: "30px",
                borderRadius: "20px",
                ...style,
            }}
        >
            {children}
        </Paper>
    );
}