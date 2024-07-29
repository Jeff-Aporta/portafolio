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
                  "ASCIIMapLoader",
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
        <br /><br /><br />
        <hr />
        <br /><br /><br />
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
        <Zoom
          in={state}
          timeout={300}
        >
          <div>
            <TituloSeccion icono={icono.className} colorIcono={icono?.style?.color}>
              {lenguaje}
            </TituloSeccion>
          </div>
        </Zoom>
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
                return <Proyecto {...proyecto} {...sello} />
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
          <h1
            style={{
              fontSize: '300%',
              margin: '0',
            }}
          >
            <Titulo
              texto={contenido.nombre}
            />
          </h1>

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


            <h1>
              {contenido.slogan}
            </h1>

            <Resumen {...contenido.resumen} />

            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<i class="fa-solid fa-book" />}
                endIcon={<i class="fa-solid fa-angles-right" />}
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
      {lenguaje}
      <i
        className={icono}
        style={{
          fontSize: '200%',
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '300%',
              margin: '0',
            }}
          >
            <i
              className={icono}
              style={{
                fontSize: '150%',
                marginRight: '20px',
                color: colorIcono,
              }}
            />&nbsp;{children}
          </h1>
          <h2>
            <Titulo texto="Librerías" />
          </h2>
        </div>
        <br />
        <HrGrueso />
        <br />
        <br />
      </div>
    );
  }
}