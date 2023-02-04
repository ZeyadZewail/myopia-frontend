import { Box, Autocomplete, TextField, Button, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { createSearchParams, useNavigate } from "react-router-dom";
import Patient from "../../types/Patient";

interface SearchBarInterface {
	spacedBetween: boolean;
}

const SearchBar: FC<SearchBarInterface> = ({ spacedBetween }) => {
	const [options, setOptions] = useState<string[]>([]);
	const [searchKey, setSearchKey] = useState("");

	useEffect(() => {
		getOptions();
	}, []);

	const getOptions = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch("/api/patients/", requestOptions);
		const responseData = (await response.json()) as Patient[];
		const options = responseData.map((p) => p.last_name);
		setOptions(options);
	};

	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				width: spacedBetween ? "100%" : "40%",
				alignItems: "center",
				gap: 2,
				justifyContent: spacedBetween ? "space-between" : "none",
			}}>
			<Autocomplete
				sx={{ width: spacedBetween ? "30%" : "100%" }}
				freeSolo
				options={[...new Set(options)]}
				onChange={(e, v) => {
					setSearchKey(v as string);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search using Last name"
						onChange={(e) => {
							setSearchKey(e.target.value);
						}}
						InputProps={{
							...params.InputProps,
							type: "search",
							endAdornment: (
								<InputAdornment position="end">
									<Button
										variant="text"
										sx={{ cursor: "pointer" }}
										onClick={() => {
											if (searchKey != "") {
												navigate({
													pathname: "/search",
													search: createSearchParams({
														last_name: searchKey,
													}).toString(),
												});
											}
										}}>
										<SearchIcon sx={{ scale: "1" }} />
									</Button>
								</InputAdornment>
							),
						}}
					/>
				)}
			/>
			<Button
				sx={{
					display: "flex",
					justifyContent: "none",
					height: "36px",
					gap: 1,
					paddingX: spacedBetween ? "10px" : "28px",
					textAlign: "center",
					width: spacedBetween ? "156px" : "199.21px",
				}}
				variant="contained"
				onClick={() => {
					navigate("/newpatient");
				}}>
				<PersonAddAlt1Icon sx={{ width: "fit-content" }} />
				<Box sx={{ width: "fit-content" }}>
					<Typography
						sx={{ whiteSpace: "nowrap", textAlign: "center", textTransform: "none", width: "fit-content" }}
						variant="body2">
						Neuer Patient
					</Typography>
				</Box>
			</Button>
		</Box>
	);
};

export default SearchBar;
