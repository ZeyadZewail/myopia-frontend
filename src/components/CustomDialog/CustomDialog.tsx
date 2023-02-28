import { Dialog, Alert, Button, Typography } from "@mui/material";
import { atom } from "jotai";
import { useAtomValue } from "jotai/react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CustomDialogInterface {
	onOk: Function;
}

const customDialogMessage = atom("");
const customDialogOpen = atom(false);
const customDialogType = atom<"success" | "warning">("success");
const customDialogError = atom("");
export { customDialogMessage, customDialogOpen, customDialogType, customDialogError };

const CustomDialog: FC<CustomDialogInterface> = ({ onOk }) => {
	const navigate = useNavigate();
	const message = useAtomValue(customDialogMessage);
	const open = useAtomValue(customDialogOpen);
	const severity = useAtomValue(customDialogType);
	const error = useAtomValue(customDialogError);

	return (
		<Dialog
			open={open}
			PaperProps={{
				style: {
					gap: 4,
					padding: 20,
					display: "flex",
					flexDirection: "column",
				},
			}}>
			<Alert sx={{ fontSize: 24, background: "inherit", alignItems: "center", padding: 0 }} severity={severity}>
				{message}
			</Alert>
			{error != "" ? <Typography sx={{ textAlign: "center" }}>{`Error: ${error}`}</Typography> : null}
			<Button
				sx={{ width: "fit-content", alignSelf: "center", mt: 2 }}
				variant="contained"
				onClick={() => {
					message != "Deleted Successfully" ? onOk() : navigate("/");
				}}>
				Ok
			</Button>
		</Dialog>
	);
};

export default CustomDialog;
