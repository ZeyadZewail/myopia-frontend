import {
	Box,
	Dialog,
	Alert,
	Button,
	Typography,
	TextField,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	InputLabel,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO, format } from "date-fns";
import { useState, useEffect, FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";
import Patient from "../../../types/Patient";

interface GeneralRisksInterface {
	patient: Patient;
}

const GeneralRisks: FC<GeneralRisksInterface> = ({ patient }) => {
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
			myopia_beginning_age: 0,
			nr_myopic_parents: 0,
			first_parent_dioptres: 0,
			second_parent_dioptres: 0,
			asian_heritage: true,
			predisposing_syndromes: true,
			hours_outside_per_day: 0,
		},
	});

	useEffect(() => {
		resetForm();
	}, [patient]);

	const resetForm = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/generalrisks/all/${patient.id}`, requestOptions);
		const responseData = await response.json();
		reset(responseData[0]);
	};

	const onSubmit = async (data: any) => {
		console.log(data);

		const requestOptions = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(`/api/generalrisks/${patient.id}`, requestOptions);
		const responseData = await response.json();
		if (response.status == 404) {
			setError(responseData.detail);
		}

		if (response.ok) {
			setError("");
			setDialogMessage("Updated Successfully!");
		} else {
			console.log("error", responseData);
			setWarningMessage("Something Went Wrong");
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "30%", gap: 2 }}>
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
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
					Allgemeine risiken
				</Typography>
			</Box>
			<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
				{error ? <Alert severity="error">{error}</Alert> : null}
				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Anfangsalter Der Myopie:</InputLabel>
					<TextField
						type="number"
						sx={{ width: "30%" }}
						helperText={errors?.myopia_beginning_age?.message as string}
						InputLabelProps={{ shrink: true }}
						error={Boolean(errors?.myopia_beginning_age)}
						value={watch("myopia_beginning_age")}
						{...register("myopia_beginning_age", {
							required: { value: true, message: "Please enter Anfangsalter Der Myopie" },
						})}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Myope Eltern:</InputLabel>
					<TextField
						type="number"
						sx={{ width: "30%" }}
						helperText={errors?.nr_myopic_parents?.message as string}
						error={Boolean(errors?.nr_myopic_parents)}
						InputLabelProps={{ shrink: true }}
						value={watch("nr_myopic_parents")}
						{...register("nr_myopic_parents", {
							required: { value: true, message: "Please enter Myope Eltern" },
						})}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center", ml: 4 }}>Elternteil 1 D:</InputLabel>
					<TextField
						sx={{ width: "30%" }}
						type="number"
						helperText={errors?.nr_myopic_parents?.message as string}
						error={Boolean(errors?.nr_myopic_parents)}
						InputLabelProps={{ shrink: true }}
						value={watch("first_parent_dioptres")}
						{...register("first_parent_dioptres", {
							required: { value: true, message: "Please enter Elternteil 1 D" },
						})}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center", ml: 4 }}>Elternteil 2 D:</InputLabel>
					<TextField
						sx={{ width: "30%" }}
						type="number"
						helperText={errors?.nr_myopic_parents?.message as string}
						error={Boolean(errors?.nr_myopic_parents)}
						InputLabelProps={{ shrink: true }}
						value={watch("second_parent_dioptres")}
						{...register("second_parent_dioptres", {
							required: { value: true, message: "Please enter Elternteil 2 D" },
						})}
					/>
				</Box>

				<Box>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Asiatsiche Herkunft:</InputLabel>
						<Controller
							name="asian_heritage"
							control={control}
							render={({ field: props }) => (
								<Checkbox
									{...props}
									sx={{ transform: "scale(2)" }}
									checked={props.value}
									onChange={(e) => props.onChange(e.target.checked)}
								/>
							)}
						/>
					</Box>

					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", my: 2 }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Pradisponierendes Syndrom:</InputLabel>
						<Controller
							name="predisposing_syndromes"
							control={control}
							render={({ field: props }) => (
								<Checkbox
									{...props}
									sx={{ transform: "scale(2)" }}
									checked={props.value}
									onChange={(e) => props.onChange(e.target.checked)}
								/>
							)}
						/>
					</Box>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Zeit Im Feien (H):</InputLabel>
					<TextField
						sx={{ width: "30%" }}
						type="number"
						helperText={errors?.nr_myopic_parents?.message as string}
						error={Boolean(errors?.nr_myopic_parents)}
						InputLabelProps={{ shrink: true }}
						value={watch("hours_outside_per_day")}
						{...register("hours_outside_per_day", {
							required: { value: true, message: "Please enter Zeit Im Feien (H)" },
						})}
					/>
				</Box>

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

export default GeneralRisks;
