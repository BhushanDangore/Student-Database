import React from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography } from '@material-ui/core';

export default function ClassPage() {
    let { class_name } = useParams();

    return (
        <PageContainer noFab={true} pageTitle={`Class ${class_name}`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            <FormatedTable tableData={[]} headerData={["Name", "Roll No.", "Mobile No."]} />
        </PageContainer>
    )
}
