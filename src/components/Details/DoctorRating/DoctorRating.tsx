import {
	Alert,
	Box,
	Button,
	Checkbox,
	Dialog,
	Divider,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useSetAtom } from "jotai/react";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Patient from "../../../types/Patient";
import {
	customDialogMessage,
	customDialogOpen,
	customDialogType,
	customDialogError,
} from "../../CustomDialog/CustomDialog";

interface doctorRatingInterface {
	patient: Patient;
	doctorRatingData: any[];
}

const DoctorRating: FC<doctorRatingInterface> = ({ patient, doctorRatingData }) => {
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
			ra_percentile: "not_rated",
			la_percentile: "not_rated",
			ra_al_growth: "not_rated",
			la_al_growth: "not_rated",
			therapy_optimize_environment: false,
			therapy_atropia_drops: false,
			therapy_atropia_drops_ml: 0,
			therapy_multifocal_lense: false,
			therapy_ortho_lense: false,
			therapy_defocus_lense: false,
		},
	});

	useEffect(() => {
		if (doctorRatingData.length > 0) {
			reset({
				ra_percentile: doctorRatingData[0].ra_percentile,
				la_percentile: doctorRatingData[0].la_percentile,
				ra_al_growth: doctorRatingData[0].ra_al_growth,
				la_al_growth: doctorRatingData[0].la_al_growth,
				therapy_optimize_environment: doctorRatingData[0].therapy_optimize_environment,
				therapy_atropia_drops: doctorRatingData[0].therapy_atropia_drops,
				therapy_atropia_drops_ml: doctorRatingData[0].therapy_atropia_drops_ml,
				therapy_multifocal_lense: doctorRatingData[0].therapy_multifocal_lense,
				therapy_ortho_lense: doctorRatingData[0].therapy_ortho_lense,
				therapy_defocus_lense: doctorRatingData[0].therapy_defocus_lense,
			});
		}
	}, [patient, doctorRatingData.length]);

	const onSubmit = async (data: any) => {
		const requestOptions = {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ doctor_ratings: [data] }),
		};

		const response = await fetch(`/api/doctor_rating/${patient.id}`, requestOptions);
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
		<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
			<Typography variant="h2" sx={{ width: "fit-Content" }}>
				Ärztliche bewertung <Divider sx={{ mt: 2 }} />
			</Typography>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "25%" }}>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Ra percentile:</InputLabel>
						<Controller
							control={control}
							name={"ra_percentile"}
							defaultValue="not_rated"
							render={({ field: { onChange, value } }) => (
								<Select onChange={onChange} value={value} defaultValue="not_rated" sx={{ width: "50%" }}>
									<MenuItem value={"not_rated"}>not_rated</MenuItem>
									<MenuItem value={"normal"}>normal</MenuItem>
									<MenuItem value={"neutral"}>neutral</MenuItem>
									<MenuItem value={"bad"}>bad</MenuItem>
								</Select>
							)}
						/>
					</Box>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>La percentile:</InputLabel>
						<Controller
							control={control}
							name={"la_percentile"}
							defaultValue="not_rated"
							render={({ field: { onChange, value } }) => (
								<Select onChange={onChange} value={value} defaultValue="not_rated" sx={{ width: "50%" }}>
									<MenuItem value={"not_rated"}>not_rated</MenuItem>
									<MenuItem value={"normal"}>normal</MenuItem>
									<MenuItem value={"neutral"}>neutral</MenuItem>
									<MenuItem value={"bad"}>bad</MenuItem>
								</Select>
							)}
						/>
					</Box>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "25%" }}>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Ra al growth:</InputLabel>
						<Controller
							control={control}
							name={"ra_al_growth"}
							defaultValue="not_rated"
							render={({ field: { onChange, value } }) => (
								<Select onChange={onChange} value={value} defaultValue="not_rated" sx={{ width: "50%" }}>
									<MenuItem value={"not_rated"}>not_rated</MenuItem>
									<MenuItem value={"normal"}>normal</MenuItem>
									<MenuItem value={"neutral"}>neutral</MenuItem>
									<MenuItem value={"bad"}>bad</MenuItem>
								</Select>
							)}
						/>
					</Box>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
						<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>la al growth:</InputLabel>
						<Controller
							control={control}
							name={"la_al_growth"}
							defaultValue="not_rated"
							render={({ field: { onChange, value } }) => (
								<Select onChange={onChange} value={value} defaultValue="not_rated" sx={{ width: "50%" }}>
									<MenuItem value={"not_rated"}>not_rated</MenuItem>
									<MenuItem value={"normal"}>normal</MenuItem>
									<MenuItem value={"neutral"}>neutral</MenuItem>
									<MenuItem value={"bad"}>bad</MenuItem>
								</Select>
							)}
						/>
					</Box>
				</Box>
			</Box>
			<Typography sx={{ color: "black" }} fontWeight={"500"} variant="h6">
				Recommended Therapies
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", width: "30%", gap: 2 }}>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name="therapy_optimize_environment"
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
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Therapy optimize environment</InputLabel>
				</Box>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name="therapy_atropia_drops"
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
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Therapy atropia drops</InputLabel>
					<TextField
						sx={{ width: "30%" }}
						type="number"
						helperText={errors?.therapy_atropia_drops?.message as string}
						error={Boolean(errors?.therapy_atropia_drops)}
						InputLabelProps={{ shrink: true }}
						value={watch("therapy_atropia_drops_ml")}
						{...register("therapy_atropia_drops_ml", {
							required: { value: true, message: "Please enter therapy atropia drops ml" },
						})}
					/>
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>ml</InputLabel>
				</Box>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name="therapy_multifocal_lense"
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
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Therapy multifocal lense</InputLabel>
				</Box>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name="therapy_ortho_lense"
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
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Therapy ortho lense</InputLabel>
				</Box>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Controller
						name="therapy_defocus_lense"
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
					<InputLabel sx={{ height: "fit-content", alignSelf: "center" }}>Therapy defocus lense</InputLabel>
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

export default DoctorRating;
