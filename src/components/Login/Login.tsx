import { Box, TextField, Button, Paper, Alert } from "@mui/material";
import { Auth } from "aws-amplify";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../NavBar/logo.png";

interface loginInterface {
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<loginInterface> = ({ setLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<Error>();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (email == "" || password === "") {
			setError(Error("Incorrect username or password."));
			return;
		}

		try {
			await Auth.signIn(email, password);
			console.log("Login successful");
			setLogin(true);
			navigate("/");
		} catch (error) {
			setError(error as Error);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				backgroundColor: "#D5E0FF",
			}}>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "25%",
					padding: 4,
					alignItems: "center",
				}}
				component="form"
				onSubmit={handleSubmit}>
				{/* logo */}
				<Box sx={{ m: 2, marginBottom: 4 }}>
					<img style={{ width: "239px", height: "62px" }} src={logo}></img>
				</Box>
				{error ? <Alert severity="error">{error.message}</Alert> : null}
				<TextField
					margin="normal"
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email Address"
				/>
				<TextField
					margin="normal"
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: "fit-content", alignSelf: "center" }}>
					Sign In
				</Button>
			</Paper>
		</Box>
	);
};

export default Login;
