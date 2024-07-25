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