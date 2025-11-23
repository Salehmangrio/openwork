import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [
      {
        user_id: 1,
        email: 'client@example.com',
        name: 'Alice Client',
        password_hash: 'hash123',
        role: 'client',
        phone: '123-456',
        profile_image: '/img/alice.png',
        created_at: '2024-01-10',
        completed_orders: 5,
        suspended_status: false
      },
      {
        user_id: 2,
        email: 'freelancer@example.com',
        name: 'Bob Worker',
        password_hash: 'hash123',
        role: 'freelancer',
        phone: '987-654',
        profile_image: '/img/bob.png',
        created_at: '2024-01-12',
        completed_orders: 12,
        suspended_status: false
      },
      {
        user_id: 3,
        email: 'admin@example.com',
        name: 'Charlie Admin',
        password_hash: 'adm1n',
        role: 'admin',
        phone: '111-222',
        profile_image: '/img/admin.png',
        created_at: '2024-01-01',
        completed_orders: 0,
        suspended_status: false
      }
    ]
  },
  reducers: {}
});

export default usersSlice.reducer;
