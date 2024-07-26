const drawerWidth = 240;
const drawerWidthClosed = 60;

let tituloAppBar = "";

function MiniDrawer() {
    let BotonesOpcion = [
        {
            Texto: "Perfil",
            Icono: "fa-solid fa-user",
            accion: (cambiarURL) => {
                CambiarPagina(<PaginaPerfil />, "Perfil", cambiarURL);
            }
        },
        {
            divisor: true,
        },
        {
            Texto: "Proyectos",
            Icono: "fa-solid fa-tasks",
            accion: (cambiarURL) => {
                CambiarPagina(<PaginaProyectos />, "Proyectos", cambiarURL);
            }
        },
        {
            Texto: "Librerías",
            Icono: "fa-solid fa-book",
            accion: (cambiarURL) => {
                CambiarPagina(<PaginaLibrerias />, "Librerías", cambiarURL);
            }
        },
        {
            divisor: true,
        },
        {
            Texto: "Configuración",
            Icono: "fa-solid fa-cog",
            accion: (cambiarURL) => {
                CambiarPagina(<PaginaConfiguracion />, "Configuración", cambiarURL);
            }
        },
    ];

    let listaDePaginas = [
        {
            ID: "JFTP",
            accion: function (actualizarURL = true) {
                CambiarPagina(<PaginaLibreriaJFTP />, this.ID, actualizarURL);
            }
        },
        {
            ID: "ASCII Map Loader",
            accion: function (actualizarURL = true) {
                CambiarPagina(<PaginaASCIIMapLoader inclusionEnPortafolio={false} />, this.ID, actualizarURL);
            }
        }
    ]

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let [fadeType, setFadeType] = React.useState("in");

    const handleDrawerOpen = () => {
        document.querySelector('.contenedor-pagina').classList.add('ocultar');
        setOpen(true);
    };

    const handleDrawerClose = () => {
        if (!open) {
            return;
        }
        document.querySelector('.contenedor-pagina').classList.remove('ocultar');
        setOpen(false);
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
        >
            {mensajeSimple.SnackBar}
            <MenuSuperior />
            <MenuIzquierda />
            <div
                className="contenedor-pagina"
                onClick={handleDrawerClose}
                style={{
                    marginLeft: `${(open ? drawerWidth : drawerWidthClosed) + 5}px`,
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    [theme.breakpoints.down('sm')]: {
                        marginLeft: "none",
                    },
                }}
            >
                <Grow
                    in={fadeType == "in"}
                    timeout={500}
                    style={{
                        transformOrigin: fadeType == "in" ? '0 50dvh 0' : '100% 50dvh 0',
                    }}
                >
                    <div>
                        <DrawerHeader />
                        <div className="contenido">
                        </div>
                        <DrawerFooter />
                    </div>
                </Grow>
            </div>
        </div>
    );

    return {
        mensajeSimple,
        componente,
        BotonesOpcion,
        listaDePaginas,
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

    function CambiarPagina(pagina, titulo, cambiarURL = true) {
        if (tituloAppBar == titulo) {
            return;
        }
        cambiarTituloAppBar(titulo);
        setFadeType("out");

        setTimeout(() => {
            ReactDOM.render(
                pagina,
                document.querySelector('.contenedor-pagina .contenido')
            );
            setFadeType("in");
        }, 500);

        if (cambiarURL) {
            let url = new URL(window.location.href);
            url.searchParams.set("p", titulo);
            window.history.pushState({}, '', url);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 500);
        }
    }

    function MenuIzquierda() {
        return <Drawer
            variant="permanent"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ?
                        <i class="fa-solid fa-chevron-right"></i>
                        : <i class="fa-solid fa-close"></i>}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {BotonesOpcion.map((opcion, index) => (
                    <TooltipTheme
                        title={open ? "" : opcion.Texto}
                        placement="right"
                    >
                        {opcion.divisor ?
                            <React.Fragment>
                                <br />
                                <Divider />
                                <br />
                            </React.Fragment> :
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                selected={tituloAppBar == opcion.Texto}
                                onClick={() => {
                                    opcion.accion();
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <i
                                        className={opcion.Icono}
                                        style={{
                                            color: tituloAppBar == opcion.Texto ? "skyblue" : "inherit",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={(() => {
                                        if (tituloAppBar == opcion.Texto) {
                                            return <Resaltar>{opcion.Texto}</Resaltar>;
                                        }
                                        return opcion.Texto;
                                    })()}
                                    sx={{
                                        opacity: open ? 1 : 0,
                                    }}
                                />
                            </ListItemButton>}
                    </TooltipTheme>
                ))}
            </List>
        </Drawer>;
    }

    function MenuSuperior() {
        return <AppBar
            className="app-bar"
            open={open}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <i class="fa-solid fa-bars"></i>
                </IconButton>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Typography
                        className="titulo-app-bar"
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <Titulo texto={tituloAppBar} />
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <ButtonGroup
                            color="primary"
                            style={{
                                transform: 'scale(0.8)',
                                transformOrigin: 'right',
                            }}
                        >
                            <Button
                                size="small"
                                variant="contained"
                                href="https://t.me/canalAporta"
                                target="_blank"
                                startIcon={<i class="fa-brands fa-telegram" />}
                                style={{ backgroundColor: "hsla(200, 100%, 50%, 0.6)" }}
                            >
                                Canal de Telegram
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                href="https://wa.link/1tmqmt"
                                target="_blank"
                                startIcon={<i class="fa-brands fa-whatsapp" />}
                                style={{ backgroundColor: "hsla(120, 100%, 50%, 0.6)" }}
                            >
                                WhatsApp
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </Toolbar>
        </AppBar>;
    }

    function cambiarTituloAppBar(nuevoTitulo) {
        tituloAppBar = nuevoTitulo;
        document.querySelector('title').innerText = `${nuevoTitulo} | Jeffrey Agudelo`;

        nuevoTitulo.split("").forEach((letra, index) => {
            setTimeout(() => {
                ReactDOM.render(
                    (() => {
                        if (index < tituloAppBar.length - 1) {
                            return <Resaltar>
                                <Titulo texto={tituloAppBar.slice(0, index + 1)} />
                            </Resaltar>;
                        }
                        return <Titulo texto={tituloAppBar.slice(0, index + 1)} />
                    })(),
                    document.querySelector('.titulo-app-bar')
                );
            }, 60 * index);
        });
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