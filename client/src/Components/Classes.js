import React, { useEffect } from 'react'
import { LinearProgress } from '@material-ui/core';
import { appStateContext } from '../Contexts';
import AddClassForm from './Miniatures/AddClassForm';
import { getClasses } from '../Actions';
import FormatedTable from './Miniatures/FormatedTable';
import PageContainer from './Miniatures/PageContainer';
import { 
    Switch, 
    Route, 
    useRouteMatch,
} from 'react-router-dom';
import ClassPage from './ClassPage';

export default function Classes() {
    
    let { path } = useRouteMatch();

    const { appState, dispatch } = React.useContext(appStateContext);
    const [config, setConfig] = React.useState({
        addClassDialogOpen: false,
        loading: true,
    })

    useEffect(() => {
        if(appState.classes === null) return getClasses(dispatch);

        if(config.loading) return setConfig({...config, loading: false});

        if(config.addClassDialogOpen) return setConfig({...config, addClassDialogOpen: false});
        // eslint-disable-next-line
    }, [appState.classes])

    const toggleFAB = () => {
        setConfig({ addClassDialogOpen: !config.addClassDialogOpen })
    }
    
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={path}>
                    <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Classes Section" >
                    {
                        appState.classes ? <FormatedTable tableData={appState.classes} headerData={["Class Name", "Class Number"]} linkPathIdentifire="className" prefixPath="classes" loading={config.loading} />
                        : config.loading ? <LinearProgress /> : null
                    }
                    </PageContainer>
                    <AddClassForm open={config.addClassDialogOpen} closeForm={toggleFAB} />
                </Route>
                <Route path={`${path}/:class_name`}>
                    <ClassPage />
                </Route>
            </Switch>
        </React.Fragment>
    )
}