import pb from '../api/pocketbase';
import { useState } from 'react';

const useLogout = () => {

    let logout = () => {
        console.log('loggin out');
        pb.authStore.clear();
    }

    return logout;
}

export default useLogout;