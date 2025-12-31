import React from 'react';
import { useCart } from '@/contexts/cartContext';
import { Trash } from 'lucide-react';
import dirham from '@/assets/UAE_Dirham_Symbol.svg'

const Cart: React.FC = () => {
	const { state, dispatch } = useCart();
	const { items } = state;

	const increment = (id: string) => {
		dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } });
	};

	const decrement = (id: string) => {
		dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } });
	};

	const remove = (id: string) => {
		dispatch({ type: 'REMOVE_ITEM', payload: { id } });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};

	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	console.log(items)

	if (items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-12">
				<span className="text-lg font-semibold text-gray-600">Your cart is empty.</span>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Shopping Cart</h2>
				<button
					onClick={clearCart}
					className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
				>
					Clear Cart
				</button>
			</div>

			<div className="space-y-4">
				{items.map(({ id, name, price, quantity }) => (
					<div
						key={id}
						className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 border"
					>
						<div>
							<div className="font-semibold text-gray-800">{name}</div>
							<div className="text-xs text-gray-500 flex items-center gap-1">
  								Unit Price:
  								<img
  								  src={dirham}
  								  alt="Dirham"
  								  className="w-2.5 h-2.5 mb-0.5 opacity-60"
  								/>
  								{price.toFixed(2)}
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="flex items-center border rounded px-2">
								<button
									onClick={() => decrement(id)}
									className="px-2 py-0 text-lg text-gray-500 hover:text-primary"
									aria-label="Decrease quantity"
								>
									−
								</button>
								<span className="px-3 text-gray-800 font-medium">{quantity}</span>
								<button
									onClick={() => increment(id)}
									className="px-2 py-0 text-lg text-gray-500 hover:text-primary"
									aria-label="Increase quantity"
								>
									+
								</button>
							</div>
							<div className="text-sm font-semibold text-gray-800 flex items-center gap-1">
								<img
  								  src={dirham}
  								  alt="Dirham"
  								  className="w-3 h-3 brightness-75 contrast-125"
  								/>
								{(price * quantity).toFixed(2)}
							</div>
							<button
								onClick={() => remove(id)}
								className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs"
							>
								<Trash/>
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 flex items-center justify-end text-right">
				<span className="text-xl flex gap-1 font-semibold">
					Total: 
					<img
  						src={dirham}
  						alt="Dirham"
  						className="w-4 h-4 text-gray-500 mt-1.5 ms-1"
  					/>
					{total.toFixed(2)} 
				</span>
				{/* Add checkout logic or button below */}
				<button className="ml-4 px-6 py-2 bg-[var(--color-purple)] text-white rounded-lg hover:bg-primary-dark transition-colors font-bold">Checkout</button>
			</div>
		</div>
	);
};

export default Cart;
