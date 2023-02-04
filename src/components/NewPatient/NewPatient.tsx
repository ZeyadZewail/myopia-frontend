import { Alert, Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

const NewPatient = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm();

	const onSubmit = async (data: any) => {
		data.birth_date = format(data.birth_date, "yyyy-MM-dd");
		console.log(data);

		const requestOptions = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch("/api/patients/", requestOptions);
		const responseData = await response.json();
		if (response.status == 409) {
			setError(responseData.detail);
		}

		if (response.ok) {
			setError("");
			navigate("/");
			console.log(responseData);
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 12, gap: 6 }}>
			<SearchBar spacedBetween={true} />
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 4 }}>
				<Typography variant="h4" fontWeight={"500"}>
					Übersicht
				</Typography>
				<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
					Stammdaten
				</Typography>
				<Box component="form" sx={{ width: "30%", display: "flex", flexDirection: "column", gap: "inherit" }}>
					{error ? <Alert severity="error">{error}</Alert> : null}
					<TextField
						label="Vorname"
						helperText={errors?.first_name?.message as string}
						error={Boolean(errors?.first_name)}
						{...register("first_name", {
							required: { value: true, message: "Please enter Vorname" },
						})}
					/>

					<TextField
						label="Nachname"
						helperText={errors?.last_name?.message as string}
						error={Boolean(errors?.last_name)}
						{...register("last_name", {
							required: { value: true, message: "Please enter Nachname" },
						})}
					/>
					<Controller
						control={control}
						name={"gender"}
						defaultValue="male"
						render={({ field: { onChange, value } }) => (
							<Select onChange={onChange} value={value} defaultValue="male">
								<MenuItem value={"male"}>Male</MenuItem>
								<MenuItem value={"female"}>Female</MenuItem>
							</Select>
						)}
					/>
					<Controller
						control={control}
						name={"ethnicity"}
						defaultValue="caucasian"
						render={({ field: { onChange, value } }) => (
							<Select onChange={onChange} value={value} defaultValue="caucasian">
								<MenuItem value={"caucasian"}>Caucasian</MenuItem>
								<MenuItem value={"asian"}>Asian</MenuItem>
								<MenuItem value={"other"}>Other</MenuItem>
							</Select>
						)}
					/>

					<Controller
						name={"birth_date"}
						control={control}
						defaultValue={new Date()}
						render={({ field: { onChange, value } }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									label="Geburtsdatum"
									inputFormat="yyyy-MM-dd"
									value={value}
									onChange={onChange}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						)}
					/>
					<Button
						variant="contained"
						sx={{ width: "fit-content", fontSize: 16, alignSelf: "center" }}
						onClick={handleSubmit(onSubmit)}>
						Submit
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default NewPatient;
