import { createDomain } from "effector";

export const cartDomain = createDomain();

export const addItem = cartDomain.createEvent();
export const removeItem = cartDomain.createEvent();

export const cartStore = cartDomain
	.createStore([])
	.on(addItem, (state, payload) => [...state, payload])
	.on(removeItem, (state, payload) =>
		[...state].filter((el) => el.id !== payload)
	);