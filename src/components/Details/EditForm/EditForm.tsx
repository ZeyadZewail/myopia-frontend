import { Alert, Box, Button, Dialog, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, parseISO } from "date-fns";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Patient from "../../../types/Patient";

interface EditFormInterface {
	patient: Patient;
}

const EditForm: FC<EditFormInterface> = ({ patient }) => {
	const [error, setError] = useState("");
	const [dialogMessage, setDialogMessage] = useState("");
	const navigate = useNavigate();

	const {
		handleSubmit,
		reset,
		register,
		watch,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			first_name: patient.first_name,
			last_name: patient.last_name,
			gender: patient.gender,
			ethnicity: patient.ethnicity,
			birth_date: patient.birth_date,
		},
	});

	useEffect(() => {
		reset(patient);
	}, [patient]);

	const onSubmit = async (data: any) => {
		console.log(parseISO(data.birth_date));
		data.birth_date = format(
			(parseISO(data.birth_date) as unknown as string) == "Invalid Date" ? data.birth_date : parseISO(data.birth_date),
			"yyyy-MM-dd"
		);
		console.log("patient", patient);
		console.log(data);

		const requestOptions = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(`/api/patients/${patient.id}`, requestOptions);
		const responseData = await response.json();
		if (response.status == 409) {
			setError(responseData.detail);
		}

		if (response.ok) {
			setError("");
			setDialogMessage("Updated Successfully!");
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 4 }}>
			<Dialog
				open={dialogMessage != ""}
				PaperProps={{
					style: {
						gap: 20,
						padding: 20,
					},
				}}>
				<Alert sx={{ fontSize: 24, background: "inherit", alignItems: "center" }} severity="success">
					{dialogMessage}
				</Alert>
				<Button
					sx={{ width: "fit-content", alignSelf: "center" }}
					variant="contained"
					onClick={() => {
						setDialogMessage("");
					}}>
					Ok
				</Button>
			</Dialog>
			<Box sx={{ display: "flex", gap: 2, width: "100%" }}>
				<Typography variant="h2">{patient.first_name + ", " + patient.last_name}</Typography>
			</Box>
			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				Übersicht
			</Typography>
			<Box component="form" sx={{ width: "30%", display: "flex", flexDirection: "column", gap: "inherit" }}>
				{error ? <Alert severity="error">{error}</Alert> : null}
				<TextField
					label="Vorname"
					helperText={errors?.first_name?.message as string}
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors?.first_name)}
					value={watch("first_name")}
					{...register("first_name", {
						required: { value: true, message: "Please enter Vorname" },
					})}
				/>

				<TextField
					label="Nachname"
					helperText={errors?.last_name?.message as string}
					error={Boolean(errors?.last_name)}
					InputLabelProps={{ shrink: true }}
					value={watch("last_name")}
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
					render={({ field: { onChange, value } }) => (
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label="Geburtsdatum"
								inputFormat="yyyy-MM-dd"
								value={watch("birth_date")}
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
					Update
				</Button>
			</Box>
		</Box>
	);
};

export default EditForm;
