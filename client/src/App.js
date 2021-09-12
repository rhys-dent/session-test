import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	axios.defaults.withCredentials = true;
	function isLoggedIn() {
		axios
			.get("/login")
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	function login() {
		axios
			.post("/login", { email: "rhys@email.ca", password: "123" })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	function register() {
		axios
			.post("/register", { email: "rhys@email.ca", password: "123" })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	return (
		<div>
			<button onClick={register}>Register</button>
			<button onClick={login}>Login</button>
			<button onClick={isLoggedIn}>Check Login</button>
			<Router>
				<Switch>
					<Route path="/route1">
						<div>Route 1</div>
					</Route>
					<Route path="/route2">
						<div>Route 2</div>
					</Route>
					<Route path="/route3">
						<div>Route 3</div>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
