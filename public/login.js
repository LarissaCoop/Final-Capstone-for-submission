const { Alert, Spinner } = ReactBootstrap;

function Login() {
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const ctx = React.useContext(UserContext);


    // this function is used to valid the email and password
    function validate(field, label) {
        if (!field.trim()) {
            setMessage('Error: ' + label);
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        // check email is valid or not
        if (field && label == 'email' && !field.includes('@')) {
            setMessage('Error: ' + 'Email is incorrect!');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        if (field && label == 'password' && field.length < 8) {
            setMessage('Error: ' + 'password must be greater than 8');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        return true;
    }

    async function handleCreate() {
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        setLoader(true);
        const res = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Json.stringify conver the javascript object into Json formate
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();

        // data.status will be  Success or Error
        if (data.status == 'Error') {
            setMessage(data.message);
            setLoader(false);
            return;
        }
        ctx.login(data.data);
        setStatus('User is  successfully Login');
        setLoader(false);
        setTimeout(() => setStatus(''), 5000);
    }
 
    return (
        <Card
            header='Login'
            body={
                <>
                    <div style={{ textAlign: 'center' }}>
                        {' '}
                        {loader ? (
                            <Spinner animation='border' />
                        ) : message ? (
                            <Alert variant='danger'>{message}</Alert>
                        ) : status ? (
                            <Alert variant='success'>{status}</Alert>
                        ) : null}
                    </div>
                    {!ctx.auth ? (
                        <>
                            Email <br />
                            <input
                                type='input'
                                className='form-control'
                                id='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.currentTarget.value)
                                }
                            />
                            <br />
                            Password
                            <br />
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.currentTarget.value)
                                }
                            />
                            <br />
                            <button
                                type='submit'
                                // disabled={!email || !password}
                                className='btn btn-primary btn-block'
                                onClick={handleCreate}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Your login!</p>
                            <h5>Welcome {ctx.auth.name}</h5>
                        </>
                    )}
                </>
            }
        />
    );
}
