const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext({
  users: [],
  auth: null,
  login: () => {},
  logout: () => {},
  createUser: () => {},
  deposit: () => {},
  withdraw: () => {},
});

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={`${classes()}`}>
      <div className="card-header bg-primary">{props.header}</div>
      <div className="card-body text-dark">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}

// props are
// bgcolor
// txtcolor
// header
// title
// text
//
