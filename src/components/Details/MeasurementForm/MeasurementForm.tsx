import { Alert, Box, Button, Dialog, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO, format } from "date-fns";
import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Patient from "../../../types/Patient";

interface MeasurementFormInterface {
	patient: Patient;
}

const MeasurementForm: FC<MeasurementFormInterface> = ({ patient }) => {
	const [error, setError] = useState("");
	const [dialogMessage, setDialogMessage] = useState("");
	const [warningMessage, setWarningMessage] = useState("");
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
			la_achslaenge: "",
			ra_achslaenge: "",
			timestamp_created: new Date(),
		},
	});

	useEffect(() => {
		reset();
	}, [patient]);

	const onSubmit = async (data: any) => {
		data.timestamp_created = data.timestamp_created.toISOString();

		data.date_measurement = format(
			(parseISO(data.timestamp_created) as unknown as string) == "Invalid Date"
				? data.timestamp_created
				: parseISO(data.timestamp_created),
			"yyyy-MM-dd"
		);
		console.log(data);
		const requestOptions = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(`/api/measurements/${patient.id}`, requestOptions);
		const responseData = await response.json();
		if (response.status == 404) {
			setError(responseData.detail);
		}

		if (response.ok) {
			setError("");
			setDialogMessage("Updated Successfully!");
		} else {
			console.log("error", responseData);
			setWarningMessage(`Error: ${responseData.detail}`);
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
						dialogMessage != "Deleted Successfully" ? navigate(0) : navigate("/");
					}}>
					Ok
				</Button>
			</Dialog>
			<Dialog
				open={warningMessage != ""}
				PaperProps={{
					style: {
						gap: 20,
						padding: 20,
						width: "fit-Content",
					},
				}}>
				<Alert sx={{ fontSize: 18, background: "inherit", alignItems: "center" }} severity="warning">
					{warningMessage}
				</Alert>
				<Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
					<Button
						sx={{ width: "fit-content", alignSelf: "center" }}
						variant="contained"
						onClick={() => {
							setWarningMessage("");
						}}>
						Ok
					</Button>
				</Box>
			</Dialog>

			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				Aktuelle Messwerte
			</Typography>

			<Box component="form" sx={{ width: "60%", display: "flex", flexDirection: "column", gap: "inherit" }}>
				{error ? <Alert severity="error">{error}</Alert> : null}
				<Box sx={{ display: "flex", gap: 2 }}>
					<TextField
						label="Ra achslaenge"
						sx={{ width: "45%" }}
						helperText={errors?.ra_achslaenge?.message as string}
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors?.ra_achslaenge)}
						value={watch("ra_achslaenge")}
						{...register("ra_achslaenge", {
							required: { value: true, message: "Please enter Ra achslaenge" },
						})}
					/>

					<TextField
						label="la_achslaenge"
						sx={{ width: "45%" }}
						helperText={errors?.la_achslaenge?.message as string}
						error={Boolean(errors?.la_achslaenge)}
						InputLabelProps={{ shrink: true }}
						value={watch("la_achslaenge")}
						{...register("la_achslaenge", {
							required: { value: true, message: "Please enter La achslaenge" },
						})}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name={"timestamp_created"}
						control={control}
						render={({ field: { onChange, value } }) => (
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									label="Geburtsdatum"
									inputFormat="yyyy-MM-dd"
									value={watch("timestamp_created")}
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
		</Box>
	);
};

export default MeasurementForm;
