import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

function FormatedTable({ tableData, size = "small", headerData, prefixPath = "", linkPathIdentifire }) {

    if (!(tableData instanceof Array) || !(headerData instanceof Array)) throw new Error("tableData And headerData Are Required Fields of type Array")

    const LinkStyles = {
        color: "inherit",
        display: "table-row",
        outline: 0,
        verticalAlign: "middle"
    }

    const createRowOfObject = () => {

        return (
            headerData.map((colName, indx) => (
                <TableCell component='div' key={indx} > {colName.trim()} </TableCell>
            ))
        )

    }
    console.log(tableData[0])

    return (
        <TableContainer>
            <Table size={size} component='div' >
                <TableHead component='div'>
                    <TableRow component='div'>
                        {createRowOfObject(tableData[0])}
                    </TableRow>
                </TableHead>
                <TableBody component='div' >
                    {
                        tableData.length === 0 ? <TableRow component='div' ><TableCell colSpan={headerData.length} component='div' >No Record Found.</TableCell></TableRow> :
                            tableData.map((obj, indx) => {
                                    return (linkPathIdentifire ? 
                                    <Link
                                        key={indx}
                                        to={prefixPath+ "/" + obj[linkPathIdentifire]}
                                        style={LinkStyles}
                                    >
                                        {   Object.values(obj).map((val, indx) => (<TableCell key={indx} component='div' >{val}</TableCell>))   }
                                    </Link>
                                    :
                                    <TableRow key={indx} component='div' >
                                        {   Object.values(obj).map((val, indx) => (<TableCell key={indx} component='div' >{val}</TableCell>))   }
                                    </TableRow>
                                )}
                            
                            )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FormatedTable;