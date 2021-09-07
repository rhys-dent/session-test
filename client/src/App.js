import axios from "axios";

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
			.post("/login", {
				username: "Rhys",
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
	return (
		<div>
			<button onClick={login}>Login</button>
			<button onClick={isLoggedIn}>Check Login</button>
		</div>
	);
}

export default App;
