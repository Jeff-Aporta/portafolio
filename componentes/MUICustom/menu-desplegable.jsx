const StyledMenu = styled((props) => (
    <Menu
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function MenuDesplegable({ txt, icon, contenido = [], className }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <span
            className={className}
        >
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={<i className={icon} />}
                sx={{
                    p: 1,
                    color: "text.primary"
                }}
            >
                {txt}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
            >
                {
                    contenido.map((item, i) => {
                        return (
                            <MenuItem
                                onClick={item.accion}
                                style={{
                                    backgroundColor: item.color,
                                    color: "inherit",
                                }}
                                component="a"
                                href={item.href}
                                target="_blank"
                            >
                                <ListItemIcon>
                                    <i className={item.icon} />
                                </ListItemIcon>
                                <ListItemText>
                                    {item.txt}
                                </ListItemText>
                                <Typography variant="body2" color="text.secondary">
                                    <small>
                                        {item.subtxt}
                                    </small>
                                </Typography>
                            </MenuItem>
                        );
                    })
                }
            </StyledMenu>
        </span>
    );
}