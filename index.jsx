

let esquemaContenido;

function App() {
    esquemaContenido = MiniDrawer();
    return (
        esquemaContenido.componente
    );
}

ReactDOM.render(
    <ThemeProvider theme={themeSelected}>
        <CssBaseline />
        <App />
    </ThemeProvider >,
    document.querySelector('body .app')
);

function TituloH2({ texto, children }) {
    return <h2>
        <Titulo texto={texto}>
            {children}
        </Titulo>
    </h2>
}

function IconoRedondo({
    backgroundColor = 'dodgerblue',
    padding = '10px',
    marginRight = '20px',
    icono,
}) {
    return <div
        style={{
            fontSize: '200%',
            aspectRatio: '1/1',
            display: 'inline-flex',
            padding,
            backgroundColor,
            borderRadius: '50%',
            marginRight,
        }}
    >
        <i className={icono} />
    </div>;
}