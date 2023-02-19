import { Box, Button, Typography } from "@mui/material";
import { FC, Fragment, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface error404Interface {
	error: Number;
	message: string;
}

const Error404: FC<PropsWithChildren<error404Interface>> = ({ children, error, message }) => {
	const navigate = useNavigate();

	return (
		<Fragment>
			{error == 404 ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						height: "100%",
						justifyContent: "center",
						width: "100%",
						gap: 4,
						flexDirection: "column",
					}}>
					<Typography variant="h1">404</Typography>
					<Typography variant="h2">{message}</Typography>
					<Button
						variant="contained"
						sx={{ fontSize: 18 }}
						onClick={() => {
							navigate(-1);
						}}>
						Go Back
					</Button>
				</Box>
			) : (
				children
			)}
		</Fragment>
	);
};

export default Error404;
