function TituloH2({ texto, children }) {
    return <h2>
        <Titulo texto={texto}>
            {children}
        </Titulo>
    </h2>
}

function BRO({x="x<500px"}){
    return <br
        className={CSScmds(`
            ${x}?display: (none,);
        `)}
    />
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