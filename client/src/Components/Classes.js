import React, { useEffect } from 'react'
import { LinearProgress } from '@material-ui/core';
import { appStateContext } from '../Contexts';
import AddClassForm from './Miniatures/AddClassForm';
import { getClasses } from '../Actions';
import FormatedTable from './Miniatures/FormatedTable';
import PageContainer from './Miniatures/PageContainer';

export default function Classes() {

    const { appState, dispatch } = React.useContext(appStateContext);
    const [config, setConfig] = React.useState({
        addClassDialogOpen: false,
        loading: true,
    })

    useEffect(() => {
        if(appState.classes) return setConfig({...config, loading: false});
        getClasses(dispatch);
        setConfig({ addClassDialogOpen: false, ...config });

        // eslint-disable-next-line
    }, [appState.classes])

    const toggleFAB = () => {
        setConfig({ addClassDialogOpen: !config.addClassDialogOpen })
    }
        
    return (
        <React.Fragment>
            <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Classes Section" >
                {
                    appState.classes ? <FormatedTable tableData={appState.classes} headerData={["Class Name", "Class Number"]} linkPathIdentifire="className" prefixPath="classes"/>
                    : config.loading ? <LinearProgress /> : null
                }
            </PageContainer>
            <AddClassForm open={config.addClassDialogOpen} closeForm={toggleFAB} />
        </React.Fragment>
    )
}
