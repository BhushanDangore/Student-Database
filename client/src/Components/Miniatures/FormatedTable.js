import React from 'react'
import { withStyles, TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function FormatedTable({ tableData, size = "medium", headerData, linkPathIdentifire }) {

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

    let { url } = useRouteMatch();
    
    return (
        <TableContainer>
            <Table size={size} component='div' stickyHeader >
                <TableHead component='div'>
                    <StyledTableRow component='div'>
                        {createRowOfObject(tableData[0])}
                    </StyledTableRow>
                </TableHead>
                <TableBody component='div' >
                    {
                        tableData.length === 0 ? <TableRow component='div'  ><TableCell component='div' style={{borderBottom: "none"}} >No Record Found.</TableCell></TableRow> :
                        tableData.map((obj, indx) => {
                                    return (linkPathIdentifire ? 
                                    <Link
                                        key={indx}
                                        to={`${url}/${obj[linkPathIdentifire]}`}
                                        style={LinkStyles}
                                    >
                                        {   Object.values(obj).map((val, indx) => (<TableCell key={indx} component='div' >{val}</TableCell>))   }
                                    </Link>
                                    :
                                    <StyledTableRow key={indx} component='div' >
                                        {   Object.values(obj).map((val, indx) => (<TableCell key={indx} component='div' >{val}</TableCell>))   }
                                    </StyledTableRow>
                                )}
                            
                            )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(FormatedTable);
