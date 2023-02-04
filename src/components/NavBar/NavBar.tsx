import { Box, Typography } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import logo from "./logo.png";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { FC } from "react";

const lightBlue = "#8CA9FF";

interface loginInterface {
	setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: FC<loginInterface> = ({ setLogin }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#395FCF",
				borderTopRightRadius: "40px",
				width: "fit-content",
				padding: 2,
				gap: 4,
			}}>
			{/* logo */}
			<Box sx={{ m: 2, marginBottom: 4 }}>
				<img style={{ width: "239px", height: "62px" }} src={logo}></img>
			</Box>
			{/* option */}
			<Box
				onClick={() => {
					navigate("/");
				}}
				display={"flex"}
				color={pathname === "/" ? "white" : lightBlue}
				gap={2}
				sx={{
					cursor: "pointer",
					alignItems: "center",
					mx: 2,
				}}>
				<Box
					sx={{
						borderRadius: "0px 3px 3px 0px",
						width: "5px",
						height: "90%",
						position: "relative",
						left: "-13%",
						...(pathname == "/" && {
							backgroundColor: "white",
							boxShadow: "-1px 0px 13px 6px rgba(255, 255, 255, 0.29)",
						}),
					}}
				/>
				<FindInPageIcon sx={{ scale: "1.5" }} />
				<Typography sx={{ fontFamily: "inherit", fontSize: "24px" }}>Übersicht</Typography>
			</Box>
			{/* option */}
			<Box
				onClick={() => {
					navigate("/newpatient");
				}}
				display={"flex"}
				color={pathname === "/newpatient" ? "white" : lightBlue}
				gap={2}
				sx={{
					cursor: "pointer",
					alignItems: "center",
					mx: 2,
				}}>
				<Box
					sx={{
						borderRadius: "0px 3px 3px 0px",
						width: "5px",
						height: "90%",
						position: "relative",
						left: "-13%",
						...(pathname === "/newpatient" && {
							backgroundColor: "white",
							boxShadow: "-1px 0px 13px 6px rgba(255, 255, 255, 0.29)",
						}),
					}}
				/>
				<PersonAddAlt1Icon sx={{ scale: "1.5" }} />
				<Typography sx={{ fontFamily: "inherit", fontSize: "24px" }}>Neuer Patient</Typography>
			</Box>
			{/* option */}
			<Box
				onClick={() => {
					navigate("/information");
				}}
				display={"flex"}
				color={pathname === "/information" ? "white" : lightBlue}
				gap={2}
				sx={{
					cursor: "pointer",
					alignItems: "center",
					mx: 2,
				}}>
				<Box
					sx={{
						borderRadius: "0px 3px 3px 0px",
						width: "5px",
						height: "90%",
						position: "relative",
						left: "-13%",
						...(pathname === "/information" && {
							backgroundColor: "white",
							boxShadow: "-1px 0px 13px 6px rgba(255, 255, 255, 0.29)",
						}),
					}}
				/>
				<InfoIcon sx={{ scale: "1.5" }} />
				<Typography sx={{ fontFamily: "inherit", fontSize: "24px" }}>Information</Typography>
			</Box>
			{/* option */}
			<Box
				onClick={() => {
					Auth.signOut();
					setLogin(false);
					navigate("/login");
				}}
				display={"flex"}
				color={lightBlue}
				gap={2}
				sx={{
					cursor: "pointer",
					alignItems: "center",
					mx: 2,
				}}>
				<Box
					sx={{
						borderRadius: "0px 3px 3px 0px",
						width: "5px",
						height: "90%",
						position: "relative",
						left: "-13%",
					}}
				/>
				<LogoutIcon sx={{ scale: "1.5" }} />
				<Typography sx={{ fontFamily: "inherit", fontSize: "24px" }}>Logout</Typography>
			</Box>
		</Box>
	);
};

export default NavBar;
