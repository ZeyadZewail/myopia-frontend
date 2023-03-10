import { Alert, Box, Divider, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";

interface AnalysisInterface {
	id: number;
	aeugenlange: any;
	augenlangenzunahme: any;
	augenlangenzunahme_diff: any;
}

const Analysis: FC<AnalysisInterface> = ({ id, aeugenlange, augenlangenzunahme, augenlangenzunahme_diff }) => {
	const [data, setData] = useState<any>();
	const [warningMessage, setWarningMessage] = useState("");

	useEffect(() => {
		getData();
	}, [id]);

	const getData = async () => {
		const requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(`/api/rate/${id}`, requestOptions);
		const responseData = await response.json();

		if (response.ok) {
			setData(responseData);
		} else {
			console.log("N/A", responseData);
			setWarningMessage(`N/A: ${responseData.detail}`);
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant="h4" sx={{ width: "fit-Content" }}>
				Analyse <Divider sx={{ mt: 2 }} />
			</Typography>
			<Typography sx={{ color: "#979797" }} fontWeight={"500"} variant="h6">
				bla bla bla bla insert description here
			</Typography>
			{warningMessage != "" ? <Alert severity="warning">{warningMessage}</Alert> : null}
			<Box sx={{ display: "flex", gap: 4 }}>
				<Box sx={{ display: "flex", flexDirection: "column", width: "50%", gap: 2 }}>
					<Typography variant="h4" color={"#1976d2"}>
						Messwert
					</Typography>
					<Typography variant="h5">AugenLange</Typography>
					<Typography variant="h5">AugenLangenzunahme zur letzten Messung</Typography>
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography variant="h4" color={"#1976d2"}>
						Rechtes Auge
					</Typography>
					{aeugenlange && augenlangenzunahme && augenlangenzunahme_diff && !warningMessage ? (
						<Fragment>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
									color: data ? colors[data["ra_percentile"] as "good" | "okay" | "bad"] : "",
								}}>
								{aeugenlange["Rechtes Auge"]}
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
									color: data ? colors[data["ra_al_growth"] as "good" | "okay" | "bad"] : "",
								}}>
								{augenlangenzunahme["Rechtes Auge"]}
							</Typography>
						</Fragment>
					) : (
						<Fragment>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
								}}>
								N/A
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
								}}>
								N/A
							</Typography>
						</Fragment>
					)}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography variant="h4" color={"#1976d2"}>
						Linkes Auge
					</Typography>
					{aeugenlange && augenlangenzunahme && augenlangenzunahme_diff && !warningMessage ? (
						<Fragment>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
									color: data ? colors[data["la_percentile"] as "good" | "okay" | "bad"] : "",
								}}>
								{aeugenlange["Linkes Auge"]}
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
									color: data ? colors[data["la_al_growth"] as "good" | "okay" | "bad"] : "",
								}}>
								{augenlangenzunahme["Linkes Auge"]}
							</Typography>
						</Fragment>
					) : (
						<Fragment>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
								}}>
								N/A
							</Typography>
							<Typography
								variant="h5"
								sx={{
									textAlign: "center",
								}}>
								N/A
							</Typography>
						</Fragment>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Analysis;

const colors = {
	good: "green",
	okay: "#FDE541",
	bad: "red",
};
