import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from 'material-table'
import Swal from "sweetalert2"
import axios from "axios";



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



const AdminProductsType = (props) => {

    const baseURL = props.baseURL;
    const classes = useStyles();
    const [categorias, setCategorias] = React.useState(null);
    const rows = [];
    const [open, setOpen] = React.useState(false);
    const [nuevaCategoria, setNuevaCategoria] = React.useState(null)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState(null)
    const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = React.useState(null)
    const [openSignup, setOpenSignup] = React.useState(false);

    const editarProducto = (data) => {
        setCategoriaSeleccionada(data.nombre)
        setCategoriaSeleccionadaId(data.id)
        setOpenSignup(true)

    }
    const SignupModal = (props2) => {
        return (
            <div>
                <Dialog
                    open={props2.open}
                    onClose={props2.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className={classes.title}>
                        Editar categoria
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <div className={classes.text}>
                            <TextField id="standard-basic" label="nombre" fullWidth value={categoriaSeleccionada} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props2.handleClose} className={classes.signUpButton}>
                            Cancelar
                        </Button>
                        <Button onClick={props2.handleClose} className={classes.signUpButton}>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        };

        var data = JSON.stringify({
            "nombre": nuevaCategoria
        });

        var config = {
            method: 'post',
            url: "http://localhost:9000/api/categorias/categorias",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                var respuesta = JSON.stringify(response.data)
                if (respuesta.includes('correctamente')) {
                    Swal.fire({
                        icon: 'success',
                        title: respuesta,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div>

            <SignupModal open={openSignup} handleClose={() => setOpenSignup(false)} />

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
                        fetch("http://localhost:9000/api/categorias/categorias")
                            .then(response => response.json())
                            .then(result => {
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