import {createSlice} from '@reduxjs/toolkit';

const safeParse = (item) => {
    try {
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return null;
    }
};

const initialState = {
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: safeParse(localStorage.getItem('user')),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action) {
            const {accessToken, refreshToken, user} = action.payload;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.user = user;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            state.token = null;
            state.refreshToken = null;
            state.user = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
    },
});

export const {setUserData, logout} = userSlice.actions;
export default userSlice.reducer;
