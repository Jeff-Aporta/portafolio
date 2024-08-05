function PaginaLibrerias() {

  const estado = MiniDrawerDriver.estados["Librerías"];

  const opnID = estado.menuInferior.opcionIDSeleccionada();

  return (
    <ThemeProvider theme={themeSelected}>
      <EnvolventePagina>
        <div
          className="contenedor-secciones"
        >
          {
            [
              Seccion({
                lenguaje: "JavaScript",
                icono: {
                  className: "fa-brands fa-js",
                  style: {
                    color: "yellow",
                  }
                },
                idFilter: "javascript",
                idsProyecto: [
                  "ASCIIMapLoader", "OrigenTel", "GeometryRectsNCircles"
                ]
              }),
              Seccion({
                lenguaje: "Java",
                icono: {
                  className: "fa-brands fa-java",
                },
                idFilter: "java",
                idsProyecto: [
                  "JFTP",
                ]
              }),
            ].filter(e => e)
              .reduce((acumulador, elemento, indice, array) => {
                acumulador.push(elemento);
                if (indice < array.length - 1) {
                  acumulador.push(<SeparadorSeccion />);
                }
                return acumulador;
              }, [])
          }
        </div>
      </EnvolventePagina>
    </ThemeProvider>
  );

  function SeparadorSeccion() {
    return (
      <React.Fragment>
        <br /><BRO /><BRO />
        <hr />
        <br /><BRO /><BRO />
      </React.Fragment>
    );
  }

  function Seccion({ icono, lenguaje, idFilter, idsProyecto }) {
    const state = (() => {
      if (opnID) {
        if (opnID != idFilter) {
          return false;
        }
      }
      return true;
    })();

    if (!state) {
      return;
    }

    let sello = {
      lenguaje,
      icono: icono.className,
      state
    }

    return (
      <React.Fragment>
        <div>
          <TituloSeccion icono={icono.className} colorIcono={icono?.style?.color}>
            {lenguaje}
          </TituloSeccion>
        </div>
        <div
          className="contenedor-proyectos javascript"
        >
          {
            idsProyecto
              .map(id => {
                return {
                  estado: MiniDrawerDriver.estados[id],
                  id
                }
              })
              .map((proyecto) => {
                return (
                  <div>
                    <Proyecto {...proyecto} {...sello} />
                    <br /><br />
                  </div>
                );
              })
          }
        </div>
      </React.Fragment>
    )
  }

  function Proyecto({ estado, id, lenguaje, icono, state }) {
    const contenido = estado.contenido;

    if (!state) {
      return;
    }

    return (
      <div>
        <Typography
          variant="h2"
          className={CSScmds(`
              400px<-x->1000px?font-size: [30px,50px];margin-bottom: [20px,0px];
          `)}
          style={{
            margin: '0',
          }}
        >
          <Titulo
            texto={contenido.nombre}
          />
        </Typography>

        <EnvolventeSeccion relative>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <BotonGit href={contenido.github} />
            <Sello lenguaje={lenguaje} icono={icono} />
          </div>


          <Typography
            variant="h1"
            className={CSScmds(`
                400px<-x->1000px?font-size: [20px,40px];margin: 20px 0;
                x<600px?font-weight: (bold,);
            `)}
          >
            {contenido.slogan}
          </Typography>

          <Resumen {...contenido.resumen} />

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <BRO x="x>600px" />
            <Button
              size="large"
              className={CSScmds(`
                    x<700px?width: (100%,);
                `,
                "anim1s"
              )}
              variant="contained"
              color="primary"
              startIcon={<i className="fa-solid fa-book" />}
              endIcon={(() => {
                if (windowWidth < 900) {
                  return;
                }
                return (
                  <i className={CSScmds(`
                      x<900px?display: (none,);
                  `,
                    "fa-solid fa-angles-right"
                  )} />
                );
              })()}
              onClick={() => {
                estado.seleccionar();
              }}
            >
              Documentación
            </Button>
          </div>
        </EnvolventeSeccion>
      </div>
    );
  }

  function Sello({ lenguaje, icono }) {
    return <span
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gray',
        margin: '0',
      }}
    >
      <span
        className={CSScmds(`
            x<700px?display: (none,);
        `)}
      >
        {lenguaje}
      </span>
      <i
        className={[
          icono,
          CSScmds(`
              x<700px?font-size: (300%,200%);
          `)
        ].join(' ')}
        style={{
          marginLeft: '20px',
        }}
      />
    </span>;
  }

  function TituloSeccion({ children, icono, colorIcono = "white" }) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            className={CSScmds(`
                400px<-x->1000px?font-size: [30px,60px];
            `)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              margin: '0',
            }}
          >
            <i
              className={[
                icono,
                ...CSScmds(`
                    400px<-x->1000px?margin-right: [5px,20px];
                `).split(' ')
              ].join(' ')}
              style={{
                fontSize: '150%',
                color: colorIcono,
              }}
            />&nbsp;{children}
          </h1>
          <Typography
            variant="h6"
            className={CSScmds(`
                400px<-x->1000px?font-size: [15px,20px];
                700px<x<1000px?opacity: (0.5,0.7,1);
            `)}
          >
            <Titulo texto="Librerías" />
          </Typography>
        </div>
        <br />
        <HrGrueso />
        <br />
        <br />
      </div>
    );
  }
}