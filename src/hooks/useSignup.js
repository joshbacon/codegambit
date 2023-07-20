import pb from '../api/pocketbase';
import useLogin from './useLogin';

const useSignup = () => {

    const login = useLogin();
    
    let signup = async ({email, username, password}) => {
        const data = {
            email,
            username,
            password,
            passwordConfirm: password
        }
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

export default useSignup;