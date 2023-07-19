import pb from '../api/pocketbase';

const useLogin = () => {

    let login = async ({username, password}) => {
        console.log("loggin in", username, password);
        try {
            const authData = await pb
                .collection('users')
                .authWithPassword(username, password);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    return login;
}

export default useLogin;