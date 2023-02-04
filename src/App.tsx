import { Fragment, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/Login/Login";
import { Amplify, Auth } from "aws-amplify";
import NewPatient from "./components/NewPatient/NewPatient";
import Search from "./components/Search/Search";
import NavBar from "./components/NavBar/NavBar";

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "Poppins",
		},
	},
});

Amplify.configure({
	Auth: {
		userPoolId: "eu-central-1_lgLoHxIhH", //UserPool ID
		region: "eu-central-1",
		userPoolWebClientId: "3joum16nntsrbpjk3odu19rglb", //WebClientId
	},
});

function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function getToken() {
			try {
				await Auth.currentAuthenticatedUser();
				setLoading(false);
				setLoggedIn(true);
			} catch {
				setLoading(false);
				setLoggedIn(false);
			}
		}
		getToken();
	}, []);

	const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
		if (isLoading) {
			return null;
		}
		console.log("auth", loggedIn);
		return loggedIn ? children : <Navigate to={"/login"} replace={true} />;
	};

	const LoginWrapper = ({ children }: { children: JSX.Element }) => {
		if (isLoading) {
			return null;
		}
		console.log("auth", loggedIn);
		return loggedIn ? <Navigate to={"/"} replace={true} /> : children;
	};

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Box sx={{ display: "flex", width: "100%", height: "100%", minHeight: "100vh" }}>
					<Routes>
						<Route
							path="/"
							element={
								<PrivateWrapper>
									<Fragment>
										<NavBar setLogin={setLoggedIn} />
										<Home />
									</Fragment>
								</PrivateWrapper>
							}
						/>
						<Route
							path="/Login"
							element={
								<LoginWrapper>
									<Login setLogin={setLoggedIn} />
								</LoginWrapper>
							}
						/>
						<Route
							path="/newpatient"
							element={
								<PrivateWrapper>
									<Fragment>
										<NavBar setLogin={setLoggedIn} />
										<NewPatient />
									</Fragment>
								</PrivateWrapper>
							}
						/>
						<Route
							path="/search"
							element={
								<PrivateWrapper>
									<Fragment>
										<NavBar setLogin={setLoggedIn} />
										<Search />
									</Fragment>
								</PrivateWrapper>
							}
						/>
					</Routes>
				</Box>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
