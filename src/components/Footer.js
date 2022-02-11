import { Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "@material-ui/core";
import logo2 from '../assets/logo_blanco.png';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    footerSubItem: {
        lineHeight: 1.5,
        color: "white",
        fontFamily: "arial"
    },
    footerIconSubItem: {
        lineHeight: 1,
        color: "white",
        fontFamily: "arial",
    },
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        linkfooter: {
            light: '#fffff',
            main: '#fffff',
            dark: '#fffff',
            contrastText: '#000',
        },
    },
}));


export default function Footer() {
    const classes = useStyles();

    return (
        <footer>
            <Box
                marginTop="15px"
                bgcolor="text.secondary"
                color="linkfooter">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item container xs={12} sm={2}
                            direction="column"
                            alignItems="center"
                            justifyContent="center">
                            <img src={logo2}
                                alt='Commerce.js'
                                height='150px' />
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.footerSubItem}>
                            <Box borderBottom={1}>
                                <Typography variant="h6" className={classes.footerSubItem}>
                                    Ayuda
                                </Typography>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" className={classes.footerSubItem}>
                                    Categorias
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit" className={classes.footerSubItem}>
                                    Contacto
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.footerSubItem}>
                            <Box borderBottom={1}>
                                <Typography variant="h6" >
                                    Cuenta
                                </Typography>
                            </Box>
                            <Box>
                                <Link href="/signin" color="inherit" className={classes.footerSubItem} >
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/signup" color="inherit" className={classes.footerSubItem}>
                                    Registrarse
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.footerSubItem}>
                            <Box borderBottom={1}>
                                <Typography variant="h6"  >
                                    Redes sociales
                                </Typography></Box>
                            <Box className={classes.footerSubItem}>
                                <IconButton aria-label='WhatsApp' color="inherit">
                                    <WhatsAppIcon fontSize='medium' />
                                </IconButton>
                                +5422574145741
                            </Box>
                            <Box className={classes.footerSubItem}>
                                <IconButton aria-label='Instagram' color="inherit">
                                    <InstagramIcon fontSize='medium' />
                                </IconButton>
                                /playabrava.art
                            </Box>
                            <Box className={classes.footerSubItem}>
                                <IconButton aria-label='Facebook' color="inherit">
                                    <FacebookIcon fontSize='medium' />
                                </IconButton>
                                /playabrava.art
                            </Box>
                            <Box className={classes.footerSubItem}>
                                <IconButton aria-label='Correo Electrónico' color="inherit">
                                    <MailOutlineIcon fontSize='medium' />
                                </IconButton>
                                franco@hotmail.com
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}