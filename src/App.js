import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/account/sign-in" element={<Login />} />
				<Route path="/account/sign-up" element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

