import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";
import Products from './Products';

const baseURL = "https://apiplayabrava.herokuapp.com/api/categorias/categorias";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
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
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "whitesmoke",
    },
    tab: {
        backgroundColor: "primary",
    }
}));

export default function Categories() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [categorias, setCategorias] = React.useState(null);


    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setCategorias(response.data);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.tab}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {
                        categorias?.map((item, x) => (
                            < Tab key={x} label={item.nombre} {...a11yProps(item.Id)} />
                        ))
                    }

                </Tabs>
            </AppBar>
            {
                categorias?.map((item, i) => (
                    <TabPanel value={value} index={i}>
                        <Products id_cate={item.Id} />
                    </TabPanel>
                ))
            }

        </div>
    );
}
