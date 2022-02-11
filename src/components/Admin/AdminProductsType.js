import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Button, IconButton } from '@material-ui/core';
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';

const baseURL = "https://apiplayabrava.herokuapp.com/api/categorias/categorias";


const columns = [
    { id: 'Id', label: 'Id', minWidth: 10, },
    { id: 'nombre', label: 'Nombre', minWidth: 600 },
    { id: 'activo', label: 'Activa', minWidth: 50 },
    { id: 'editar', label: 'Editar', minWidth: 50 },
    { id: 'eliminar', label: 'Eliminar', minWidth: 50 },


];

function createData(id, name) {
    return {
        id, name
    };
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
    }
});

const AdminProductsType = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categorias, setCategorias] = React.useState(null);
    const rows = [];


    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setCategorias(response.data);
        });
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editIcon = index => (
        <IconButton onClick={() => this.editComponent(index)}>
            <EditIcon color="primary" />
        </IconButton>
    );

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item className={classes.mnuGroupButtons}>
                            <Button variant="contained" color="secondary" className={classes.btnGroupButtons} >Nueva categoria</Button>
                        </Grid>
                        <Grid item className={classes.mnuGroupButtons}>
                            <Button variant="contained" color="secondary" className={classes.btnGroupButtons} >Exportar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categorias?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {

                                                                column.format && typeof value === 'number' ? column.format(value) : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>

        </div>

    );
}

export default AdminProductsType;