export const PocketProvider = ({ children }) => {
    const pb = useMemo(() => new PocketBase(BASE_URL), []);
  
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);
  
    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        });
    }, []);

    const register = useCallback(async (email, password) => {
        return await pb
            .collection("users")
            .create({ email, password, passwordConfirm: password });
    }, []);

    const login = useCallback(async (email, password) => {
        return await pb.collection("users").authWithPassword(email, password);
    }, []);

    const logout = useCallback(() => {
        pb.authStore.clear();
    }, []);
  
    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;
        if (tokenExpiration < expirationWithBuffer) {
            await pb.collection("users").authRefresh();
        }
    }, [token]);

    useInterval(refreshSession, token ? twoMinutesInMs : null);

    return (
        <PocketContext.Provider
            value={{ register, login, logout, user, token, pb }}
        >
        {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);