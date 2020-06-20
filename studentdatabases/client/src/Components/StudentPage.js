import React from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'

export default function ClassPage() {
    let { student_name } = useParams();

    return (
        <PageContainer noFab={true} pageTitle={`${student_name}`} >
            
        </PageContainer>
    )
}
