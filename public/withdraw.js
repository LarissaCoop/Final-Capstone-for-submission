const { Alert, Spinner } = ReactBootstrap;
function Withdraw() {
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const ctx = React.useContext(UserContext);

    // validation the withdraw value
    function validate(field, label) {
        if (!field) {
            setMessage('Error: ' + label);
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        if (isNaN(field) || field < 0) {
            setMessage('Error: ' + 'Must be a number greater than 0');
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        if (field > ctx.auth.balance) {
            setMessage(
                'Error: ' + 'Balance must be less than your current balance'
            );
            setTimeout(() => setMessage(''), 3000);
            return false;
        }
        return true;
    }

    async function handleCreate() {
        if (!validate(withdraw, 'Withdraw must me greater than 0')) return;
        setLoader(true);
        const res = await fetch('/user/amount/' + ctx.auth._id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: -withdraw,
            }),
        });

        const data = await res.json();
        if (data.status == 'Error') {
            setMessage(data.message);
            setLoader(false);
            return;
        }
        ctx.withdraw    (data.data);
        setStatus('Amount is Successfully Withdraw From Your Account');
        setLoader(false);
        setTimeout(() => setStatus(''), 5000);
    }

    return (
        <div className=' animate__animated animate__slideInLeft animate__fast'>
            <Card
                header='Withdraw'
                title={ctx?.auth?.name && 'Welcome' + ' ' + ctx?.auth?.name}
                status={status}
                body={
                    ctx.auth ? (
                        <>
                            <h4>Current Balance: ${ctx.auth.balance}</h4>
                            <br />
                            Withdraw Amount:
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
                                id='withdraw'
                                placeholder='$0.00'
                                value={withdraw}
                                onChange={(e) =>
                                    setWithdraw(e.currentTarget.value)
                                }
                            />
                            <br />
                            <button
                                id='button'
                                className='btn btn-primary btn-block'
                                type='submit'
                                onClick={handleCreate}
                                disabled={!withdraw}
                            >
                                Withdraw
                            </button>
                            <br />
                            <br />
                            <div className='text-left'></div>
                        </>
                    ) : (
                        <>
                            <h4>You must login to withdraw</h4>
                        </>
                    )
                }
            />
        </div>
    );
}
