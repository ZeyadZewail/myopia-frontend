import Typography from "@mui/material/Typography";
import { FC } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DetailsGraphInterface {
	data: object[];
	width: number;
	height: number;
	xLabel: string;
	yLabel: string;
	domain: any[];
}

const DetailsGraph: FC<DetailsGraphInterface> = ({ data, width, height, domain, xLabel, yLabel }) => {
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

				<Line type="monotone" dataKey={98} stroke="red" />
				<Line type="monotone" dataKey={95} stroke="red" />
				<Line type="monotone" dataKey={90} stroke="red" />
				<Line type="monotone" dataKey={75} stroke="#FDE541" />
				<Line type="monotone" dataKey={50} stroke="#FDE541" />
				<Line type="monotone" dataKey={25} stroke="green" />
				<Line type="monotone" dataKey={10} stroke="green" />
				<Line type="monotone" dataKey={5} stroke="green" />
				<Line type="monotone" dataKey={2} stroke="green" />
			</LineChart>
		</div>
	);
};

export default DetailsGraph;
