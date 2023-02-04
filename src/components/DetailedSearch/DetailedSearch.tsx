import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

const DetailedSearch = () => {
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

		navigate({
			pathname: "/search",
			search: createSearchParams({
				first_name: data.first_name,
				last_name: data.last_name,
				birth_date: data.birth_date,
			}).toString(),
		});
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "fit-content" }}>
			<Box sx={{ display: "flex", gap: 4 }}>
				<TextField
					sx={{ width: "266px" }}
					label="Vorname"
					helperText={errors?.first_name?.message as string}
					error={Boolean(errors?.first_name)}
					{...register("first_name", {
						required: { value: true, message: "Please enter Vorname" },
					})}
				/>
				<TextField
					sx={{ width: "266px" }}
					label="Nachname"
					helperText={errors?.last_name?.message as string}
					error={Boolean(errors?.last_name)}
					{...register("last_name", {
						required: { value: true, message: "Please enter Nachname" },
					})}
				/>
			</Box>

			<Box>
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
			</Box>
			<Button
				variant="contained"
				sx={{ width: "fit-content", fontSize: 16, alignSelf: "center" }}
				onClick={handleSubmit(onSubmit)}>
				Search
			</Button>
		</Box>
	);
};

export default DetailedSearch;
