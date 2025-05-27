import { createDomain } from "effector";

export const cartDomain = createDomain();

export const addItem = cartDomain.createEvent();
export const removeItem = cartDomain.createEvent();
export const clearCart = cartDomain.createEvent();

export const cartStore = cartDomain
    .createStore([])
    .on(addItem, (state, payload) => {
        const existingItem = state.find((item) => item.id === payload.id);
        if (existingItem) {
            return state.map((item) =>
                item.id === payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        return [...state, { ...payload, quantity: 1 }];
    })
    .on(removeItem, (state, payload) => {
        const existingItem = state.find((item) => item.id === payload);
        if (existingItem && existingItem.quantity > 1) {
            return state.map((item) =>
                item.id === payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }
        return state.filter((item) => item.id !== payload);
    })
    .on(clearCart, () => []);