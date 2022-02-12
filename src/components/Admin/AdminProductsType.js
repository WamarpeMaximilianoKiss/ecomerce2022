import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, IconButton } from '@material-ui/core';
import axios from "axios";

const baseURL = "https://apiplayabrava.herokuapp.com/api/categorias/categorias";


const columns = [
    { id: 'Id', label: 'Id', minWidth: 10, },
    { id: 'nombre', label: 'Nombre', minWidth: 600 },
    { id: 'activo', label: 'Activa', minWidth: 50 },
    { id: 'editar', label: 'Editar', minWidth: 50 },
    { id: 'eliminar', label: 'Eliminar', minWidth: 50 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    mnuGroupButtons: {
        marginRight: "20px",
    },
    container: {
        maxHeight: 550,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnGroupButtons: {
        marginBottom: 25,
        fontSize: "large",
        fontFamily: "Arial",
        height: 55,
    }
});

const AdminProductsType = () => {
    const classes = useStyles();
    const [categorias, setCategorias] = React.useState(null);
    const rows = [];

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setCategorias(response.data);
        });
    }, []);

    return (
        <div>

        </div>

    );
}

export default AdminProductsType;