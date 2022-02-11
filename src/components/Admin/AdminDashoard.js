import React from 'react';
import { actionType } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminProducts from './AdminProducts';
import AdminProductsType from './AdminProductsType';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    itemTab: {
        color: "white",
        fontFamily: "arial",
        fontSize: "20px"
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}



const AdminDashoard = () => {
    const [{ userType }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    className={classes.footerSubItem}
                >
                    <LinkTab label="Pedidos" href="/drafts" {...a11yProps(0)} className={classes.itemTab} />
                    <LinkTab label="Categorias" href="/trash" {...a11yProps(1)} className={classes.itemTab} />
                    <LinkTab label="Productos" href="/spam" {...a11yProps(2)} className={classes.itemTab} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Pedidos
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdminProductsType />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AdminProducts />
            </TabPanel>
        </div>
    );
};

export default AdminDashoard;
