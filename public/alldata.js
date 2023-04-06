const { Table, Alert, Spinner } = ReactBootstrap;
function AllData() {
    const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState('');
    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
        // fetch all accounts from API
        (async function () {
            setLoader(true);
            const res = await fetch('/account/all');
            const data = await res.json();
            if (data.status == 'Error') {
                setError(data.message);
                setLoader(false);
                return;
            }
            setData(data.data);
            setError('');
            setLoader(false);
        })();
        setTimeout(() => setError(''), 3000);
    }, []);
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                {loader ? (
                    <Spinner animation='border' />
                ) : error ? (
                    <Alert variant='danger'>{error}</Alert>
                ) : (
                    <div className='row'>
                        {data.map((user) => (
                            <>
                                <div className='col-md-6'>
                                    <Card
                                        header={'Username: ' + user.name}
                                        title={
                                            'Total Amount: ' +
                                            '$' +
                                            user.balance
                                        }
                                        text={`Email: ${user.email}`}
                                        body={<p>Password: {user.password}</p>}
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
