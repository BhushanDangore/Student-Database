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

function FormatedTable({ tableData, size = "medium", formatting, linkPathIdentifire }) {

    if (!(formatting instanceof Array || tableData instanceof Array)) throw new Error("formatting and tableData are Required Props of type Array")

    const LinkStyles = {
        color: "inherit",
        display: "table-row",
        outline: 0,
        verticalAlign: "middle"
    }

    let { url } = useRouteMatch();
    
    return (
        <TableContainer>
            <Table size={size} component='div' stickyHeader >
                <TableHead component='div'>
                    <StyledTableRow component='div'>
                        {formatting.map( (column, indx) => {
                            return <TableCell component='div' key={indx} > {column.name} </TableCell>
                        })}
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
                                        { formatting.map((fObj,indx) => <TableCell key={indx} component='div' > { obj[fObj.property] } </TableCell>) }
                                    </Link>
                                    :
                                    <StyledTableRow key={indx} component='div' >
                                        { formatting.map((fObj,indx) => <TableCell key={indx} component='div' > { obj[fObj.property] } </TableCell>) }
                                    </StyledTableRow>
                                )}
                            
                            )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(FormatedTable);
