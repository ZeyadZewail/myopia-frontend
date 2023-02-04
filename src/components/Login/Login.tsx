import { Auth } from "aws-amplify";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface loginInterface {
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<loginInterface> = ({ setLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<Error>();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await Auth.signIn(username, password);
			console.log("Login successful");
			setLogin(true);
			navigate("/");
		} catch (error) {
			setError(error as Error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
			<button type="submit">Login</button>
			{error && <p style={{ color: "red" }}>{error.message}</p>}
		</form>
	);
};

export default Login;
