const _Registel_ = {
    nombre: 'Registel',
    slogan: 'Información real para soluciones efectivas',
    web: 'https://registel.co/',
    cargo: 'Lider de Desarrollo de software fullstack',
    periodo: {
        inicio: {
            mes: 12,
            año: 2022
        },
        fin: {
            mes: 5,
            año: 2024
        }
    },
    ubicacion: 'Cali, Valle del Cauca, Colombia',
    modalidad: 'Presencial',
    imgweb: 'componentes/paginas/perfil/empresas/imgs/Registel-Home.JPG',
    logo: 'componentes/paginas/perfil/empresas/imgs/Registel-logo.png',
    testimonio: `
        En Registel S.A.S, lideré iniciativas clave que mejoraron la eficiencia operativa y la experiencia
        del usuario. Propuse y desarrollé un sistema innovador de control de ruta para visualizar la
        ubicación de los autobuses en tiempo real, implementé un sistema de salidas inspirado en
        aeropuertos y lideré el área de reportes, manteniendo una identidad coherente en más de 20
        tipos de informes. También introduje mejoras en alertas, sistemas de liquidación automática
        para conductores y algoritmos para la creación rápida de geozonas, abordando desafíos
        técnicos y optimizando procesos.
    `,
    detalles: {
        "Desarrollo Backend": [
            `
              Implementación de la lógica empresarial y la capa de persistencia utilizando tecnologías Java y Java
              Enterprise Edition (JEE), como Servlets, Enterprise JavaBeans (EJB) y Java Persistence API (JPA).
            `,
            `
              Desarrollo de servicios backend en Node.js para aplicaciones web y móviles, utilizando frameworks
              como Express.js para la creación de APIs RESTful.
            `,
            `
              Desarrollo de algoritmos y lógica de negocio en Python, especialmente en el contexto de proyectos de
              análisis de datos y machine learning.
            `,
        ],
        "Desarrollo Frontend": [
            `
              Creación de interfaces de usuario interactivas utilizando Angular, aprovechando su robustez para la
              creación de aplicaciones web dinámicas.
            `,
            `
              Implementación de páginas web dinámicas con Angular.js y JavaServer Pages (JSP), presentando
              datos y funcionalidades del backend de manera efectiva.
            `,
            `
              Diseñar y desarrollar páginas web dinámicas utilizando JavaServer Pages (JSP) para presentar datos y
              funcionalidades de backend en el navegador web.
            `,
            `
              Implementar etiquetas personalizadas y scripts de servidor en JSP para generar contenido dinámico
              basado en la lógica empresarial y los datos recuperados de la capa de backend.
            `,
            `
              Utilizar JSTL (JavaServer Pages Standard Tag Library) para simplificar la gestión y presentación de
              datos en las páginas JSP.
            `,
            `
              Colaborar con diseñadores y desarrolladores frontend para garantizar la coherencia y la usabilidad de la
              interfaz de usuario en las aplicaciones web basadas en JSP.
            `,
        ],
        "Integración de Tecnologías":[
            `
              Integración de servicios y APIs desarrollados en diferentes tecnologías, como Java, Node.js y Python,
              para garantizar la comunicación efectiva entre los componentes del sistema.
            `,
            `
              Colaboración estrecha con equipos multidisciplinarios para garantizar la coherencia y la eficacia de las
              soluciones desarrolladas.
            `,
        ],
        "Logros":[
            {
                img: 'componentes/paginas/perfil/empresas/imgs/Registel-ControlLineal.png',
                content: `
                    Propuse y desarrollé una mejor experiencia en un concepto que se llama control lineal de ruta,
                    pudiendo visualizar de forma animada y actualizada las posiciones de los buses en una ruta,
                    haciendo uso de un modelo de carretera en forma de herradura.
                `
            },
            {
                img: 'componentes/paginas/perfil/empresas/imgs/Registel-TableroDeSalidas.png',
                content: `
                    Desarrollé un sistema de salidas de buses, enfocado en presentarse en pantallas grandes ubicadas
                    en las terminales, para indicar a los usuarios el estado de los buses según su llegada o salida de la
                    terminal. esto inspirado en el sistema de salidas de aviones en un aeropuerto.
                `
            },
            `
              Lideré y gestioné el área de reportes de la empresa, pudiendo mantener una identidad
              coherente y un mismo estilo en todos los reportes, en mi responsabilidad estuvo la de
              elaborar, corregir y modificar más de 20 tipos de reportes diferentes.
            `,
            `
              Mejoré la experiencia de alertas en los buses, pudiendo mostrar gráficamente la ubicación
              en la que se violó una regla de locación o de ruta.
            `,
            `
              Desarrollé un sistema de ventanas flotantes que permitió mostrar información relevante a
              los buses y su graficación en mapa, sin tener que cambiar de pestaña.
            `,
            `
              Elaboré un sistema de liquidación automático para conductores, que se actualizaba en
              tiempo real, con el cuál se le indicaba a los conductores cuánto dinero recaudado tenian
              que entregar a la empresa.
            `,
            `
              Inventé e implementé un algoritmo para elaboración de geozonas de forma rápida
              aprovechando buses que habían seguido correctamente una ruta, esto minimizo
              drasticamente la elaboración de geozonas, anteriormente las elaboraban a mano
              demorandose varios dias en establecer una ruta, con mi aporte se paso de periodos de días
              de trabajo a mano a la elaboración de una geozona de ruta que tardaba máximo 20
              segundos en calcularse.
            `,
            `
              Solucioné problemas de regiones en geozonas poligonales que se autointersectaban,
              agregando un concepto propio al que denominé como rutas de polilíneas que por medio
              de geometría pura calculaba los casos exitosamente aún en las autointersecciones de las
              rutas.
            `,
            `
              Fuí el encargado de todo el sistema de seguimiento de mantenimiento, pudiendo llevar el
              registro de las distancias recorridas u horas trabajadas de todos los buses, para que se
              pudiera hacer el mantenimiento de llantas, cambio de aceite o de otros elementos que
              dependieran de factores de distancia recorrida o de tiempo de uso.
            `,
            `
              Fui el encargado de modificar toda la interfaz de modificación y creación de geozonas,
              corrigiendo errores, añadiendo herramientas y cambiando casi toda la distribución de
              botones y herramientas del sistema, todo esto con la pericia de mantenerse estable con la
              representación de gráficos de leaflet.
            `,
            `
              Desarrollé una propuesta que ayudó a identificar la ruta que estaba siguiendo un bus, esto
              lo desarrollé basándose en el concepto de la distancia coseno para lograr una
              aproximación acertada aunque el bus omitiera puntos de control o pasará por puntos que
              no eran propios de la ruta.
            `,
        ]
    }
}