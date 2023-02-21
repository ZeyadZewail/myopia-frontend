import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Patient from "../../../../types/Patient";
import EyesightGraph from "../EyesightGraph/EyesightGraph";
import RefractionGraph from "../RefractionGraph/RefractionGraph";

interface DetailsControllerInterface {
	patient: Patient;
	firstDiagramData1: any[];
	firstDiagramData2: any[];
	secondDiagramData: any[];
	refractionDiagramData: any[];
	measurementData: any[];
	measurementGrowthData: any[];
}

const GraphsController: FC<DetailsControllerInterface> = ({
	patient,
	firstDiagramData1,
	firstDiagramData2,
	secondDiagramData,
	refractionDiagramData,
	measurementData,
	measurementGrowthData,
}) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Typography variant="h2" sx={{ width: "fit-Content" }}>
				Graphs <Divider sx={{ mt: 2 }} />
			</Typography>
			<Box display={"flex"}>
				<EyesightGraph
					data={firstDiagramData1}
					width={700}
					height={400}
					domain={[20]}
					xLabel={"Alter"}
					yLabel={"Augenlänge"}
					patientData={measurementData}
				/>
				<EyesightGraph
					data={secondDiagramData}
					width={700}
					height={400}
					domain={[-0.2]}
					xLabel={"Alter"}
					yLabel={"Achslängenwachstum [mm]"}
					patientData={measurementGrowthData}
				/>
			</Box>
			<Box display={"flex"}>
				<RefractionGraph
					data={refractionDiagramData}
					width={700}
					height={400}
					domain={[0, 3]}
					xLabel={"Alter"}
					yLabel={"Refraktion"}
				/>
			</Box>
		</Box>
	);
};

export default GraphsController;
