function PaginaPerfil() {

  return (
    <ThemeProvider theme={themeSelected}>
      <div>
        <Seccion1 />
        <Seccion2 />
        <Seccion3 />
      </div>
    </ThemeProvider>
  );

  function Seccion3() {
    return <div
      className={CSScmds(`
          400px<-x->1000px?padding: [10px, 50px] [10px, 30px];
      `)}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <EsquemaEmpresa empresa={_Registel_} derecha={false} />
      <EsquemaEmpresa empresa={_ISeeCI_} />
      <EsquemaEmpresa empresa={_ELCINCO_} derecha={false} />
    </div>;
  }

  function EsquemaEmpresa({
    empresa,
    derecha = true,
  }) {
    const Detalles = (() => {
      if (windowWidth < 900) {
        return AcordeonEmpresa(empresa.detalles);
      }
      return verticalTabsEmpresa(empresa.detalles);
    })();
    return (<p>
      <p>
        <Typography
          variant="h5"
          style={{
            textAlign: !derecha ? "right" : "left",
          }}
        >
          <Titulo texto="Experiencia Laboral" />
        </Typography>

      </p>

      <hr />
      <br />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          className={CSScmds(`
              x<950px?{
                  text-align: (left, ${derecha ? "left" : "right"});
                  flex-direction: (row, ${derecha ? "row" : "row-reverse"});
              }
              400px<-x->1000px?padding: [5px, 20px];
          `)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <PresentacionDeEmpresa derecha={derecha} empresa={empresa} />

          <ImagenEmpresaWeb src={empresa.imgweb} derecha={derecha} />
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <br />

          <h2>
            Detalles
          </h2>


          {Detalles}

          <br />

          <TestimonioPersonal>
            {empresa.testimonio}
          </TestimonioPersonal>

        </div>

      </div>
    </p>);
  }

  function TestimonioPersonal({ children }) {
    return (<React.Fragment>
      <h2>
        Testimonio Personal
      </h2>
      <Paper
        className={CSScmds(`
            400px<-x->1000px?padding: [10px, 30px];
        `)}
        sx={{
          backgroundColor: "rgb(20, 20, 40)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",

            opacity: 0.5,
          }}
        >
          <i
            className={CSScmds(`
                  600px<-x->1000px?font-size: [20px, 40px];
              `,
              "fa-solid fa-quote-left"
            )}
          />
          <small
            className={CSScmds(`
                x<600px?font-size: (90%, );
            `)}
          >
            {children}
          </small>
          {(() => {
            if (windowWidth < 600) {
              return;
            }
            return (
              <div
                className={CSScmds(`
                    600px<-x->1000px?font-size: [20px, 40px];
                    x<600px?display: (none,);
                `)}
                style={{
                  textAlign: "right",
                }}
              >
                <i className="fa-solid fa-quote-right" />
              </div>
            )
          })()}
        </div>
      </Paper>
    </React.Fragment>);
  }

  function ItemClave({ children }) {
    return <div>
      {resaltarPalabrasClave(children)}
    </div>;

    function resaltarPalabrasClave(texto) {
      if (typeof texto !== "string") {
        return texto;
      }
      let palabrasClave = [
        "Java", "Persistence", "Enterprise", "Servlets", "Edition", "Pages", "Standard", "Tag", "Library",
        "React", "Angular", "MySQL", "MongoDB", "Firebase", "Web", "Tokens",
        "Node.js", "Express", "NoSQL", "JEE", "EJB", "JPA", "JSP", "Python", "Machine", "Learning", "JSTL",
        "OAuth", "React.js", "Angular.js", "Vue.js", "HTML", "CSS", "JWT", "HTML", "CSS", "MySQL", "MongoDB", "Firebase",
        "JSON", "JWT", ".xls", ".pdf", "API", "RESTful"
      ];
      palabrasClave = palabrasClave.map(palabra => palabra.toLowerCase());
      let palabras = texto.split(" ");
      return palabras.map(palabra => {
        if (palabra.endsWith("%")) {
          return <Resaltar color="plum">{palabra}</Resaltar>;
        }
        if (palabrasClave.some(palabraClave => palabra.toLowerCase().includes(palabraClave))) {
          return <Resaltar>{palabra}</Resaltar>;
        }
        return palabra;
      }).reduce((prev, curr) => [prev, ' ', curr]);
    }
  }

  function Miniatura({ src }) {
    return <img
      src={src}
      className={CSScmds(`
        400px<-x->1000px?width: (300px, 250px);
      `)}
      style={{
        borderRadius: "10px",
        border: "3px solid white",
      }} />;
  }

  function verticalTabsEmpresa(detalles) {
    if (windowWidth < 900) {
      return;
    }
    return <VerticalTabs>
      {(() => {
        const retorno = {};
        Object.entries(detalles).forEach(([k, v]) => {
          retorno[k] = (
            <ul>
              {v.map(vv => {
                if (typeof vv === "string") {
                  return <ItemClave>{vv}</ItemClave>;
                }
                return <li>
                  <Paper>
                    <Miniatura src={vv.img} />
                    {vv.content}
                  </Paper>
                </li>
              })}
            </ul>
          );
        });
        return retorno;
      })()}
    </VerticalTabs>;
  }

  function AcordeonEmpresa(detalles) {
    const [currIndex, setCurrIndex] = React.useState(-1);

    return Object.entries(detalles).map(([k, v], index) => {
      const child = (
        v.map(vv => {
          if (typeof vv === "string") {
            return (
              <ItemClave>
                {vv}
              </ItemClave>
            );
          }
          return (
            <div>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                <Miniatura src={vv.img} />
              </p>
              <ItemClave>
                {vv.content}
              </ItemClave>
            </div>
          )
        }).map(v => {
          const cmds = CSScmds(`
            400px<-x->1000px{
              padding: [10px, 20px];
              margin: [3px, 10px];
              border-left: [2px, 5px] solid white;
              border-bottom: [1px, 3px] solid #333;
            }
          `);
          return <Paper
            elevation={1}
            className={cmds}
          >
            {v}
          </Paper>
        })
      );

      return (
        <AcordeonTheme
          titulo={k}
          index={index}
          defaultExpanded={currIndex === index}
          setIndex={setCurrIndex}
        >
          {child}
        </AcordeonTheme>
      );

    });
  }

  function ImagenEmpresaWeb({
    src,
    derecha = true,
    marginTop = "-100px",
  }) {
    if (windowWidth < 950) {
      return;
    }
    const derechaT = "rotateY(30deg) rotateX(20deg) scale(0.9)";
    const izquierdaT = "rotateY(-30deg) rotateX(20deg) scale(0.9)";
    return <div
      className={CSScmds(`
        x<950px?display: (none,);
        950px<-x->1000px{
          padding-left: [0px,${derecha ? "0px" : "100px"}];
          padding-right: [0px,${derecha ? "40px" : "0px"}];
        }
      `)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      {[{
        opacidad: 0.05,
        z: -500,
      },
      {
        opacidad: 0.2,
        z: -300,
      },
      {
        opacidad: 0.5,
        z: -100,
      },
      {
        opacidad: 1,
        z: 100,
      }].map(({ opacidad, z }) => {
        const lerpw = 1 - Math.max(0, Math.min(((windowWidth - 900) / 300), 1));
        return <img
          className={CSScmds(`
              900px<-x->1200px?width: [150px, 300px];
          `)}
          src={src}
          style={{
            position: opacidad === 1 ? "relative" : "absolute",
            borderRadius: "20px",
            transform: `
              ${derecha ? derechaT : izquierdaT} 
              translateZ(${(derecha ? z : z - 100) - lerpw * 400}px)
              translateX(${(derecha ? 1.2 : -1.2) * lerpw * 400}px)
            `,
            opacity: opacidad,
            transformOrigin: "center top",
            border: "5px solid black",
            boxShadow: "0 0 0 10px #555",
            width: "300px",
            marginTop,
            marginRight: "100px",
          }} />;
      })}
    </div>;
  }

  function PresentacionDeEmpresa({
    empresa,
    derecha = true,
  }) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let tiempoAños = new Date(empresa.periodo.fin.año, empresa.periodo.fin.mes - 1).getTime() - new Date(empresa.periodo.inicio.año, empresa.periodo.inicio.mes - 1).getTime();
    tiempoAños = tiempoAños / (1000 * 60 * 60 * 24 * 365.25);

    let lblPeriodo = <span>
      Desde <Resaltar>
        {meses[empresa.periodo.inicio.mes - 1].toString().padStart(2, "0")} del {empresa.periodo.inicio.año}
      </Resaltar> a <Resaltar>
        {meses[empresa.periodo.fin.mes - 1].toString().padStart(2, "0")} del {empresa.periodo.fin.año}
      </Resaltar> <Resaltar color="plum">
        ({tiempoAños.toFixed(1)} años)
      </Resaltar>
    </span>;

    return <div
      className={CSScmds(`
            x<950px?width: (100%,);
      `)}
    >
      <Typography
        variant="h3"
        className={CSScmds(`
            400px<-x->1000px?font-size: [50px, 70px];
        `)}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {empresa.nombre} {(() => {
          if (windowWidth >= 950) {
            return
          }
          return <img
            src={empresa.logo}
            style={{
              filter: "brightness(0) invert(1)",
              height: "50px",
              maxWidth: "100px",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        })()}
      </Typography>
      <br />
      <Typography
        variant="h3"
        className={CSScmds(`
            400px<-x->1000px?font-size: [30px, 40px];
        `)}
        style={{
          color: "skyblue",
        }}
      >
        {empresa.slogan}
      </Typography>
      <br />
      <Typography
        className={CSScmds(`
            400px<-x->1000px?font-size: [20px, 30px];
        `)}
      >
        Web
        <br />
        <Link
          href={empresa.web}
          target="_blank"
        >
          {empresa.web}
        </Link>
      </Typography>
      <br />

      <div
        className={CSScmds(`
            x<950px?justify-content: (space-between, ${derecha ? "flex-start" : "flex-end"});
            x<700px?gap: (10px,);
      `)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ItemPresentacion Titulo="Cargo" Contenido={empresa.cargo} />
        <ItemPresentacion Titulo="Periodo" Contenido={lblPeriodo} />
        <ItemPresentacion Titulo="Ubicación" Contenido={empresa.ubicacion} />
        <ItemPresentacion Titulo="Modalidad" Contenido={empresa.modalidad} />
      </div>

    </div>;

    function ItemPresentacion({ Titulo, Contenido }) {
      return <div
        className={CSScmds(`
            x<700px?{
                flex-direction: (column,); 
                gap: (, 30px);
                font-size: (90%, );
            }
        `)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Resaltar>{Titulo}:</Resaltar> {Contenido}
      </div>;
    }
  }

  function Seccion2() {
    return <div
      className={CSScmds(`
          400px<-x->1000px?padding: [20px, 50px] [20px, 30px];
      `)}
      style={{
        backgroundColor: 'rgba(150, 150, 255, 0.1)',
      }}
    >
      <span
        className={CSScmds(`
          400px<-x->1000px?margin: 0 0 [0px, 50px] 0;
          550px<x<1000px?font-size: (270%, 300%, 350%);
        `)}
      >
        <Titulo texto="Proyectos y Librerías" />
      </span>
      <div
        className={CSScmds(`
          x<800px?flex-direction: (column,); gap: (, 50px);
        `)}
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <IconoEfecto />
        <div
          className={CSScmds(`
            x<800px?width: (100%, 50%);
          `)}
        >
          <BRO x="x>800px" />
          <p
            style={{
              fontSize: '110%',
            }}
          >
            He desarrollado diversas aplicaciones web y plataformas, enfocándome en mejorar la eficiencia, productividad y experiencia
            del usuario. Además, he creado librerías para simplificar acciones en proyectos.
          </p>
          <br />
          <Button
            className={CSScmds(`
              x<800px?font-size: (140%, 150%);
            `)}
            fullWidth
            variant="contained"
            startIcon={<i className="fa-solid fa-code"></i>}
            size="large"
            onClick={() => {
              buscarPagina('Proyectos');
            }}
          >
            Ver proyectos y libreriás
          </Button>
        </div>
      </div>
    </div>;

    function IconoEfecto() {
      return <span
        className={CSScmds(`
            400px<-x->1000px?font-size: [150px, 250px];
        `)}
        style={{
          position: 'relative',
        }}
      >
        {[1.1, 1.2, 1.3, 1.4, 1.5].map((opacity, i) => {
          return <i class="fa-solid fa-puzzle-piece"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${opacity})`,
              WebkitTextStrokeWidth: "2px",
              WebkitTextStrokeColor: "gray",
              color: 'transparent',
              zIndex: -1,
              opacity: 1 - (1.8 * (i + 1) / 10),
            }} />;
        })}
        <i className="fa-solid fa-puzzle-piece" />
        <i className="fa-solid fa-code"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateY(10px)',
            fontSize: '20%',
            color: 'black',
          }} />
      </span>;
    }
  }

  function Seccion1() {
    return (
      <div
        className={CSScmds(`
            400px<-x->1000px?padding: 0 [10px, 30px];
        `)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Fila1 />
        <Fila2 />
      </div>
    );

    function Fila2() {
      return (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            flexWrap: 'wrap',
          }}
        >
          <Presentacion />

          <SeccionFila2
            className={CSScmds(`
                x<800px?flex-direction: (column-reverse, column);
            `)}
            style={{
              display: 'inline-flex',
            }}
          >
            <Capacidades />
            <TextoResumen x="x>950px" />
          </SeccionFila2>

          <TextoResumen x="x<950px" />


          <img
            src="src/imgs/jeff-profile.png"
            style={{
              position: "absolute",
              top: "40%",
              left: "20%",
              transform: "translateY(-50%)",
              zIndex: -1,
              background: "black",
              width: "max(40vw, 300px)",
              aspectRatio: "1/1",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "right",
              backgroundImage: "url(src/imgs/back.gif)",
              backgroundSize: "cover",
              backgroundBlendMode: "hard-light",
              opacity: 0.4,
              border: "5px solid white",
            }} />
        </div>
      );

      function TextoResumen({ x }) {
        if (x.startsWith("x<")) {
          if (windowWidth < parseInt(x.split("<")[1])) {
            return;
          }
        } else {
          if (windowWidth > parseInt(x.split(">")[1])) {
            return;
          }
        }
        return (
          <span
            className={CSScmds(`
                700px<x<950px{
                  text-align: (,center,);
                  opacity: (,,0.7);
                  font-weight: (bold,,);
                  margin-top: (,20px,);
                }
                ${x}?display: (none,);
            `)}
            style={{
              fontSize: '90%',
              padding: '10px',
            }}
          >
            Desarrollador de software con experiencia en diseño, desarrollo y mantenimiento de aplicaciones.
            Experto en lenguajes de programación y metodologías ágiles, enfocado en la resolución de problemas
            y mejora continua.
          </span>
        );
      }

      function SeccionFila2(props) {
        return <div
          {...props}
          className={CSScmds(`
                x<950px?width: (100%, 48%);
            `,
            props.className
          )}
        />
      }

      function Capacidades() {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}
          >

            <RowItemsGraficos titulo="Habilidades">

              <ItemConGrafico_2Titulos
                titulo1="Experto en"
                titulo2="JavaScript"
                icono="fa-brands fa-js" />

              <ItemConGrafico_2Titulos
                titulo1="Framework preferido"
                titulo2="React (JSX)"
                icono="fa-brands fa-react" />

              <ItemConGrafico_2Titulos
                titulo1="Senior en"
                titulo2="Frontend"
                icono="fa-solid fa-laptop" />

              <ItemConGrafico_2Titulos
                titulo1="Junior"
                titulo2="Backend"
                icono="fa-solid fa-server" />

            </RowItemsGraficos>

            <RowItemsGraficos titulo="Conocimientos relevantes">

              <ItemConGrafico_2Titulos
                titulo1="Experto en"
                titulo2={<React.Fragment>
                  Computación
                  <br />
                  Gráfica 2D
                </React.Fragment>}
                icono="fa-solid fa-dragon" />


              <ItemConGrafico_2Titulos
                titulo1="Buen conocimiento en"
                titulo2="Estructura de datos"
                icono="fa-solid fa-dice-d20" />

              <ItemConGrafico_2Titulos
                titulo1="Amante a la"
                titulo2={<React.Fragment>
                  Investigación
                  <br />
                  e innovación
                </React.Fragment>}
                icono="fa-solid fa-rocket" />

            </RowItemsGraficos>

            <Social />

          </div>
        );

        function Social() {
          if (windowWidth < 950) {
            return;
          }
          return <div
            className={CSScmds(`
              x<850px?display: (none,);
            `)}
          >
            <RowItemsGraficos titulo="Social">

              <ItemConGrafico_2Titulos_Link
                titulo1="Canal de Youtube"
                titulo2="Jeff Aporta"
                icono="fa-brands fa-youtube"
                link="https://www.youtube.com/@JeffAporta" />

              <ItemConGrafico_2Titulos_Link
                titulo1="WhatsApp"
                titulo2="(+57) 310 725 7814"
                icono="fab fa-whatsapp"
                link="https://wa.link/1tmqmt" />

              <ItemConGrafico_2Titulos
                titulo1="Ubicación"
                titulo2={<React.Fragment>
                  Tuluá, Valle del Cauca
                  <br />
                  Colombia
                </React.Fragment>}
                icono="fa-solid fa-location-dot" />

            </RowItemsGraficos>
          </div>;
        }
      }

      function Presentacion() {
        return <SeccionFila2>
          <IconoDev />
          <br />
          <span
            className={CSScmds(`
              400px<-x->1000px?font-size: [40px, 50px);
            `)}
            style={{
              fontWeight: 'bold'
            }}
          >
            <span
              className={CSScmds(`
                  600px<x<950px?font-size: (140%,);
                `,
                "anim1s"
              )}
            >
              Soy <Resaltar>Jeffrey</Resaltar> Alexander <Resaltar>Agudelo</Resaltar> Espitia
            </span>
          </span>

          <br />
          <BRO x="x>900px" />

          <div
            className={CSScmds(`
              400px<-x->1000px?font-size: [30px, 32px);
              x<900px?justify-content: (space-evenly, space-between);
            `)}
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <ItemConGrafico izquierda="3">
              <small>
                Empresas
                <br />
                de experiencia
              </small>
            </ItemConGrafico>


            <ItemConGrafico_plus izquierda="4">
              <small>
                Años de experiencia
                <br />
                en empresas
              </small>
            </ItemConGrafico_plus>

            <ItemConGrafico_plus izquierda="100">
              <small>
                Proyectos de
                <br />
                Software
              </small>
            </ItemConGrafico_plus>

            <ItemConGrafico_plus izquierda="10">
              <small>
                Librerias en
                <br />
                diferentes lenguajes
              </small>
            </ItemConGrafico_plus>

          </div>

          <br />
          <br />
          <HrGrueso />
          <br />
          <br />

        </SeccionFila2>;

        function IconoDev() {
          if (windowWidth < 700) {
            return;
          }
          return <span
            className={CSScmds(`
                400px<-x->1000px?font-size: [30px, 80px];
                x<700px?display: (none,);
            `)}
            style={{
              display: "inline-block",
              fontWeight: 'bolder',
            }}
          >
            <Titulo />
            <HrGrueso />
          </span>;
        }
      }
    }

    function Fila1() {
      return <Typography
        variant="h4"
        className={CSScmds(`
            x<600px?margin-top: (40px,);
            400px<-x->1000px?font-size : [25px, 60px];
        `)}
      >
        ¡Mucho gusto!
      </Typography>;
    }
  }

  function ItemConGrafico_plus({ izquierda, children }) {
    return <ItemConGrafico
      izquierda={<React.Fragment>
        <span
          style={{
            color: 'dodgerblue',
          }}
        >
          +
        </span>
        {izquierda}
      </React.Fragment>}

      invertir={false}
    >
      {children}
    </ItemConGrafico>;
  }

  function ItemConGrafico_2Titulos_Link({ titulo1, titulo2, icono, link }) {
    return <a href={link}>
      <ItemConGrafico_2Titulos titulo1={titulo1} titulo2={titulo2} icono={icono} />
    </a>;
  }


  function ItemConGrafico_2Titulos({ titulo1, titulo2, icono }) {
    return (
      <ItemConGrafico
        icono={icono}
        invertir={true}
      >
        {titulo1}
        <br />
        <Resaltar>
          {titulo2}
        </Resaltar>
      </ItemConGrafico>
    );
  }

  function RowItemsGraficos({ children, titulo }) {
    return <div
      className={CSScmds(`
          400px<-x->1000px?font-size: [25px, 30px];
          x<900px?justify-content: (space-evenly, end);
      `)}
      style={{
        display: 'inline-flex',
        gap: '0 30px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end',
        padding: '10px',
      }}
    >
      <span
        className={CSScmds(`
            x<950px{
              text-align: (center, right);
              opacity: (,0.5);
            }
        `)}
        style={{
          padding: "10px 0",
          fontSize: '50%',
          width: '100%',
        }}
      >
        <Titulo texto={titulo} />
      </span>
      {(() => {
        const columna = [];
        let fila = [];
        const rwe = windowWidth < 950 ? 4 : 3;
        children.forEach((child, i) => {
          fila.push(child);
          if (i % rwe == rwe - 1) {
            columna.push(fila);
            fila = [];
          }
        });
        if (fila.length > 0) {
          const e = fila.length;
          const fn = (() => {
            if (windowWidth > 950) {
              return [...Array(rwe - e).fill(<p />), ...fila];
            }
            return fila;
          })();
          columna.push(fn);
        }
        return columna.map(fila => {
          return (
            <div
              className={CSScmds(`
                  x<950px{
                      grid-template-columns: [repeat(${Math.min(fila.length, 4)}, 1fr), repeat(3, 1fr)];
                      justify-content: (center,space-between),
                  }
              `)}
              style={{
                display: 'inline-grid',
                gap: '10px',
                width: '100%',
              }}
            >
              {fila}
            </div>
          );
        });
      })()}
      <div
        style={{
          width: '100%',
        }}
      >
        <hr
          style={{
            maxWidth: '80%',
            marginRight: '0',
            marginBottom: '0',
            opacity: '0.25',
          }}
        />
      </div>
    </div>;
  }

  function ItemConGrafico({
    invertir,
    izquierda,
    icono,
    children,
  }) {
    return <div
      className={CSScmds(`
          x<950px?{
            flex-direction:(column,${invertir ? 'row-reverse' : 'row'});
            text-align:(center,${invertir ? 'right' : 'left'});
            gap: (,10px);
          }
          700px<x<950px?font-size: (,140%,90%);
        `,
        "anim1s"
      )}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
        }}
      >
        {(() => {
          if (izquierda) {
            return <span>
              {izquierda}
            </span>;
          }
          if (icono) {
            return <i className={icono}></i>;
          }
        })()}
      </span>
      <span
        style={{
          fontSize: '40%',
        }}
      >
        {children}
      </span>
    </div>;
  }
}