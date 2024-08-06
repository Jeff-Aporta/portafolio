const drawerWidth = "var(--drawer-open-w)";
const drawerWidthClosed = "var(--drawer-close-w)";

let MiniDrawerDriver;

crearEstilo({
    "body": {
        transition: themeSelected.transitions.create('padding', {
            easing: themeSelected.transitions.easing.sharp,
            duration: themeSelected.transitions.duration.leavingScreen,
        }),
    },
})

window.navigation.addEventListener("navigate", (e) => {
    let href = e.destination.url;
    if (_URL != href) {
        if (href.includes("#")) {
            href = href.split("#")[0];
            setTimeout(() => {
                window.history.replaceState({}, '', href);
            }, 100);
        }
        _URL = href;
        MiniDrawerDriver.setPagina(parametroURL({ url: href }));
    }
});

const tiempoTransicionPagina = 250;

function miniDrawer({ estados, navegadorIzquierda }) {
    const idR = Math.random().toString().replace("0.", "idR-");

    let [_, update] = React.useState();
    let [Pagina, setPagina] = React.useState(parametroURL());
    let [menuOpen, setMenuOpen] = React.useState(false);
    let [effectGrowState, setEffectGrowState] = React.useState("in");
    let [effectFadeState, setEffectFadeState] = React.useState("in");

    React.useEffect(() => {
        const handleResize = () => {
            update(windowWidth = window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (menuOpen) {
        document.body.classList.add("menu-abierto");
        document.body.classList.remove("menu-cerrado");
    } else {
        document.body.classList.add("menu-cerrado");
        document.body.classList.remove("menu-abierto");
    }

    navegadorIzquierda = navegadorIzquierda.map((pagina) => estados[pagina] ?? { divisor: true });

    const botonMenu = (() => {
        if (menuOpen) {
            return;
        }
        return (
            <Button
                color="inherit"
                aria-label="open drawer"
                onClick={() => setMenuOpen(true)}
                edge="start"
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,

                    minWidth: 0,
                    fontSize: "150%",
                    width: "var(--drawer-close-w)",
                    height: "var(--drawer-h)",
                    padding: "20px",
                    zIndex: 2000,
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </Button>
        );
    })();

    const botonMenuEspacio = (() => {
        return (
            <Button
                color="inherit"
                aria-label="open drawer"
                disabled
                edge="start"
                sx={{
                    minWidth: 0,
                    fontSize: "150%",
                    width: "var(--drawer-close-w)",
                    height: "var(--drawer-h)",
                    padding: "20px",
                    marginRight: 4,
                    opacity: 0,
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </Button>
        );
    })();



    const cambioPaginaGenerico = function () {
        if (estados[Pagina] == this) {
            return;
        }

        setTituloMenuSuperior("");
        setEffectGrowState("out");

        const animarTitulo = () => {
            this.titulo.split("").forEach((_, index) => {
                index++;
                setTimeout(() => {
                    setTituloMenuSuperior(this.titulo.slice(0, index));
                }, 60 * index);
            });
        }

        setTimeout(() => {
            setEffectGrowState("in");
            for (let p of new URLSearchParams(window.location.search).keys()) {
                if (p == "p") {
                    continue;
                }
                if (estadoActual.parametrosUso) {
                    if (!estadoActual.parametrosUso.includes(p)) {
                        actualizarParametro({ id: p });
                    }
                }
            }

            const id = Object.entries(estados).find(([id, pagina]) => pagina == this)?.[0] ?? "Perfil";
            setPagina(id);
            actualizarParametro({ id: "p", valor: id });
            animarTitulo();
        }, tiempoTransicionPagina);
    };

    Object.values(estados).forEach((pagina) => {
        pagina.style = {};
        pagina.seleccionar = cambioPaginaGenerico.bind(pagina);
    });

    let s = Object.entries(estados).find(([id, _]) => id == Pagina);
    if (s) {
        s = s[1];
        s.selected = true;
        s.style.color = "skyblue";
    }


    const estadoActual = estados[Pagina];
    const titulo = estadoActual.titulo;

    let [tituloMenuSuperior, setTituloMenuSuperior] = React.useState(titulo);

    document.querySelector('title').innerText = `${titulo} | Jeffrey Agudelo`;

    const theme = useTheme();

    const handleDrawerClose = () => {
        setMenuOpen(false);
    };

    document.addEventListener('keydown', (e) => {
        if (e.key == "Escape") {
            handleDrawerClose();
        }
    });

    let mensajeSimple = SimpleSnackbar();

    let componente = (
        <div
            className="esquema-principal"
            id={idR}
        >
            {botonMenu}
            {mensajeSimple.SnackBar}
            <MenuSuperior />
            <MenuIzquierda />
            <Slide
                in={estadoActual.menuInferior && effectGrowState == "in"}
                timeout={tiempoTransicionPagina * 1.3}
                direction="up"
                style={{
                    transitionDelay: estadoActual.menuInferior && effectGrowState == "in" ? '500ms' : '0ms'
                }}
            >
                <Paper
                    className={`
                        menu-inferior
                        contenido-fijo full-width
                        ${menuOpen ? "ocultar" : ""}
                    `}
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        borderTop: '2px solid ' + themeSelected.palette.grey["800"],
                    }}
                >
                    <MenuInferior />
                </Paper>
            </Slide>
            <div
                className={`
                    contenedor-pagina
                    ${menuOpen ? "ocultar" : ""}
                `}
                onClick={handleDrawerClose}
                style={{
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    [theme.breakpoints.down('sm')]: {
                        marginLeft: "none",
                    },
                }}
            >
                <Slide
                    direction="right"
                    in={effectGrowState == "in"}
                    timeout={tiempoTransicionPagina}
                    style={{
                        transformOrigin: effectGrowState == "in" ? '0 50dvh 0' : '100% 50dvh 0',
                    }}
                >
                    <div>
                        <Fade
                            in={effectFadeState == "in"}
                            timeout={tiempoTransicionPagina / 4}
                        >
                            <div>
                                <div className="contenido">
                                    {estadoActual.componente()}
                                </div>
                                <DrawerFooter />
                            </div>
                        </Fade>
                    </div>
                </Slide>
            </div>
            <div className="capa-1">
                {(() => {
                    if (!menuOpen || windowWidth < 850) {
                        return;
                    }
                    return (
                        <div
                            style={{
                                textAlign: "center",
                                opacity: 0.2,
                            }}
                        >
                            <img
                                src="src/imgs/logo-dev.png"
                                style={{
                                    maxWidth: "90%",
                                    filter: "sepia(100%) hue-rotate(190deg) saturate(300%)",
                                }}
                            />
                            <br />
                            <b>
                                Jeffrey Agudelo.
                            </b>
                        </div>
                    );
                })()}
            </div>
        </div>
    );

    function fadding(f) {
        setEffectFadeState("out");
        setTimeout(() => {
            setEffectFadeState("in");
            f();
        }, tiempoTransicionPagina);
    }

    return {
        mensajeSimple,
        componente,
        estados,
        setPagina,
        fadding,
        update: () => update(Math.random()),
    }

    function MenuInferior() {
        if (!estadoActual.menuInferior) {
            return;
        }
        return <BottomNavigation
            showLabels
            value={estadoActual.menuInferior.calcIndex()}
            onChange={estadoActual.menuInferior.onChange}
            sx={{
                backgroundColor: themeSelected.palette.background.default,
                fontSize: '200%',
            }}
        >
            {
                Object.values(estadoActual.menuInferior.opciones).map((opcion, index) => {
                    return <BottomNavigationAction
                        label={opcion.label}
                        icon={<i className={opcion.icono} style={{ fontSize: '150%' }} />}
                        style={{
                            display: (opcion.ocultarSiEstaSeleccionado && estadoActual.menuInferior.calcIndex() == index) ? "none" : "flex",
                            ...(() => {
                                if (opcion.style) {
                                    return opcion.style;
                                }
                                return {};
                            })()
                        }}
                    />
                })
            }
        </BottomNavigation>
    }

    function DrawerFooter() {
        return <div
            style={{
                padding: "50px 20px 200px 20px",
            }}
        >
            <HrGrueso width="90%" centrar />
        </div>;
    }

    function MenuIzquierda() {
        return <Drawer
            variant="permanent"
            open={menuOpen}
        >
            <DrawerHeader
                sx={{
                    borderBottom: menuOpen ? '1px solid rgba(255, 255, 255, 0.5)' : '',
                }}
            >
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    {(() => {
                        if (!menuOpen) {
                            return;
                        }
                        return (
                            <Button
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => handleDrawerClose()}
                                edge="start"
                                sx={{
                                    minWidth: 0,
                                    fontSize: "150%",
                                    width: "var(--drawer-close-w)",
                                    height: "var(--drawer-h)",
                                    padding: "20px",
                                }}
                            >
                                <i className="fa-solid fa-close"></i>
                            </Button>
                        );
                    })()}
                </div>
            </DrawerHeader>
            <Divider />
            <List
                className={CSScmds(`
                    x<700px?padding: (0 ${menuOpen ? "20px" : "0"}, 0 ${menuOpen ? "10px" : "0"}),
                `)}
            >
                <EspacioVertical height="15px" />
                {navegadorIzquierda.map(opcion => (
                    <TooltipTheme
                        title={menuOpen ? "" : opcion.titulo}
                        placement="right"
                    >
                        {opcion.divisor ?
                            <React.Fragment>
                                <EspacioVertical height="10px" />
                                <hr
                                    style={{
                                        opacity: 0.2,
                                    }}
                                />
                                <EspacioVertical height="10px" />
                            </React.Fragment> :
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: menuOpen ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={opcion.selected}
                                onClick={() => {
                                    handleDrawerClose();
                                    opcion.seleccionar();
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: menuOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <i
                                        className={opcion.Icono}
                                        style={opcion.style}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={(
                                        <b
                                            style={opcion.style}
                                        >
                                            {opcion.titulo}
                                        </b>
                                    )}
                                    sx={{
                                        opacity: menuOpen ? 1 : 0,
                                    }}
                                />
                            </ListItemButton>}
                    </TooltipTheme>
                ))}
                {(() => {
                    if (!menuOpen) {
                        return;
                    }
                    return (
                        <React.Fragment>
                            <EspacioVertical height="10px" />
                            <hr
                                style={{
                                    opacity: 0.2,
                                }}
                            />
                            <EspacioVertical height="15px" />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                {Object.values(_social_).map((social) => {
                                    return (
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            style={{
                                                margin: "3px 0",
                                                backgroundColor: social.color,
                                            }}
                                            startIcon={<i className={social.icon} />}
                                            href={social.href}
                                            target="_blank"
                                        >
                                            {social.txt}
                                        </Button>
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    )
                })()}
            </List>
        </Drawer>;
    }

    function MenuSuperior() {
        return <AppBar
            className={CSScmds(`
                    x<700px?background-color: [hsl(240, 100%, 5%),hsl(240, 100%, 10%)],
                `,
                "app-bar menu-arriba"
            )}
            open={menuOpen}
            style={{
                height: "var(--drawer-h)",
            }}
        >
            <Toolbar
                style={{
                    paddingLeft: "0px",
                    height: "var(--drawer-h)",
                }}
            >
                {(() => {
                    if (menuOpen) {
                        return (
                            <div style={{ padding: "7px" }} />
                        );
                    }
                    return botonMenuEspacio;
                })()}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Typography
                        className="titulo-menu-superior"
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <Titulo texto={tituloMenuSuperior} />
                    </Typography>

                    {(() => {
                        if (windowWidth < 700 || menuOpen) {
                            return;
                        }
                        return (
                            <MenuDesplegable
                                className={CSScmds(`
                                    x<700px?display: (none,),
                                `)}
                                contenido={Object.values(_social_)}
                                txt={"Social"}
                                icon={"fa-solid fa-globe"}
                            />
                        )
                    })()}
                </div>
            </Toolbar>
        </AppBar>;
    }
}

function TooltipTheme(props) {
    return <Tooltip
        {...props}
        componentsProps={{
            tooltip: {
                sx: {
                    bgcolor: themeSelected.palette.grey[800],
                    color: themeSelected.palette.text.primary,
                    padding: "10px",
                    '& .MuiTooltip-arrow': {
                        color: themeSelected.palette.grey[800],
                    },
                },
            },
        }}
    />;
}

function SeparadorVertical() {
    return <div
        style={{
            width: '1px',
            height: '100%',
            borderRight: '1px solid white',
            fontSize: '40px',
            opacity: 0.3,
        }}
    >
        &nbsp;
    </div>;
}

function SimpleSnackbar() {
    let [mensaje, setMensaje] = React.useState("Hola");
    const [open, setOpen] = React.useState(false);

    const mostrarMensaje = (texto) => {
        setMensaje(texto);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <i
                className="fa-solid fa-times"
                style={{
                    color: "deepskyblue",
                    padding: "0 10px",
                }}
            />
        </IconButton>
    );

    const vertical = 'bottom';
    const horizontal = 'right';

    return {
        mostrarMensaje,
        SnackBar: <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={mensaje}
            action={action}
            ContentProps={{
                sx: {
                    background: "hsl(240, 50%, 30%)",
                    color: themeSelected.palette.text.primary,
                }
            }}
        />
    };
}