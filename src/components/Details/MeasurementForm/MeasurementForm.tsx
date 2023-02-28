import { Alert, Box, Button, Dialog, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO, format } from "date-fns";
import { useSetAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Patient from "../../../types/Patient";
import {
	customDialogMessage,
	customDialogOpen,
	customDialogType,
	customDialogError,
} from "../../CustomDialog/CustomDialog";

interface MeasurementFormInterface {
	patient: Patient;
}

const MeasurementForm: FC<MeasurementFormInterface> = ({ patient }) => {
	const setCustomMessage = useSetAtom(customDialogMessage);
	const setCustomDialogOpen = useSetAtom(customDialogOpen);
	const setCustomDialogType = useSetAtom(customDialogType);
	const setCustomDialogError = useSetAtom(customDialogError);

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
			setCustomDialogType("warning");
			setCustomDialogError("404");
			setCustomMessage("Something Went Wrong");
			setCustomDialogOpen(true);
			return;
		}

		if (response.ok) {
			setCustomDialogType("success");
			setCustomMessage("Updated Successfully!");
			setCustomDialogError("");
			setCustomDialogOpen(true);
		} else {
			setCustomDialogType("warning");
			setCustomDialogError(responseData.detail);
			setCustomMessage("Something Went Wrong");
			setCustomDialogOpen(true);
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "50%", gap: 4 }}>
			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				Aktuelle Messwerte
			</Typography>

			<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
				<TextField
					label="Ra achslaenge"
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
					helperText={errors?.la_achslaenge?.message as string}
					error={Boolean(errors?.la_achslaenge)}
					InputLabelProps={{ shrink: true }}
					value={watch("la_achslaenge")}
					{...register("la_achslaenge", {
						required: { value: true, message: "Please enter La achslaenge" },
					})}
				/>

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
	);
};

export default MeasurementForm;
