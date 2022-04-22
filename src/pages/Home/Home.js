import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../../api/product";
import { Product } from "../../components";
import Hero from "../../assets/HERO.jpg";
import { Link } from "react-router-dom";

function Home({ history }) {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		fetchAllProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};
	const loadProductsByArrival = () => {
		fetchAllProducts("createdAt").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};
	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, []);

	return (
		<div className="">
			<div
				className="px-8 py-4 bg-green-400 text-white w-full h-full bg-no-repeat bg-cover bg-center bg-blend-multiply md:bg-blend-normal md:py-32 md:text-center"
				style={{ backgroundImage: `url(${Hero})` }}>
				<div className="mb-6">
					<h1 className="text-3xl font-bold md:text-7xl md:py-3">
						Shop <span className="text-xl md:text-4xl">&</span> Save
					</h1>
					<p className="text-base font-normal md:text-4xl">
						Up to 50% OFF on all grocery items
					</p>
				</div>
				<Link
					to="/shop"
					className="bg-black text-white rounded-sm text-sm p-2 mt-2 font-medium md:p-4 md:rounded-md">
					Shop Now!
				</Link>
			</div>

			<div className="mt-8 px-8 py-4">
				<h1 className="font-bold text-2xl text-center">Top Picks</h1>
				<div className="mt-8 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
					{productsBySell.map((product, index) => (
						<Product key={index} product={product} />
					))}
				</div>
			</div>
			{/* New Arrivals */}
			<div className="mt-8 px-4 py-4">
				<h1 className="font-bold text-2xl text-center">New Arrivals</h1>
				<div className="mt-8 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
					{productsByArrival.map((product, index) => (
						<Product key={index} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
