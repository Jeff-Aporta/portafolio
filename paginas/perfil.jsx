crearEstilo({
  "ul": {
    "li": {
      marginBottom: "20px",
    },
  }
})

function VerticalTabs({ children = {
  "Item One": "Item One content"
} }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );

  }

  return (
    <ThemeProvider theme={themeSelected}>
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          minHeight: "300px",
          width: '100%',
          borderRadius: '20px',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '250px'
          }}
        >
          {
            Object.keys(children).map((tab, i) => {
              return <Tab
                label={tab}
                {...a11yProps(i)}
                style={{
                  borderBottom: "1px solid #444",
                }}
              />;
            })
          }
        </Tabs>
        {
          Object.keys(children).map((tab, i) => {
            return <TabPanel
              value={value}
              index={i}
              style={{
                maxWidth: "calc(100% - 250px)",
                maxheight: "90dvh",
              }}
            >
              <h1>
                <Titulo texto={tab} />
              </h1>
              {children[tab]}
            </TabPanel>;
          })
        }
      </Paper>
    </ThemeProvider>
  );
}

function PaginaPerfil() {

  setTimeout(() => {
    [...document.querySelectorAll(".fade-in_anim")].forEach(element => {
      element.classList.remove("fade-in_anim");
    });
  }, 1000);

  return (
    <ThemeProvider theme={themeSelected}>
      <div className="fade-in_anim">
        <Seccion1 />
        <Seccion2 />
        <Seccion3 />
      </div>
    </ThemeProvider>
  );

  function Seccion3() {
    return <div
      style={{
        padding: "80px 80px",
      }}
    >
      <Registel />
      <ISeeCI />
      <ELCINCO />
    </div>;
  }

  function EsquemaEmpresa({
    Nombre,
    Slogan,
    Web,
    Cargo,
    Periodo,
    Ubicacion,
    Modalidad,
    ImagenWeb,
    VerticalTabs,
    Testimonio,
    derecha = true,
  }) {
    return (<React.Fragment>
      <h1
        style={{
          textAlign: !derecha ? "right" : "left",
        }}
      >
        <Titulo texto="Experiencia Laboral" />
      </h1>

      <hr />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: derecha ? "row" : "row-reverse",
            width: "100%",
            textAlign: derecha ? "left" : "right",
            padding: "20px",
          }}
        >
          <PresentacionDeEmpresa {...{
            Nombre,
            Slogan,
            Web,
            Cargo,
            Periodo,
            Ubicacion,
            Modalidad,
            derecha,
          }} />

          <ImagenEmpresaWeb src={ImagenWeb} derecha={derecha} />
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <br />
          <br />

          {VerticalTabs}

          <TestimonioPersonal>
            {Testimonio}
          </TestimonioPersonal>

        </div>

      </div>
    </React.Fragment>);
  }

  function Registel() {
    return <EsquemaEmpresa
      Nombre="Registel"
      Slogan="Información real para soluciones efectivas"
      Web="https://registel.co/"
      Cargo="Lider de Desarrollo de software fullstack"
      Periodo={{
        inicio: {
          mes: 12,
          año: 2022
        },
        fin: {
          mes: 5,
          año: 2024
        }
      }}
      Ubicacion="Cali, Valle del Cauca, Colombia"
      Modalidad="Presencial"
      ImagenWeb="imgs/Empresas/Registel-home.JPG"
      VerticalTabs={<VerticalTabsRegistel />}
      Testimonio="
          En Registel S.A.S, lideré iniciativas clave que mejoraron la eficiencia operativa y la experiencia
          del usuario. Propuse y desarrollé un sistema innovador de control de ruta para visualizar la
          ubicación de los autobuses en tiempo real, implementé un sistema de salidas inspirado en
          aeropuertos y lideré el área de reportes, manteniendo una identidad coherente en más de 20
          tipos de informes. También introduje mejoras en alertas, sistemas de liquidación automática
          para conductores y algoritmos para la creación rápida de geozonas, abordando desafíos
          técnicos y optimizando procesos.
      "
      derecha={false}
    />;

    function VerticalTabsRegistel() {
      return <VerticalTabs>
        {{
          "Desarrollo Backend": <ul>
            <ItemClave>
              Implementación de la lógica empresarial y la capa de persistencia utilizando tecnologías Java y Java
              Enterprise Edition (JEE), como Servlets, Enterprise JavaBeans (EJB) y Java Persistence API (JPA).
            </ItemClave>
            <ItemClave>
              Desarrollo de servicios backend en Node.js para aplicaciones web y móviles, utilizando frameworks
              como Express.js para la creación de APIs RESTful.
            </ItemClave>
            <ItemClave>
              Desarrollo de algoritmos y lógica de negocio en Python, especialmente en el contexto de proyectos de
              análisis de datos y machine learning.
            </ItemClave>
          </ul>,
          "Desarrollo Frontend": <ul>
            <ItemClave>
              Creación de interfaces de usuario interactivas utilizando Angular, aprovechando su robustez para la
              creación de aplicaciones web dinámicas.
            </ItemClave>
            <ItemClave>
              Implementación de páginas web dinámicas con Angular.js y JavaServer Pages (JSP), presentando
              datos y funcionalidades del backend de manera efectiva.
            </ItemClave>
            <ItemClave>
              Diseñar y desarrollar páginas web dinámicas utilizando JavaServer Pages (JSP) para presentar datos y
              funcionalidades de backend en el navegador web.
            </ItemClave>
            <ItemClave>
              Implementar etiquetas personalizadas y scripts de servidor en JSP para generar contenido dinámico
              basado en la lógica empresarial y los datos recuperados de la capa de backend.
            </ItemClave>
            <ItemClave>
              Utilizar JSTL (JavaServer Pages Standard Tag Library) para simplificar la gestión y presentación de
              datos en las páginas JSP.
            </ItemClave>
            <ItemClave>
              Colaborar con diseñadores y desarrolladores frontend para garantizar la coherencia y la usabilidad de la
              interfaz de usuario en las aplicaciones web basadas en JSP.
            </ItemClave>
          </ul>,
          "Integración de Tecnologías": <ul>
            <ItemClave>
              Integración de servicios y APIs desarrollados en diferentes tecnologías, como Java, Node.js y Python,
              para garantizar la comunicación efectiva entre los componentes del sistema.
            </ItemClave>
            <ItemClave>
              Colaboración estrecha con equipos multidisciplinarios para garantizar la coherencia y la eficacia de las
              soluciones desarrolladas.
            </ItemClave>
          </ul>,
          "Logros": <ul>
            <li>
              <br />
              <RenglónConImagen>
                <Miniatura src="imgs/Empresas/Registel-ControlLineal.png" />
                Propuse y desarrollé una mejor experiencia en un concepto que se llama control lineal de ruta,
                pudiendo visualizar de forma animada y actualizada las posiciones de los buses en una ruta,
                haciendo uso de un modelo de carretera en forma de herradura.
              </RenglónConImagen>
            </li>
            <li>
              <br />
              <RenglónConImagen>
                Desarrollé un sistema de salidas de buses, enfocado en presentarse en pantallas grandes
                ubicadas en las terminales, para indicar a los usuarios el estado de los buses según su llegada o
                salida de la terminal. esto inspirado en el sistema de salidas de aviones en un aeropuerto.
                <Miniatura src="imgs/Empresas/Registel-TableroDeSalidas.png" />
              </RenglónConImagen>
            </li>
            <ItemClave>
              Lideré y gestioné el área de reportes de la empresa, pudiendo mantener una identidad
              coherente y un mismo estilo en todos los reportes, en mi responsabilidad estuvo la de
              elaborar, corregir y modificar más de 20 tipos de reportes diferentes.
            </ItemClave>
            <ItemClave>
              Mejoré la experiencia de alertas en los buses, pudiendo mostrar gráficamente la ubicación
              en la que se violó una regla de locación o de ruta.
            </ItemClave>
            <ItemClave>
              Desarrollé un sistema de ventanas flotantes que permitió mostrar información relevante a
              los buses y su graficación en mapa, sin tener que cambiar de pestaña.
            </ItemClave>
            <ItemClave>
              Elaboré un sistema de liquidación automático para conductores, que se actualizaba en
              tiempo real, con el cuál se le indicaba a los conductores cuánto dinero recaudado tenian
              que entregar a la empresa.
            </ItemClave>
            <ItemClave>
              Inventé e implementé un algoritmo para elaboración de geozonas de forma rápida
              aprovechando buses que habían seguido correctamente una ruta, esto minimizo
              drasticamente la elaboración de geozonas, anteriormente las elaboraban a mano
              demorandose varios dias en establecer una ruta, con mi aporte se paso de periodos de días
              de trabajo a mano a la elaboración de una geozona de ruta que tardaba máximo 20
              segundos en calcularse.
            </ItemClave>
            <ItemClave>
              Solucioné problemas de regiones en geozonas poligonales que se autointersectaban,
              agregando un concepto propio al que denominé como rutas de polilíneas que por medio
              de geometría pura calculaba los casos exitosamente aún en las autointersecciones de las
              rutas.
            </ItemClave>
            <ItemClave>
              Fuí el encargado de todo el sistema de seguimiento de mantenimiento, pudiendo llevar el
              registro de las distancias recorridas u horas trabajadas de todos los buses, para que se
              pudiera hacer el mantenimiento de llantas, cambio de aceite o de otros elementos que
              dependieran de factores de distancia recorrida o de tiempo de uso.
            </ItemClave>
            <ItemClave>
              Fui el encargado de modificar toda la interfaz de modificación y creación de geozonas,
              corrigiendo errores, añadiendo herramientas y cambiando casi toda la distribución de
              botones y herramientas del sistema, todo esto con la pericia de mantenerse estable con la
              representación de gráficos de leaflet.
            </ItemClave>
            <ItemClave>
              Desarrollé una propuesta que ayudó a identificar la ruta que estaba siguiendo un bus, esto
              lo desarrollé basándose en el concepto de la distancia coseno para lograr una
              aproximación acertada aunque el bus omitiera puntos de control o pasará por puntos que
              no eran propios de la ruta.
            </ItemClave>
          </ul>,
        }}
      </VerticalTabs>;
    }

    function RenglónConImagen({ children }) {
      return <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {children}
      </div>;
    }

    function Miniatura({ src }) {
      return <img
        src={src}
        style={{
          width: "250px",
          borderRadius: "10px",
          border: "3px solid white",
        }} />;
    }
  }

  function ISeeCI() {
    return <EsquemaEmpresa
      Nombre="ISeeCI"
      Slogan="Productos y servicios potenciados con IA"
      Web="https://iseeci.com/es/"
      Cargo="Lider de Desarrollo de software fullstack"
      Periodo={{
        inicio: {
          mes: 4,
          año: 2021
        },
        fin: {
          mes: 7,
          año: 2022
        }
      }}
      Ubicacion="Medellín, Antioquia, Colombia"
      Modalidad="Remoto"
      ImagenWeb="imgs/Empresas/ISeeCI-home.png"
      VerticalTabs={<VerticalTabsISeeCI />}
      Testimonio="
          Mi tiempo en ISeeCI estuvo marcado por una serie de logros clave que reflejan mi capacidad
          para innovar y liderar en el desarrollo de soluciones tecnológicas. Fui fundamental en la
          implementación de sistemas de visualización de datos, diseño gráfico interactivo y edición de
          contenido ágil, mejorando así la experiencia del usuario y aumentando la eficiencia operativa.
          Además, integré exitosamente servicios de inteligencia artificial y asumí roles importantes en
          la gestión de registros y seguridad de usuarios.
      "
    />;

    function VerticalTabsISeeCI() {
      return <VerticalTabs>
        {{
          "Funciones": <div>
            <ul>
              <ItemClave>
                Implementar y mantener la lógica de negocio en el backend utilizando tecnologías como Node.js,
                Express.js y bases de datos relacionales o NoSQL.
              </ItemClave>
              <ItemClave>
                Diseñar y desarrollar APIs RESTful para facilitar la comunicación entre el frontend y los servicios de IA,
                permitiendo la integración de funcionalidades avanzadas en las aplicaciones.
              </ItemClave>
              <ItemClave>
                Colaborar estrechamente con los científicos de datos y los ingenieros de IA para integrar modelos y
                algoritmos de machine learning en el backend, proporcionando resultados relevantes y precisos a través
                de las APIs.
              </ItemClave>
              <ItemClave>
                Desarrollar interfaces de usuario interactivas y receptivas en el frontend utilizando tecnologías como
                Angular.js, React.js o Vue.js, que permitan a los usuarios interactuar con los servicios de IA de manera
                intuitiva y eficiente.
              </ItemClave>
              <ItemClave>
                Integrar componentes y widgets de interfaz de usuario con las APIs backend para mostrar resultados de
                IA en tiempo real y proporcionar retroalimentación instantánea a los usuarios.
              </ItemClave>
            </ul>
          </div>,
          "Desarrollador de Integraciones": <div>
            <ul>
              <ItemClave>
                Diseñar e implementar integraciones entre sistemas de terceros y los servicios de IA proporcionados por la
                empresa, permitiendo a los clientes aprovechar las funcionalidades de IA en sus propios entornos.
              </ItemClave>
              <ItemClave>
                Utilizar tecnologías como webhooks, API Gateway y servicios de mensajería para facilitar la comunicación
                entre los sistemas existentes y los servicios de IA.
              </ItemClave>
              <ItemClave>
                Desarrollar adaptadores y conectores personalizados para sistemas específicos, asegurando una
                integración fluida y eficiente con los servicios de IA.
              </ItemClave>
              <ItemClave>
                Configurar y mantener flujos de datos automatizados para la sincronización continua de información
                entre diferentes sistemas, garantizando la coherencia y la integridad de los datos utilizados en los procesos
                de IA.
              </ItemClave>
            </ul>
          </div>,
          "Ingeniero de Backend": <ul>
            <ItemClave>
              Diseñar y desarrollar arquitecturas de microservicios escalables y robustas para alojar los servicios de IA
              ofrecidos por la empresa.
            </ItemClave>
            <ItemClave>
              Implementar mecanismos de autenticación y autorización para garantizar la seguridad de los servicios de
              IA y proteger los datos confidenciales de los usuarios.
            </ItemClave>
            <ItemClave>
              Optimizar el rendimiento y la eficiencia de los servicios de IA mediante el uso de técnicas como la caché
              de resultados, el procesamiento paralelo y la optimización de consultas.
            </ItemClave>
            <ItemClave>
              Monitorear y diagnosticar problemas en los servicios de IA en producción, asegurando la disponibilidad y
              la fiabilidad continua de las funcionalidades ofrecidas.
            </ItemClave>
          </ul>,
          "Logros": <ul>
            <ItemClave>
              Implementé correctamente un sistema de visualización de datos básado en nodos que
              permitia ver la cercanía entre contenido de diferentes documentos o imágenes.
            </ItemClave>
            <ItemClave>
              Fui el encargado de implementar todos los diseños gráficos interactivos que surgieron en
              mi estadía en la empresa.
            </ItemClave>
            <ItemClave>
              Implementé un editor de texto para documentos legales, que permitía modificar de
              forma práctica las personas involucradas en los textos, al igual que fechas, lugares o
              cualquier referencia recurrente en el documento.
            </ItemClave>
            <ItemClave>
              Desarrollé e implementé un sistema de traducción automático de página para Inglés e
              Italiano, haciendo uso de la API de Yandex, esta solución ayudó a reducir
              significativamente el trabajo de traducción, ya que el trabajo se convirtió en corrección de
              expresiones fuera de contexto y dejó de ser un trabajo de traducción completo.
            </ItemClave>
            <ItemClave>
              Propuse, diseñé e implementé un sistema de edición de contenido ágil, pudiendo
              modificar recursos multimedia o textuales desde la interfaz, esto con el fin de no
              depender necesariamente de los desarrolladores para modificar el contenido de la
              página, algo similar a como se hace con herramientas como WordPress.
            </ItemClave>
            <ItemClave>
              Integré al sistema diferentes servicios de IA desarrollados por mis compañeros, también
              de integrar servicios de OpenAI, como ChatGPT 3.5 y Dall-E 2
            </ItemClave>
            <ItemClave>
              Fui el encargado del sistema de registro e inicio de sesión, también del sistema de
              recuperación de contraseña.
            </ItemClave>
          </ul>,
        }}
      </VerticalTabs>;
    }
  }

  function ELCINCO() {
    return <EsquemaEmpresa
      Nombre="ELCINCO"
      Slogan="Productos y servicios a la medida"
      Web="https://www.elcinco.io/"
      Cargo="Lider de Desarrollo de software fullstack"
      Periodo={{
        inicio: {
          mes: 1,
          año: 2020
        },
        fin: {
          mes: 2,
          año: 2021
        }
      }}
      Ubicacion="Pereira, Risaralda, Colombia"
      Modalidad="Presencial"
      ImagenWeb="imgs/Empresas/ELCINCO-home.png"
      VerticalTabs={<VerticalTabsELCINCO />}
      Testimonio="
          Desde la implementación de sistemas innovadores hasta la capacitación del equipo, cada hito
          alcanzado representó un paso adelante en mi desarrollo profesional y personal. Me siento
          orgulloso de haber contribuido al éxito de la empresa y haber superado desafíos que me
          permitieron crecer y aprender. Estos logros fueron testimonio del poder del trabajo en
          equipo, la perseverancia y la pasión por lo que hago.
      "
      derecha={false}
    />;

    function VerticalTabsELCINCO() {
      return <VerticalTabs>
        {{
          "Funciones": <div>
            <ul>
              <ItemClave>
                Diseñar, desarrollar y mantener aplicaciones web y móviles utilizando tecnologías
                front-end como HTML, CSS, JavaScript, y frameworks como React.js y Angular.
              </ItemClave>
              <ItemClave>
                Desarrollar y mantener bases de datos utilizando tecnologías como MySQL, MongoDB, y Firebase.
              </ItemClave>
              <ItemClave>
                Implementar y mantener sistemas de autenticación y autorización utilizando
                técnicas como JSON Web Tokens (JWT) y OAuth.
              </ItemClave>
              <ItemClave>
                Colaborar con equipos multidisciplinarios para comprender los requisitos del
                proyecto y diseñar soluciones técnicas efectivas.
              </ItemClave>
              <ItemClave>
                Realizar pruebas unitarias y de integración para garantizar la calidad del código y
                la funcionalidad del producto final.
              </ItemClave>
              <ItemClave>
                Investigar y adoptar nuevas tecnologías y mejores prácticas para mejorar
                continuamente los procesos de desarrollo y la calidad del software.
              </ItemClave>
            </ul>
          </div>,
          "Recurrencia": <div>
            <ul>
              <li>
                <Resaltar>Desarrollo de nuevas características:</Resaltar> Implementar nuevas funcionalidades según
                los requisitos del cliente o las necesidades del producto. Esto implica escribir
                código limpio y eficiente, así como asegurarse de que las nuevas características se
                integren sin problemas con el resto del sistema.
              </li>
              <li>
                <Resaltar>Resolución de problemas (debugging):</Resaltar> Identificar y corregir errores o fallos en el
                código existente. Esto requiere habilidades para analizar y diagnosticar problemas,
                así como para aplicar soluciones efectivas de manera oportuna.
              </li>
              <li>
                <Resaltar>Optimización de rendimiento:</Resaltar> Analizar y mejorar el rendimiento del software,
                tanto en términos de velocidad de ejecución como de eficiencia de recursos. Esto
                puede implicar la optimización de consultas de bases de datos, la implementación
                de cachés o la refactorización de código.
              </li>
            </ul>
          </div>,
          "Logros": <div>
            <ul>
              <ItemClave>
                Colaboración con un equipo de trabajo para lograr sistemas de autenticación
                compartidos en diferentes aplicativos.
              </ItemClave>
              <ItemClave>
                Sistema de chat directo entre usuarios en el aplicativo
              </ItemClave>
              <ItemClave>
                Sistemas de retroalimentación en diferentes elementos, con calificaciones y comentarios.
              </ItemClave>
              <ItemClave>
                Reducción en la taza de abandono en un 20% por medio analisis de interfaz que
                entorpecian los procesos para lograr el fin del aplicativo.
              </ItemClave>
              <ItemClave>
                Incremento de retención, comprobando que un 5% más de usuarios recurrian
                a usar los servicios de los aplicativos.
              </ItemClave>
              <ItemClave>
                Implementación correcta de reportes en ventas, visitas o calificaciones, esto desde un
                formato web, o un formato de documento .xls o .pdf
              </ItemClave>
              <ItemClave>
                Capacité correctamente a integrantes del equipo en temas propios del aplicativo o en
                temas en los que tengo buen dominio, que pudieran ser relevantes en el proceso de
                mejora de calidad de producto.
              </ItemClave>
            </ul>
          </div>,
        }}
      </VerticalTabs>;
    }
  }

  function TestimonioPersonal({ children }) {
    return (<React.Fragment>
      <h2>
        <Titulo texto="Testimonio Personal" />
      </h2>
      <Paper
        sx={{
          padding: "30px",
          position: "relative",
          backgroundColor: "rgb(20, 20, 40)",
        }}
      >
        <div
          style={{
            opacity: 0.5,
          }}
        >
          <i
            class="fa-solid fa-quote-left"
            style={{
              fontSize: "40px",
            }} />
          <br />
          <br />
          <div>
            {children}
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <i
              className="fa-solid fa-quote-right"
              style={{
                fontSize: "40px",
              }} />
          </div>
        </div>
      </Paper>
    </React.Fragment>);
  }

  function ItemClave({ children }) {
    return <li>
      {resaltarPalabrasClave(children)}
    </li>;
  }

  function resaltarPalabrasClave(texto) {
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

  function ImagenEmpresaWeb({
    src,
    derecha = true,
    marginTop = "-100px",
  }) {
    const derechaT = "rotateY(30deg) rotateX(20deg) scale(0.9)";
    const izquierdaT = "rotateY(-30deg) rotateX(20deg) scale(0.9)";
    return <div
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
        return <img
          loading="lazy"
          src={src}
          style={{
            position: opacidad === 1 ? "relative" : "absolute",
            borderRadius: "20px",
            transform: `${derecha ? derechaT : izquierdaT} translateZ(${derecha ? z : z - 100}px)`,
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
    Nombre,
    Slogan,
    Web,
    Cargo,
    Periodo,
    Ubicacion,
    Modalidad,
    derecha = true,
  }) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let tiempoAños = new Date(Periodo.fin.año, Periodo.fin.mes - 1).getTime() - new Date(Periodo.inicio.año, Periodo.inicio.mes - 1).getTime();
    tiempoAños = tiempoAños / (1000 * 60 * 60 * 24 * 365.25);

    let lblPeriodo = <span>
      desde <Resaltar>
        {meses[Periodo.inicio.mes - 1].toString().padStart(2, "0")} del {Periodo.inicio.año}
      </Resaltar> a <Resaltar>
        {meses[Periodo.fin.mes - 1].toString().padStart(2, "0")} del {Periodo.fin.año}
      </Resaltar> <Resaltar color="plum">
        ({tiempoAños.toFixed(1)} años)
      </Resaltar>
    </span>;

    return <div>
      <h1
        style={{
          fontSize: "70px",
        }}
      >
        {Nombre}
      </h1>
      <h2
        style={{
          marginTop: "-40px",
          marginBottom: "30px",
          fontStyle: "italic",
          color: "skyblue",
        }}
      >
        {Slogan}
      </h2>
      <h4>
        Web
        <br />
        <Link
          href={Web}
          target="_blank"
        >
          {Web}
        </Link>
      </h4>

      <div
        style={{
          display: "flex",
          justifyContent: derecha ? "flex-start" : "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row Titulo="Cargo" Contenido={Cargo} />
          <Row Titulo="Periodo" Contenido={lblPeriodo} />
          <Row Titulo="Ubicación" Contenido={Ubicacion} />
          <Row Titulo="Modalidad" Contenido={Modalidad} />
        </div>
      </div>

    </div>;

    function Row({ Titulo, Contenido }) {
      return <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Resaltar>{Titulo}:</Resaltar> {Contenido}
      </div>;
    }
  }

  function Seccion2() {
    return <div
      style={{
        padding: "80px 50px",
        backgroundColor: 'rgba(150, 150, 255, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '50px',
          margin: '0 0 70px 0',
        }}
      >
        <Titulo texto="Proyectos y Librerías" />
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '100px',
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          {
            [1.1, 1.2, 1.3, 1.4, 1.5].map((opacity, i) => {
              return <i class="fa-solid fa-puzzle-piece"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  scale: `${opacity}`,
                  fontSize: '250px',
                  WebkitTextStrokeWidth: "2px",
                  WebkitTextStrokeColor: "gray",
                  color: 'transparent',
                  zIndex: -1,
                  opacity: 1 - (1.8 * (i + 1) / 10),
                }} />
            })
          }
          <i
            class="fa-solid fa-puzzle-piece"
            style={{
              fontSize: '250px',
            }}
          />
          <i class="fa-solid fa-code"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateY(20px)',
              fontSize: '70px',
              color: 'black',
            }} />;
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          He desarrollado diversas aplicaciones web y plataformas, enfocándome en mejorar la eficiencia, productividad y experiencia
          del usuario. Además, he creado librerías para simplificar acciones en proyectos.
          <br />
          <br />
          <br />
          <Button
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

      <br />
      <br />

      <HrGrueso width="50%" centrar={true} />

      <br />

      <h2
        style={{
          textAlign: 'center',
        }}
      >
        <Titulo texto="Trabajos en" />

      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5,
          padding: '10px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            width: '60%',
            scale: '0.8',
          }}
        >
          <ItemConGrafico_fs30px texto="Ciencia" icono="fa-solid fa-flask" />

          <ItemConGrafico_fs30px texto="Matemática" icono="fa-solid fa-square-root-variable" />

          <ItemConGrafico_fs30px texto="Juegos" icono="fa-solid fa-ghost" />

          <ItemConGrafico_fs30px texto="Animación" icono="fa-solid fa-motorcycle" />

          <ItemConGrafico_fs30px texto="Utilidades" icono="fa-solid fa-screwdriver-wrench" />

        </div>
      </div>

    </div>;
  }

  function ItemConGrafico_fs30px({ texto, icono }) {
    return <ItemConGrafico icono={icono}>
      <b
        style={{
          fontSize: '30px',
        }}
      >
        {texto}
      </b>
    </ItemConGrafico>;
  }

  function Seccion1() {
    return <div
      style={{
        padding: "80px 30px",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Fila1 />
      <br />
      <Fila2 />
      <br />
      <Fila3 />
    </div>;

    function Fila3() {
      return <div
        style={{
          opacity: 0.7,
        }}
      >
        Desarrollador de software con experiencia en diseño, desarrollo y mantenimiento de aplicaciones.
        Experto en lenguajes de programación y metodologías ágiles, enfocado en la resolución de problemas
        y mejora continua.
      </div>;
    }

    function Fila2() {
      return <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            width: '70%',
          }}
        >
          <div
            style={{
              fontSize: '70px',
              fontWeight: 'bolder',
              width: '48%',
              marginTop: '-30px',
            }}
          >
            <Titulo />
            <HrGrueso width="50%" />
          </div>
          <br />
          <span
            style={{
              fontSize: '70px',
              fontWeight: 'bold'
            }}
          >
            Soy <Resaltar>Jeffrey</Resaltar> Alexander <Resaltar>Agudelo</Resaltar> Espitia
          </span>

          <br />
          <br />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
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
          <HrGrueso width="70%" />
          <br />
          <br />

        </div>

        <div
          style={{
            width: '58%',
          }}
        >
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

          </div>


        </div>

        <img
          loading="lazy"
          src="imgs/jeff-profile.png"
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
            backgroundImage: "url(imgs/back.gif)",
            backgroundSize: "cover",
            backgroundBlendMode: "hard-light",
            opacity: 0.4,
            border: "5px solid white",
          }} />
      </div>;
    }

    function Fila1() {
      return <div
        style={{
          fontSize: '50px',
        }}
      >
        ¡Mucho gusto!
      </div>;
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
        <small>
          {titulo1}
        </small>
        <br />
        <Resaltar>
          {titulo2}
        </Resaltar>
      </ItemConGrafico>
    );
  }

  function RowItemsGraficos({ children, titulo }) {
    return <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'end',
        gap: '0 30px',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottom: '1px solid gray',
        padding: '10px',
      }}
    >
      <small
        style={{
          width: '100%',
          textAlign: 'right',
          padding: '10px 0',
        }}
      >
        <Titulo texto={titulo} />
      </small>
      {children}
    </div>;
  }

  function ItemConGrafico({
    invertir,
    izquierda,
    icono,
    children,
  }) {
    return <div
      style={{
        display: 'flex',
        flexDirection: invertir ? 'row-reverse' : 'row',
        textAlign: invertir ? 'right' : 'left',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        {(() => {
          if (izquierda) {
            return <span
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
              }}
            >
              {izquierda}
            </span>;
          }
          if (icono) {
            return <i className={icono}></i>;
          }
        })()}
      </span>
      &nbsp;
      <span
        style={{
          fontSize: '13px',
        }}
      >
        {children}
      </span>
    </div>;
  }
}