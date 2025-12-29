import { Link } from "react-router";

const Pagination = ({ id }: { id: number }) => {
	return (
		< div className="my-6 flex justify-center items-center gap-3" >
			<Link
				to="/products/1"
				className={`rounded-3xl ${id === 1 ? "bg-purple-600" : "bg-gray-500/60"} size-10 justify-center items-center flex text-white`}
			>
				1
			</Link>
			<Link
				to="/products/2"
				className={`rounded-3xl ${id === 2 ? "bg-purple-600" : "bg-gray-500/60"} size-10 justify-center items-center flex text-white`}
			>
				2
			</Link>
			<Link
				to="/products/3"
				className={`rounded-3xl ${id === 3 ? "bg-purple-600" : "bg-gray-500/60"} size-10 justify-center items-center flex text-white`}
			>
				3
			</Link>
			<Link
				to="/products/4"
				className={`rounded-3xl ${id === 4 ? "bg-purple-600" : "bg-gray-500/60"} size-10 justify-center items-center flex text-white`}
			>
				4
			</Link>
		</div>)
}

export default Pagination;