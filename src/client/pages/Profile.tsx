import * as React from 'react';
import type { IProfile } from '../utils/interfaces';
import { api } from '../utils/api-services';

const Profile: React.FC<IProfileProps> = () => {
    
    const [profile, setProfile] = React.useState<IProfile>(null);

    React.useEffect(() => {
        api('/api/authors/profile')
        .then(profile => setProfile(profile));
    }, []);
    
    return (
        <div className="row justify-content-center">
            <h1>Welcome back,{profile?.profile.username}!</h1>
        </div>
    );
}

export interface IProfileProps {}

export default Profile;