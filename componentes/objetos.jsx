function generarMenuInferior(props) {
  asignarPropiedades(this, props);

  this.keys = function () {
    return Object.keys(this.opciones);
  }

  this.opcionIDSeleccionada = function () {
    return this.keys()[this.calcIndex()];
  }
}

function GenerarContenidoLibreria(props) {
  asignarPropiedades(this, props);
  this.githubPage = this.github.replaceAll("https://github.com/Jeff-Aporta", "https://jeff-aporta.github.io");
  this.resumen.rel = this.githubPage;
  this.resumen.img = this.img;
}

function asignarPropiedades(t, props) {
  Object.entries(props).forEach(([k, v]) => {
    if (typeof v === "function") {
      t[k] = v.bind(t);
    } else {
      t[k] = v;
    }
  });
}

function VerticalTabs({ children = {
  "Item One": "Item One content"
} }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
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
        className={CSScmds(`
            x<900px?display: (none,);
          `)}
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

function AcordeonTheme({ titulo, defaultExpanded = false, children, setIndex, index }) {
  return (
    <Accordion
      className={CSScmds(`
          400px<-x->1000px?border: (0px, 3px) solid #222;
      `)}
      expanded={defaultExpanded}
      elevation={0}
      style={{
        minWidth: "1px",
        borderBottom: "1px solid #222",
      }}
      spacing={0}
    >
      <AccordionSummary
        expandIcon={<i className="fa-solid fa-chevron-down" />}
        style={{
          backgroundColor: defaultExpanded ? "rgb(30, 30, 40)" : themeSelected.palette.grey[900],
        }}
        onClick={() => setIndex(defaultExpanded ? -1 : index)}
      >
        {titulo}
      </AccordionSummary>
      <AccordionDetails
        AccordionDetails
        sx={{
          maxWidth: "95dvw !important",
          padding: "0px",
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  )
}