function Spa() {
    const [auth, setauth] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const [userData, setUserData] = React.useState([
        {
            name: 'abel',
            email: 'abel@mit.edu',
            password: 'secret',
            balance: 100,
        },
    ]);

    // checking that the user is store in localstroage or not ;

    React.useEffect(() => {
        const user = localStorage.getItem('user');
        const localStorageUserData = user ? JSON.parse(user) : null;
        setauth(localStorageUserData);
    }, []);

    // login the user and store the user in localStorage
    const login = React.useCallback((login) => {
        localStorage.setItem('user', JSON.stringify(login));
        setauth(login);
    }, []);

    // logout the user and remove the user from localStroage
    const logout = React.useCallback(() => {
        localStorage.removeItem('user');
        setauth(null);
    }, []);

    // create user and login the user
    const createUser = React.useCallback((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setauth(user);
    }, []);

    // depost balance
    const deposit = React.useCallback((user) => {
        const updateValue = {
            ...auth,
            balance: user.balance,
        };
        setauth(updateValue);
        localStorage.setItem('user', JSON.stringify(updateValue));
    });

    // withdraw balance from Login user Account
    const withdraw = React.useCallback((user) => {
        const updateValue = {
            ...auth,
            balance: user.balance,
        };
        setauth(updateValue);
        localStorage.setItem('user', JSON.stringify(updateValue));
    });

    return (
        <HashRouter>
            <UserContext.Provider
                value={{
                    users: userData,
                    auth: auth,
                    login: login,
                    logout: logout,
                    deposit: deposit,
                    withdraw: withdraw,
                    createUser: createUser,
                }}
            >
                <NavBar />
                <div
                    className='container '
                    style={{ padding: '20px', backgroundColor: 'white' }}
                >
                    {/* <div style={{ textAlign: 'center' }}>
                        {' '}
                        {loader ? (
                            <Spinner animation='border' />
                        ) : message ? (
                            <Alert variant='danger'>{message}</Alert>
                        ) : null}
                    </div> */}
                    <Route path='/' exact component={Home} />
                    <Route path='/CreateAccount/' component={CreateAccount} />
                    <Route path='/login/' component={Login} />
                    <Route path='/deposit/' component={Deposit} />
                    <Route path='/withdraw/' component={Withdraw} />
                    <Route path='/alldata/' component={AllData} />
                </div>
            </UserContext.Provider>
        </HashRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.render(<Spa />, document.getElementById("root"));
root.render(<Spa />);
