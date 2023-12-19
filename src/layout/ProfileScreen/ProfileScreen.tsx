import React from 'react';
import UserInformationCard from '../../components/UserInformationCard';

const ProfileScreen: React.FC = () => {
    return (
        <>
           <UserInformationCard id={''} name={''} isCreator={false} job={''} address={''} introduction={''} profileView={0} artworksView={0} followerNum={0} followingNum={0} />
            
        </>
    );
};

export default ProfileScreen;
