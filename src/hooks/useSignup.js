import pb from '../api/pocketbase';
import useLogin from './useLogin';

const useLogin = () => {

    const login = useLogin();
    const data = {
        email,
        usename,
        password,
        passwordConfirm: password
    };
    
    let signup = async () => {
        console.log("loggin in");
        try {
            const createdUser = await pb
                .collection('users')
                .create(data);
            await login(data);
        } catch (e) {
            console.log(e);
        }
    }

    return signup;
}

export default useLogin;