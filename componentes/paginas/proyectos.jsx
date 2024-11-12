JS2CSS.insertStyle({
  objJs: {
    ".tarjeta-proyecto": {
      ".portada-proyecto": {
        backgroundSize: "102%",
        transition: "all 0.5s",
        cursor: "pointer",

        ".boton-play": {
          display: "none !important",
        },

        "&:hover": {
          ".boton-play": {
            display: "flex !important",
          },
        },
      },

      "&:hover": {
        ".portada-proyecto": {
          backgroundSize: "120%",
          transition: "all 0.5s",
        },
      },
    },
  },
});

function PaginaProyectos() {
  return (
    <ThemeProvider theme={themeSelected}>
      <div
        style={{
          padding: "80px 50px",
        }}
      >
        <h1
          style={{
            fontSize: "300%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <i
            className="fa-brands fa-js"
            style={{
              fontSize: "150%",
              color: "yellow",
            }}
          />{" "}
          JavaScript
        </h1>

        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {[
            {
              imagen: "src/imgs/Proyectos/Memorama-prev.png",
              titulo: { icono: "fa-solid fa-brain", titulo: "Memorama" },
              descripcion:
                "Juego de memoria donde tienes que encontrar las parejas de cartas iguales.",
              youtube: "https://www.youtube.com/embed/n8ujo9spBR4",
              github: "memorama",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Juego-trivia-prev.jpg",
              titulo: {
                icono: "fa-regular fa-circle-question",
                titulo: "Juego de preguntas",
              },
              descripcion:
                "Juego de preguntas y respuestas con diferentes categorías.",
              youtube: "https://www.youtube.com/embed/HHDCktzuUCk",
              github: "juego-trivia-v1",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Juego-Trivia-v2-prev.jpg",
              titulo: {
                icono: "fa-regular fa-circle-question",
                titulo: "Juego de preguntas v2",
              },
              descripcion:
                "Juego de preguntas y respuestas con diferentes categorías. segunda versión.",
              youtube: "https://www.youtube.com/embed/HHDCktzuUCk",
              github: "juego-trivia-v2",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Buscaminas-prev.jpg",
              titulo: {
                icono: "fa-solid fa-puzzle-piece",
                titulo: "Buscaminas",
              },
              descripcion: "Implementación del juego de buscaminas.",
              youtube: "https://www.youtube.com/embed/xwapo6FFhnQ",
              github: "juego-buscaminas",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Pong-prev.jpg",
              titulo: {
                icono: "fa-solid fa-table-tennis-paddle-ball",
                titulo: "Pong solitario",
              },
              descripcion: "Juego de pong para un solo jugador.",
              youtube: "https://www.youtube.com/embed/MCEl05ZbZ80",
              github: "juego-pong-solitario",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Juego-conway-prev.jpg",
              titulo: {
                icono: "fa-solid fa-infinity",
                titulo: "Juego de la vida",
              },
              descripcion: "Implementación del juego de la vida de Conway.",
              youtube: "https://www.youtube.com/embed/JA3dvpNbUJs",
              github: "juego-de-la-vida",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Starfield-prev.jpg",
              titulo: { icono: "fa-solid fa-film", titulo: "Starfield" },
              descripcion:
                "Efecto de campo de estrellas en movimiento, icónico del screensaver de Windows 95.",
              youtube: "https://www.youtube.com/embed/SDnhXcOZiXM",
              github: "animacion-starfield",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/caida-de-nieve-prev.jpg",
              titulo: { icono: "fa-solid fa-film", titulo: "Caida de nieve" },
              descripcion: "Efecto de caida de nieve en movimiento.",
              youtube: "https://www.youtube.com/embed/TOPe7fdwUAo",
              github: "animacion-caida-de-nieve",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Snake-game-prev.jpg",
              titulo: { icono: "fa-solid fa-gamepad", titulo: "Snake game" },
              descripcion: "Implementación básica del juego de la serpiente.",
              youtube: "https://www.youtube.com/embed/wgSjVMmkLC0",
              github: "juego-snake",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/mandelbrot-prev.jpg",
              titulo: { icono: "fa-solid fa-infinity", titulo: "Mandelbrot" },
              descripcion: "Implementación del conjunto de Mandelbrot.",
              youtube: "https://www.youtube.com/embed/SW0dq_DzeWk",
              github: "algoritmo-mandelbrot",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/Epicicloides-prev.jpg",
              titulo: { icono: "fa-solid fa-infinity", titulo: "Epicicloides" },
              descripcion:
                "Implementación de epicicloides con tablas de multiplicar, una curisidad matemática llevada a la programación.",
              youtube: "https://www.youtube.com/embed/TtQaSRsS2bM",
              github: "algoritmo-epicicloides-con-tablas-de-multiplicar",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/arboles-fractal-prev.jpg",
              titulo: {
                icono: "fa-solid fa-infinity",
                titulo: "Arboles fractal",
              },
              descripcion:
                "Implementación de arboles fractales con recursividad.",
              youtube: "https://www.youtube.com/embed/noe_P35Md5M",
              github: "algoritmo-arboles-fractal",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/tetris-prev.jpg",
              titulo: { icono: "fa-solid fa-gamepad", titulo: "Tetris" },
              descripcion: "Implementación básica del juego de tetris.",
              youtube: "https://www.youtube.com/embed/y_rnUOHUoQ4",
              github: "juego-tetris",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/peces-prev.jpg",
              titulo: { icono: "fa-solid fa-film", titulo: "Peces" },
              descripcion:
                "Efecto de peces animados en un estanque, con vista cenital.",
              youtube: "https://www.youtube.com/embed/0cvC6XRYz24",
              github: "peces-javascript",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/tierra-prev.png",
              titulo: { icono: "fa-solid fa-film", titulo: "Tierra y luna" },
              descripcion:
                "Animación de la tierra y la luna en movimiento, con tecnología WebGL para renderizado 3D.",
              youtube: "https://www.youtube.com/embed/ijqsaG5qp3Y",
              github: "tierra",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
            {
              imagen: "src/imgs/Proyectos/carros-prev.png",
              titulo: {
                icono: "fa-solid fa-car-side",
                titulo: "Carros 3D (Three.js)",
              },
              descripcion:
                "Juego 3D programado con Three.js, donde hay que acelerar y frenar para no chocar con los carros de la autopista.",
              youtube: "https://www.youtube.com/embed/GKFJajmz_dg",
              github: "animaci-n-de-carros",
              lenguaje: "js",
              color_lenguaje: "yellow",
            },
          ].map((proyecto) => (
            <Tarjeta {...proyecto} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );

  function TituloProyecto({ icono, titulo }) {
    return (
      <span>
        <IconoRedondo icono={icono} />
        <EspacioVertical />
        <Resaltar>{titulo}</Resaltar>
        <EspacioVertical />
      </span>
    );
  }

  function Tarjeta({
    imagen,
    titulo,
    descripcion,
    youtube,
    github,
    lenguaje,
    color_lenguaje,
  }) {
    return (
      <div
        className="tarjeta-proyecto"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Paper
          elevation={3}
          style={{
            position: "relative",
            borderRadius: "30px",
            overflow: "hidden",
            width: "300px",
            backgroundColor: "rgba(0, 0, 100, 0.2)",
          }}
        >
          <DegradadoVertical opacity={0.5} />
          <div>
            <div
              className="portada-proyecto"
              style={{
                position: "relative",
                backgroundImage: `url("${imagen}")`,
                backgroundPosition: "center",
                width: "100%",
                height: "150px",
                zIndex: 0,
              }}
            >
              <DegradadoVertical />
              {(() => {
                if (lenguaje) {
                  return (
                    <div
                      style={{
                        color: color_lenguaje ?? "inherit",

                        position: "absolute",
                        display: "inline-block",
                        top: "5px",
                        right: "10px",

                        scale: "0.8",
                        transformOrigin: "top right",
                      }}
                    >
                      <IconoRedondo
                        icono={`fa-brands fa-${lenguaje.toLowerCase()}`}
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        padding="10px"
                        marginRight="0"
                      />
                    </div>
                  );
                }
              })()}
              <div
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="boton-play"
                onClick={() => {
                  VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.Iframe({
                    url: `https://jeff-aporta.github.io/${github}`,
                    titulo: `${titulo.titulo} | Demo`,
                  });
                }}
              >
                <IconoRedondo
                  icono="fa-solid fa-play"
                  backgroundColor="rgba(0,0,0,0.65)"
                  padding="25px"
                  marginRight="0"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              padding: "30px",
              marginTop: "-60px",

              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "light",
              }}
            >
              <TituloProyecto icono={titulo.icono} titulo={titulo.titulo} />
            </span>

            <div
              style={{
                fontSize: "small",
                padding: "10px 0",
              }}
            >
              {descripcion}
            </div>

            <EspacioVertical height="90px" />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              padding: "20px",
            }}
          >
            <HrGrueso width="20%" centrar />

            <EspacioVertical height="20px" />

            <center>
              <ButtonGroup
                style={{
                  borderRadius: "30px",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  scale: "0.8",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.Iframe({
                      url: youtube,
                      titulo: "Ventana flotante tipo Windows",
                    });
                  }}
                  startIcon={<i className="fa-brands fa-youtube" />}
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  YouTube
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  href={`https://github.com/Jeff-Aporta/${github}`}
                  target="_blank"
                  startIcon={<i className="fa-brands fa-github" />}
                  style={{
                    backgroundColor: "black",
                  }}
                >
                  Github
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  href={`https://jeff-aporta.github.io/${github}`}
                  target="_blank"
                  startIcon={<i className="fa-solid fa-globe" />}
                  style={{
                    backgroundColor: "rgb(0, 30, 80)",
                  }}
                >
                  Demo
                </Button>
              </ButtonGroup>
            </center>
          </div>
        </Paper>
      </div>
    );
  }

  function DegradadoVertical({ opacity = 0.85 }) {
    return (
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ${opacity}))`,
          color: "white",
          padding: "10px",

          pointerEvents: "none",
        }}
      />
    );
  }
}
