import React from 'react'
import PageContainer from './Miniatures/PageContainer'

export default function Result() {

    const toggleFab = () => {

    }
    return (
        <PageContainer onFabClick= {toggleFab} pageTitle="Results" ></PageContainer>
    )
}
