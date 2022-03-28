import MaterialTable from 'material-table'
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Container, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const columns = [
    {
        field: 'id', title: 'Id', type: "numeric", Header: () => (
            <div
                style={{
                    textAlign: "left"
                }}
            >Ids</div>)
    },
    { field: 'nombre', title: 'Nombre' },
    { field: 'categoria', title: 'Categoria' },
    { field: 'peso', title: 'Peso', type: "numeric" },
    { field: 'stock', title: 'Stock', type: "numeric" },
    { field: 'importe_venta', title: 'Precio de venta', type: "numeric" },
    { field: 'habilitado', title: 'Habilitado', align: "right" }
];

const editarProducto = (data) => {
    alert("editar " + data.name)
}

const eliminarProducto = (data) => {
    alert("eliminar " + data.name)
}

const useStyles = makeStyles((theme) => ({
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        border: '2px solid #000',
        backgroundColor: "white",
        padding: "10px"
    },
    campo: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        display: "inline-block",
        width: "140px",
        textAlign: "right",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        minWidth: 120,
    },
    input: {
        display: 'none',
    },
}));

const AdminProducts = (props) => {

    const [products, setProducts] = React.useState(null);
    const [categorias, setCategorias] = React.useState(null);
    const [colores, setColores] = React.useState(null);

    //inputs form
    const [nombre, setNombre] = React.useState(null);
    const onNombreChanges = (e) => setNombre(e.target.value);
    const [descripcion, setDescripcion] = React.useState(null);
    const onDescripcionChanges = (e) => setDescripcion(e.target.value);
    const [categoriaSel, setCategoriasSel] = React.useState(null);
    const [peso, setPeso] = React.useState(null);
    const onPesoChanges = (e) => setPeso(e.target.value);
    const [importeCosto, setImporteCosto] = React.useState(null);
    const onImporteCChanges = (e) => setImporteCosto(e.target.value);
    const [importeVenta, setImporteVenta] = React.useState(null);
    const onImporteVChanges = (e) => setImporteVenta(e.target.value);
    const [stock, setStock] = React.useState(null);
    const onStockChanges = (e) => setStock(e.target.value);

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [state, setState] = React.useState([]);

    React.useEffect(() => {
        axios.get(props.baseURL + "categorias/categorias").then((response) => {
            setCategorias(response.data);
        });
        axios.get(props.baseURL + "colores").then((response) => {
            setColores(response.data);
        });
    }, []);

    function verArchivos() {
        var name = document.getElementById('imagenesNuevas');
        alert('Cantidad elegida: ' + name.files.length);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        verArchivos();
    };


    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    return (

        <div >
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
                <DialogContent>
                    <Container maxWidth="md">
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    {/* <InputLabel htmlFor='nombre'>Nombre</InputLabel> */}
                                    <TextField onChange={onNombreChanges} name="nombre" id="nombre" label="Nombre" variant="outlined" size="small" />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    {/* <InputLabel htmlFor='descripcion'>Descripcion</InputLabel> */}
                                    <TextField onChange={onDescripcionChanges} name='descripcion' id="descripcion" label="Descripción del producto" variant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    {/* <InputLabel htmlFor='categoria'>Categoria</InputLabel> */}
                                    < Select
                                        className={classes.select}
                                        native
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'categoria',
                                            id: 'categoria',
                                        }}
                                    >
                                        {
                                            categorias?.map(categoria => (
                                                <option value={categoria.id}>{categoria.nombre}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField onChange={onPesoChanges} name="peso" id="peso" label="Peso del producto" variant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField onChange={onStockChanges} name="stock" id="stock" label="Stock actual" variant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    <TextField onChange={onImporteCChanges} name="importec" id="importec" label="Importe costo" variant="outlined" size="small" />
                                </FormControl>
                                <FormControl onChange={onImporteVChanges} className={classes.formControl}>
                                    <TextField name="importev" id="importev" label="Importe venta" variant="outlined" size="small" />
                                </FormControl>
                            </Grid>
                            <Typography variant='h6'>
                                Colores Disponibles
                            </Typography>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    <List className={classes.root}>
                                        {colores?.map((value) => {
                                            const labelId = `checkbox-list-label-${value}`;

                                            return (
                                                <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(value) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={value.nombre} />

                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </FormControl>
                            </Grid>
                            <Typography variant='h6'>
                                Imagenes
                            </Typography>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <FormControl className={classes.formControl}>
                                    <input
                                        name='imagenesNuevas'
                                        id='imagenesNuevas'
                                        accept="image/*"
                                        className={classes.input}
                                        multiple
                                        type="file"

                                    />
                                    <label htmlFor="imagenesNuevas">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload
                                        </Button>
                                    </label>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <MaterialTable columns={columns}
                data={query =>
                    new Promise((resolve, reject) => {
                        fetch(props.baseURL + "productos/productos")
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result
                                })
                            })
                    })
                }
                title="Productos"
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    actionsColumnIndex: -1,
                    exportButton: true,
                    grouping: true,

                }}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Editar producto",
                        onClick: (event, rowData) => editarProducto(rowData)
                    },
                    {
                        icon: "delete",
                        tooltip: "Eliminar producto",
                        onClick: (event, rowData) => eliminarProducto(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Agregar nuevo Producto',
                        isFreeAction: true,
                        onClick: (event) => handleClickOpen()
                    }
                ]}
                localization={{
                    header: {
                        actions: "Acciones"
                    },
                    body: {
                        emptyDataSourceMessage: "No hay ningun dato para mostrar"
                    },
                    toolbar: {
                        searchTooltip: "Buscar",
                        searchPlaceholder: "Buscar",
                    },
                    grouping: {
                        placeholder: "Arrastre las columnas aqui para filtrar",
                        groupedBy: "Agrupar por:"
                    },
                    pagination: {
                        firstTooltip: "Primer página",
                        firstAriaLabel: "Primer página",
                        lastTooltip: "Última página",
                        lastAriaLabel: "Última página",
                        previousAriaLabel: "Anterior",
                        previousTooltip: "Anterior",
                        nextAriaLabel: "Siguiente",
                        nextTooltip: "Siguiente",
                        labelDisplayedRows: "{from}-{to} de {count}",
                        labelRowsSelect: "Filas"
                    }
                }}

            />
        </div >
    );
}

export default AdminProducts;