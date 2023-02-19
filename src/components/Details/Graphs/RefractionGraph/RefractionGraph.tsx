import Typography from "@mui/material/Typography";
import { FC, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface RefreactionGraphInterface {
	data: object[];
	width: number;
	height: number;
	xLabel: string;
	yLabel: string;
	domain: any[];
}

const RefractionGraph: FC<RefreactionGraphInterface> = ({ data, width, height, domain, xLabel, yLabel }) => {
	function compare(a: any, b: any) {
		if (Number(a.name) < Number(b.name)) {
			return -1;
		}
		if (Number(a.name) > Number(b.name)) {
			return 1;
		}
		return 0;
	}

	useEffect(() => {
		data.sort(compare);
		console.log("data", data);
	}, [data]);

	return (
		<div>
			<Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
				{yLabel}
			</Typography>
			<LineChart
				width={width}
				height={height}
				data={data}
				margin={{
					top: 0,
					right: 0,
					left: 10,
					bottom: 10,
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis label={{ value: xLabel, offset: -10, position: "insideBottom" }} dataKey="name" />
				<YAxis domain={domain} />
				<Tooltip />
				<Legend
					layout="vertical"
					verticalAlign="top"
					align="right"
					wrapperStyle={{
						paddingLeft: "20px",
					}}
				/>

				<Line type="monotone" dataKey={"Right refraction"} stroke="red" />
				<Line type="monotone" dataKey={"Left refraction"} stroke="green" />
			</LineChart>
		</div>
	);
};

export default RefractionGraph;