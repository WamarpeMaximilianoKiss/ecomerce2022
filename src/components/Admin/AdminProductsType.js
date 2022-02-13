import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from 'material-table'
import Swal from "sweetalert2"
import axios from "axios";

const baseURL = "https://apiplayabrava.herokuapp.com/api/categorias/categorias";
const baseURLTest = "localhost:9000/api/categorias/categorias";

const columns = [
    {
        field: 'id', title: 'Id', type: "numeric",
        cellStyle: {
            textAlign: "left",
            width: "10px"

        },
        headerStyle: {
            textAlign: "left",
        },
    },
    {
        field: 'nombre', title: 'Nombre',
        cellStyle: {
            textAlign: "left"
        },
        headerStyle: {
            textAlign: "left"
        },
        width: "10%"
    },
];

const editarProducto = (data) => {
    alert("editar " + data.nombre)
}

const eliminarProducto = (data) => {
    alert("eliminar " + data.nombre)
}


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
});

const AdminProductsType = () => {

    const classes = useStyles();
    const [categorias, setCategorias] = React.useState(null);
    const rows = [];
    const [open, setOpen] = React.useState(false);
    const [nuevaCategoria, setNuevaCategoria] = React.useState(null)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const agregarNuevaCategoria = () => {
        handleClose()
        const headers = {
            "Content-Type": "application/json",
        };
        const addCategoria = { "nombre": "jj" }
        console.log(JSON.stringify(addCategoria))
        axios.post(baseURL, {
            nombre: 'Fred',
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // axios({
        //     method: 'POST',
        //     url: baseURL,
        //     headers: { headers },
        //     data: JSON.stringify(addCategoria),
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar nueva categoria</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        label="Nombre de la categoria"
                        type="text"
                        fullWidth
                        value={nuevaCategoria}
                        onChange={e => setNuevaCategoria(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => agregarNuevaCategoria()} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <MaterialTable columns={columns}
                data={query =>
                    new Promise((resolve, reject) => {
                        fetch(baseURL)
                            .then(response => response.json())
                            .then(result => {
                                console.log("Resultadito: ", result)
                                resolve({
                                    data: result,
                                    page: 0,
                                    totalCount: result.length,
                                })
                            })
                            .catch(error => {
                                console.log(error)
                            })


                    })
                }
                title="Categorias"
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
                        tooltip: "Editar categoria",
                        onClick: (event, rowData) => editarProducto(rowData)
                    },
                    {
                        icon: "delete",
                        tooltip: "Eliminar categoria",
                        onClick: (event, rowData) => eliminarProducto(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Agregar nueva categoria',
                        isFreeAction: true,
                        onClick: (event) => handleOpen()
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
        </div>

    );
}

export default AdminProductsType;