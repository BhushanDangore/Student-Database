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
    })

    useEffect(() => {
        if(appState.classes.array === null) return getClasses(dispatch);
        if(config.addClassDialogOpen) return setConfig({...config, addClassDialogOpen: false});
        // eslint-disable-next-line
    }, [appState.classes.array])

    const toggleFAB = () => {
        setConfig({ addClassDialogOpen: !config.addClassDialogOpen })
    }

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={path}>
                    <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Classes Section" >
                    {
                        appState.classes.array ? <FormatedTable tableData={appState.classes.array} formatting={[{ name: 'Class Name', property: 'className' }, { name: 'Class Number', property: 'classNumber' }] } linkPathIdentifire="className" prefixPath="classes" />
                        : appState.classes.loading ? <LinearProgress /> : null
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