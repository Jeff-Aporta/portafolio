function PaginaLibrerias() {
  return (<ThemeProvider theme={themeSelected}>
    <EnvolventePagina>
      <div
        className="contenedor-secciones"
      >
        <TituloSeccion icono="fa-brands fa-java">
          Java
        </TituloSeccion>
        <div
          className="contenedor-proyectos java"
        >
          <EnvolventeSeccion relative>

            <SelloJava />

            <h1>
              <Resaltar>
                JFTP
              </Resaltar>
            </h1>
            <h2>
              FTP Para Java
            </h2>

            <div>

              La librería <Resaltar>JFTP</Resaltar> implementa un cliente FTP Java
              con todas las funciones.

              <br />
              <br />

              <img src="imgs/Librerias/JFTP.jpeg" alt="Logo"
                style={{
                  float: 'left',
                  margin: '10px 40px 0 0',
                  width: '200px',
                  borderRadius: '20px',
                }}
              />

              <br />

              <b>
                Puede:
              </b>
              <br />
              <div
                style={{
                  display: 'inline-block',
                }}
              >
                <ul>
                  <li>
                    Transferir archivos (cargar y descargar)
                  </li>
                  <li>
                    Explorar el sitio FTP remoto (incluido el listado de directorios)
                  </li>
                  <li>
                    Crear, eliminar, cambiar el nombre y mover directorios y archivos remotos
                  </li>
                </ul>
              </div>
            </div>

            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                target="_blank"
                startIcon={<i class="fa-solid fa-book" />}
                endIcon={<i class="fa-solid fa-angles-right" />}
                onClick={() => {
                  buscarPagina("JFTP");
                }}
              >
                Ver todo
              </Button>
            </div>
          </EnvolventeSeccion>
        </div>
      </div>
    </EnvolventePagina>
  </ThemeProvider>);

  function SelloJava() {
    return <div
      style={{
        backgroundColor: '#333',
        width: '100px',
        aspectRatio: '1/1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        position: 'absolute',
        top: '25px',
        right: '25px',
        fontSize: '70px',
        color: 'dodgerblue',
      }}
    >
      <div
        style={{
          position: 'absolute',
          fontSize: '40px',
          backgroundColor: '#333',
          marginRight: '170px',
          padding: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: '50px 0 0 50px',
        }}
      >
        Java
      </div>
      <i
        className="fa-brands fa-java"
        style={{}} />
    </div>;
  }

  function TituloSeccion({ children, icono }) {
    return (
      <React.Fragment>
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '300%',
          }}
        >
          <i
            className={icono}
            style={{
              fontSize: '150%',
              marginRight: '20px',
            }}
          />&nbsp;{children}
        </h1>
        <hr />
        <br />
        <br />
      </React.Fragment>
    );
  }
}