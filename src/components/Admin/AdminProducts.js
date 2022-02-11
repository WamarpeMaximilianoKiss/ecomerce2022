import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'


const columns = [
    { field: 'id', title: 'Id', type: "numeric" },
    { field: 'name', title: 'Nombre' },
    { field: 'productType', title: 'Categoria' },
    { field: 'weight', title: 'Peso', type: "numeric" },
    { field: 'measure_sale', title: 'Medida de venta' },
    { field: 'stock', title: 'Stock', type: "numeric" },
    { field: 'stock_min', title: 'Stock mínimo', type: "numeric" },
    { field: 'price_cost', title: 'Precio de costo', type: "numeric" },
    { field: 'price_sale', title: 'Precio de venta', type: "numeric" },
    { field: 'enabled', title: 'Habilitado', align: "right" }
];


const rows = [
    {
        "id": 1, "name": "Tobillera", "productType": "Pulseras", "weight": 50, "measure_sale": "GRS", "stock": 50,
        "stock_min": 150, "price_cost": 80.5, "price_sale": 160, "enabled": "SI"
    },
    {
        "id": 2, "name": "Piedra de caca", "productType": "Piedras", "weight": 50, "measure_sale": "GRS", "stock": 33,
        "stock_min": 150, "price_cost": 140, "price_sale": 360, "enabled": "SI"
    },
    {
        "id": 3, "name": "Mostasilla batman", "productType": "Mostasillas", "weight": 50, "measure_sale": "GRS", "stock": 123,
        "stock_min": 50, "price_cost": 40, "price_sale": 60, "enabled": "SI"
    },
    {
        "id": 4, "name": "Mostasilla barbie", "productType": "Mostasillas", "weight": 50, "measure_sale": "GRS", "stock": 40,
        "stock_min": 150, "price_cost": 40, "price_sale": 65, "enabled": "SI"
    },


];



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    mnuGroupButtons: {
        marginRight: "20px",
    },
    container: {
        maxHeight: 550,
    },
    btnGroupButtons: {
        marginBottom: 25,
        fontSize: "large",
        fontFamily: "Arial",
        height: 55,
    }
});

const editarProducto = (data) => {
    alert("editar " + data.name)
}

const eliminarProducto = (data) => {
    alert("eliminar " + data.name)
}


const AdminProducts = () => {
    return (
        <div>
            <MaterialTable columns={columns} data={rows} title="Productos"
                options={{
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    actionsColumnIndex: -1,
                    exportButton: true,
                    grouping: true
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

export default AdminProducts;