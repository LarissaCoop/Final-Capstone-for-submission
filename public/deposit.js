const { Alert, Spinner } = ReactBootstrap;

function Deposit() {
    const [status, setStatus] = React.useState('');
    const [deposit, setDeposit] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const ctx = React.useContext(UserContext);

    function validate(field, label) {
        if (!field) {
            setMessage('Error: ' + label);
            setTimeout(() => setMessage(''), 3000);
            return false;
        }

        // show alert when field is not a number
        if (isNaN(field)) {
            setMessage('Error: ' + 'The amount should be a number!');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        //
        if (field < 0) {
            setMessage('Error: ' + 'The amount should be greater than 0');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        return true;
    }

    async function handleCreate() {
        if (!validate(deposit, 'Deposit must me greater than 0')) return;
        // ctx.users.push({name,email,password,balance:100});set

        // we have to call the api here

        setLoader(true);
        const res = await fetch('/user/amount/' + ctx.auth._id, {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: deposit,
            }),
        });

        const data = await res.json();
        if (data.status == 'Error') {
            setMessage(data.message);
            setLoader(false);
            return;
        }
        ctx.deposit(data.data);
        setStatus(data.message);
        setLoader(false);
        setTimeout(() => setStatus(''), 5000);

        // ctx.deposit(ctx?.auth?.email, deposit);
    }

    return (
        <div className=' animate__animated animate__slideInLeft animate__fast'>
            <Card
                header='Deposit'
                title={ctx?.auth?.name && 'Welcome' + ' ' + ctx?.auth?.name}
                body={
                    ctx.auth ? (
                        <>
                            {' '}
                            <h4>Current Balance: ${ctx.auth.balance}</h4>
                            <br />
                            Deposit Amount:
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                {' '}
                                {loader ? (
                                    <Spinner animation='border' />
                                ) : status ? (
                                    <Alert variant='success'>{status}</Alert>
                                ) : message ? (
                                    <Alert variant='danger'>{message}</Alert>
                                ) : null}
                            </div>
                            <input
                                type='input'
                                className='form-control'
                                id='deposit'
                                placeholder='$0.00'
                                value={deposit}
                                onChange={(e) =>
                                    setDeposit(e.currentTarget.value)
                                }
                            />
                            <br />
                            <button
                                id='button'
                                type='submit'
                                onClick={handleCreate}
                                className='btn btn-primary btn-block'
                                disabled={!deposit}
                            >
                                Deposit
                            </button>
                            <br />
                            <br />
                            <div className='text-left'></div>
                        </>
                    ) : (
                        <>
                            <h4>You must login to Depost</h4>
                        </>
                    )
                }
            />
        </div>
    );
}
