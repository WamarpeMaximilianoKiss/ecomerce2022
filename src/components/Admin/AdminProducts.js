import MaterialTable from 'material-table'
import axios from "axios";
import React, { useState, useEffect } from 'react';

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



const AdminProducts = () => {

    const baseURL = "https://apiplayabrava.herokuapp.com/api/productos/productos";
    const [products, setProducts] = React.useState(null);

    return (

        < div >
            <MaterialTable columns={columns}
                data={query =>
                    new Promise((resolve, reject) => {
                        fetch(baseURL)
                            .then(response => response.json())
                            .then(result => {
                                console.log("Resultadito: ", result)
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
                        onClick: (event) => alert("You want to add a new row")
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