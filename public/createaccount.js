const { Alert, Spinner } = ReactBootstrap;
function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const ctx = React.useContext(UserContext);

    function validate(field, label) {
        if (!field) {
            setMessage('Error: ' + label);
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

    // s

    async function handleCreate() {
        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;

        setLoader(true);
        const res = await fetch('/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await res.json();
        if (data.status == 'Error') {
            setMessage(data.message);
            setLoader(false);
            return;
        }
        ctx.createUser(data.data);
        setMessage('Your account is successfully Created. You can login now.');
        setLoader(false);
        setTimeout(() => setMessage(''), 5000);
        setShow(false);
    }

    function clearForm() {
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <Card
            header='Create Account'
            body={
                show ? (
                    <>
                        <div style={{textAlign: "center"}}>
                            {' '}
                            {loader ? (
                                <Spinner animation='border' />
                            ) : message ? (
                                <Alert variant="danger">{message}</Alert>
                            ) : null}
                        </div>
                        Name
                        <br />
                        <input
                            type='input'
                            className='form-control'
                            id='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                        />
                        <br />
                        Email address
                        <br />
                        <input
                            type='input'
                            className='form-control'
                            id='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
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
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <br />
                        <button
                            type='submit'
                            className='btn btn-primary btn-block'
                            onClick={handleCreate}
                            disabled={!name || !email || !password}
                        >
                            Create Account
                        </button>
                    </>
                ) : (
                    <>
                        <h5>{message ?? message}</h5>
                        <button
                            type='submit'
                            className='btn btn-primary btn-block'
                            onClick={clearForm}
                        >
                            Add another account
                        </button>
                    </>
                )
            }
        />
    );
}
