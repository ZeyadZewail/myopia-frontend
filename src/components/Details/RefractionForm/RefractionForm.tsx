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

interface RefractionFormInterface {
	patient: Patient;
}

const RefractionForm: FC<RefractionFormInterface> = ({ patient }) => {
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
			refactory_left: "",
			refactory_right: "",
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
		const requestOptions = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(`/api/refactory/${patient.id}`, requestOptions);
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
				Refraktion
			</Typography>

			<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
				<TextField
					label="Refactory right"
					helperText={errors?.refactory_right?.message as string}
					InputLabelProps={{ shrink: true }}
					error={Boolean(errors?.refactory_right)}
					value={watch("refactory_right")}
					{...register("refactory_right", {
						required: { value: true, message: "Please enter Refactory right" },
					})}
				/>

				<TextField
					label="refactory_left"
					helperText={errors?.refactory_left?.message as string}
					error={Boolean(errors?.refactory_left)}
					InputLabelProps={{ shrink: true }}
					value={watch("refactory_left")}
					{...register("refactory_left", {
						required: { value: true, message: "Please enter Refactory left" },
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

export default RefractionForm;
