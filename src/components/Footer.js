import { Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Link } from "@material-ui/core";
import logo2 from '../assets/logo_blanco.png';

const classes = makeStyles((theme) => ({
    image: {
        marginLeft: "10px",
    }
}));


export default function Footer() {
    return (
        <footer>
            <Box px={{ xs: 1, sm: 10 }} py={{ xs: 2, sm: 10 }}
                bgcolor="text.secondary"
                color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <img src={logo2}
                                alt='Commerce.js'
                                height='170px'
                                className={classes.image} />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Box borderBottom={1}>
                                <Typography variant="h6">
                                    Ayuda
                                </Typography>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Categorias
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Contacto
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Box borderBottom={1}>
                                <Typography variant="h6">
                                    Cuenta
                                </Typography>
                            </Box>
                            <Box>
                                <Link href="/signin" color="inherit">
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/signup" color="inherit">
                                    Registrarse
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>
                                <Typography variant="h6">
                                    Redes sociales
                                </Typography></Box>
                            <Box>
                                <Link href="/signin" color="inherit">
                                    WhatsApp
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/signup" color="inherit">
                                    Instagram
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/signup" color="inherit">
                                    Facebook
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </footer>
    )
}