import { Alert, Box, Button, Dialog, Divider, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Patient from "../../../types/Patient";

interface doctorRatingInterface {
	patient: Patient;
	doctorRatingData: any[];
}

const DoctorRating: FC<doctorRatingInterface> = ({ patient, doctorRatingData }) => {
	const [error, setError] = useState("");
	const [dialogMessage, setDialogMessage] = useState("");
	const [warningMessage, setWarningMessage] = useState("");
	const navigate = useNavigate();

	console.log({
		ra_percentile: doctorRatingData[0].ra_percentile,
		la_percentile: doctorRatingData[0].la_percentile,
		ra_al_growth: doctorRatingData[0].ra_al_growth,
		la_al_growth: doctorRatingData[0].la_al_growth,
	});

	const {
		handleSubmit,
		reset,
		register,
		watch,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			ra_percentile: doctorRatingData[0].ra_percentile,
			la_percentile: doctorRatingData[0].la_percentile,
			ra_al_growth: doctorRatingData[0].ra_al_growth,
			la_al_growth: doctorRatingData[0].la_al_growth,
		},
	});

	useEffect(() => {
		reset({
			ra_percentile: doctorRatingData[0].ra_percentile,
			la_percentile: doctorRatingData[0].la_percentile,
			ra_al_growth: doctorRatingData[0].ra_al_growth,
			la_al_growth: doctorRatingData[0].la_al_growth,
		});
	}, [patient]);

	const onSubmit = async (data: any) => {};

	return (
		<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
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

			<Typography variant="h2" sx={{ width: "fit-Content" }}>
				Ärztliche bewertung <Divider sx={{ mt: 2 }} />
			</Typography>
			{error ? <Alert severity="error">{error}</Alert> : null}
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
		</Box>
	);
};

export default DoctorRating;
