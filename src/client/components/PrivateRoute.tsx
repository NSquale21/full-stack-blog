import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...rest }) => {
    
    const [auth, setAuth] = React.useState(false);
    const [checking, setChecking] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            let token = localStorage.getItem('token');
            const check = await fetch('/auth/tokens/check', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (check.ok) {
                setAuth(true);
                setChecking(false);
            } else {
                setChecking(false);
            }
        })();
    }, []);
    
    if (checking) {
        return <h1>Checking!</h1>
    }

    if (auth) {
        return <Route {...rest}>{children}</Route>
    } else {
        return <Redirect to="/login"/>
    }
}

export interface IPrivateRoute {
    exact: boolean,
    path: string
}

export default PrivateRoute;