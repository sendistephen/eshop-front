import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import "./styles.css";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<div className="h-full w-full">
			<ToastProvider
				autoDismiss
				autoDismissTimeout={6000}
				placement="top-right">
				<App />
			</ToastProvider>
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
