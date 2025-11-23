// slices.js
import { createSlice } from '@reduxjs/toolkit';
import {supabase} from '../../db/suppabase.js';

// =====================================================
// 1. USERS
// =====================================================
export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [
            // Clients (international names)
            { user_id: 1, email: 'john.smith@gmail.com', name: 'John Smith', password_hash: 'hash123', role: 'client', phone: '123-456-7890', profile_image: '/img/john.png', created_at: '2024-01-10', completed_orders: 7, suspended_status: false },
            { user_id: 4, email: 'michael.brown@yahoo.com', name: 'Michael Brown', password_hash: 'hash234', role: 'client', phone: '222-333-4444', profile_image: '/img/michael.png', created_at: '2024-02-05', completed_orders: 4, suspended_status: false },
            { user_id: 6, email: 'william.johnson@outlook.com', name: 'William Johnson', password_hash: 'hash345', role: 'client', phone: '444-555-6666', profile_image: '/img/william.png', created_at: '2024-03-10', completed_orders: 3, suspended_status: false },
            { user_id: 9, email: 'james.wilson@gmail.com', name: 'James Wilson', password_hash: 'hash567', role: 'client', phone: '777-888-9999', profile_image: '/img/james.png', created_at: '2024-03-20', completed_orders: 5, suspended_status: false },
            { user_id: 12, email: 'robert.taylor@yahoo.com', name: 'Robert Taylor', password_hash: 'hash890', role: 'client', phone: '000-111-2222', profile_image: '/img/robert.png', created_at: '2024-04-25', completed_orders: 9, suspended_status: false },
            { user_id: 14, email: 'david.anderson@outlook.com', name: 'David Anderson', password_hash: 'hash012', role: 'client', phone: '222-333-4445', profile_image: '/img/david.png', created_at: '2024-05-05', completed_orders: 6, suspended_status: false },
            { user_id: 16, email: 'charles.thomas@gmail.com', name: 'Charles Thomas', password_hash: 'hash234', role: 'client', phone: '444-555-6667', profile_image: '/img/charles.png', created_at: '2024-05-15', completed_orders: 8, suspended_status: false },
            { user_id: 18, email: 'henry.martin@yahoo.com', name: 'Henry Martin', password_hash: 'hash456', role: 'client', phone: '666-777-8889', profile_image: '/img/henry.png', created_at: '2024-05-25', completed_orders: 7, suspended_status: false },
            { user_id: 20, email: 'emma.davis@outlook.com', name: 'Emma Davis', password_hash: 'hash678', role: 'client', phone: '888-999-0001', profile_image: '/img/emma.png', created_at: '2024-06-05', completed_orders: 4, suspended_status: false },

            // Freelancers (Pakistani names)
            { user_id: 2, email: 'saleh.mangrio@gmail.com', name: 'Saleh Mangrio', password_hash: 'hash123', role: 'freelancer', phone: '987-654-3210', profile_image: '/img/saleh.png', created_at: '2024-01-12', completed_orders: 12, suspended_status: false },
            { user_id: 5, email: 'chander.kumar@yahoo.com', name: 'Chander Kumar', password_hash: 'hash234', role: 'freelancer', phone: '333-444-5555', profile_image: '/img/chander.png', created_at: '2024-02-07', completed_orders: 8, suspended_status: false },
            { user_id: 7, email: 'zeeshan.hyder@outlook.com', name: 'Zeeshan Hyder', password_hash: 'hash345', role: 'freelancer', phone: '555-666-7777', profile_image: '/img/zeeshan.png', created_at: '2024-03-12', completed_orders: 15, suspended_status: false },
            { user_id: 8, email: 'ahmed.khan@gmail.com', name: 'Ahmed Khan', password_hash: 'hash456', role: 'freelancer', phone: '666-777-8888', profile_image: '/img/ahmed.png', created_at: '2024-03-15', completed_orders: 10, suspended_status: false },
            { user_id: 10, email: 'bilal.sheikh@yahoo.com', name: 'Bilal Sheikh', password_hash: 'hash456', role: 'freelancer', phone: '888-999-0000', profile_image: '/img/bilal.png', created_at: '2024-04-18', completed_orders: 20, suspended_status: false },
            { user_id: 11, email: 'muhammad.ali@outlook.com', name: 'Muhammad Ali', password_hash: 'hash789', role: 'freelancer', phone: '999-000-1111', profile_image: '/img/muhammad.png', created_at: '2024-04-20', completed_orders: 18, suspended_status: false },
            { user_id: 13, email: 'hassan.raza@gmail.com', name: 'Hassan Raza', password_hash: 'hash901', role: 'freelancer', phone: '111-222-3334', profile_image: '/img/hassan.png', created_at: '2024-05-01', completed_orders: 14, suspended_status: false },
            { user_id: 15, email: 'umar.farooq@yahoo.com', name: 'Umar Farooq', password_hash: 'hash123', role: 'freelancer', phone: '333-444-5556', profile_image: '/img/umar.png', created_at: '2024-05-10', completed_orders: 11, suspended_status: false },
            { user_id: 17, email: 'imran.siddiqui@outlook.com', name: 'Imran Siddiqui', password_hash: 'hash345', role: 'freelancer', phone: '555-666-7778', profile_image: '/img/imran.png', created_at: '2024-05-20', completed_orders: 16, suspended_status: false },
            { user_id: 19, email: 'abdullah.yousuf@gmail.com', name: 'Abdullah Yousuf', password_hash: 'hash567', role: 'freelancer', phone: '777-888-9990', profile_image: '/img/abdullah.png', created_at: '2024-06-01', completed_orders: 13, suspended_status: false }
            //Admins 
        ]

    },
    reducers: {
        addUser: (state, action) => { state.list.push(action.payload); },
        updateUser: (state, action) => {
            const index = state.list.findIndex(u => u.user_id === action.payload.user_id);
            if (index !== -1) state.list[index] = { ...state.list[index], ...action.payload };
        },
        deleteUser: (state, action) => { state.list = state.list.filter(u => u.user_id !== action.payload); },
        suspendUser: (state, action) => { const u = state.list.find(u => u.user_id === action.payload); if (u) u.suspended_status = true; },
        unsuspendUser: (state, action) => { const u = state.list.find(u => u.user_id === action.payload); if (u) u.suspended_status = false; }
    }
});
export const { addUser, updateUser, deleteUser, suspendUser, unsuspendUser } = usersSlice.actions;

// =====================================================
// 2. CLIENTS
// =====================================================
export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        list: [
            { client_id: 1, user_id: 1, bio: "TechHive Solutions is a leading IT firm in New York specializing in software development and innovative digital solutions.", company_name: 'TechHive Solutions', organization_type: 'IT Firm', location: 'New York, USA', total_spent: 2850 },
            { client_id: 2, user_id: 4, bio: "GreenSolutions Inc. is a top consulting company in Toronto helping businesses optimize operations and implement sustainable strategies.", company_name: 'GreenSolutions Inc.', organization_type: 'Consulting', location: 'Toronto, Canada', total_spent: 1900 },
            { client_id: 3, user_id: 6, bio: "BrightTech Labs is a London-based software development company focusing on scalable web and mobile applications for global clients.", company_name: 'BrightTech Labs', organization_type: 'Software Development', location: 'London, UK', total_spent: 1800 },
            { client_id: 4, user_id: 9, bio: "Skyline Innovations is an Australian software company providing end-to-end solutions, from web development to enterprise-level systems.", company_name: 'Skyline Innovations', organization_type: 'Software Development', location: 'Sydney, Australia', total_spent: 2200 },
            { client_id: 5, user_id: 12, bio: "Digital Dynamics in Auckland delivers comprehensive digital marketing services, helping businesses enhance online presence and engagement.", company_name: 'Digital Dynamics', organization_type: 'Digital Marketing', location: 'Auckland, New Zealand', total_spent: 1500 },
            { client_id: 6, user_id: 14, bio: "NextGen Tech is an innovative IT solutions company in Los Angeles specializing in cutting-edge technology services and software development.", company_name: 'NextGen Tech', organization_type: 'IT Solutions', location: 'Los Angeles, USA', total_spent: 3100 },
            { client_id: 7, user_id: 16, bio: "Creative Minds Ltd in London is a design agency focused on modern web design, branding, and UI/UX solutions for global clients.", company_name: 'Creative Minds Ltd', organization_type: 'Design Agency', location: 'London, UK', total_spent: 1750 },
            { client_id: 8, user_id: 18, bio: "E-Commerce Solutions in Toronto offers online retail platforms and consulting for businesses looking to scale their e-commerce operations.", company_name: 'E-Commerce Solutions', organization_type: 'Online Retail', location: 'Toronto, Canada', total_spent: 2400 },
            { client_id: 9, user_id: 20, bio: "Data Analytics Pro in San Francisco provides expert data science and analytics services to help companies make data-driven decisions.", company_name: 'Data Analytics Pro', organization_type: 'Data Science', location: 'San Francisco, USA', total_spent: 2900 }
        ]
    },
    reducers: {
        addClient: (state, action) => { state.list.push(action.payload); },
        updateClient: (state, action) => {
            const i = state.list.findIndex(c => c.client_id === action.payload.client_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteClient: (state, action) => { state.list = state.list.filter(c => c.client_id !== action.payload); },
        updateTotalSpent: (state, action) => {
            const c = state.list.find(c => c.client_id === action.payload.client_id);
            if (c) c.total_spent += action.payload.amount;
        }
    }
});
export const { addClient, updateClient, deleteClient, updateTotalSpent } = clientsSlice.actions;

// =====================================================
// 3. FREELANCERS
// =====================================================
export const freelancersSlice = createSlice({
    name: 'freelancers',
    initialState: {
        list: [
            { freelancer_id: 1, bio: "I am a senior full-stack developer with expertise in React and Node.js, building scalable web applications.", user_id: 2, skills: 'React, Node.js, Tailwind CSS, Redux', experience_level: 'senior', hourly_rate: 35, portfolio_link: 'https://salehmangrio.netlify.app', ai_skill_score: 94 },
            { freelancer_id: 2, bio: "Python developer with strong backend experience in Django and REST APIs, delivering efficient solutions.", user_id: 5, skills: 'Python, Django, PostgreSQL, REST API', experience_level: 'mid-level', hourly_rate: 28, portfolio_link: 'https://chanderkumar.netlify.app', ai_skill_score: 87 },
            { freelancer_id: 3, bio: "Experienced Java developer skilled in Spring Boot, microservices architecture, and cloud deployment on AWS.", user_id: 7, skills: 'Java, Spring Boot, Microservices, AWS', experience_level: 'senior', hourly_rate: 42, portfolio_link: 'https://george.dev', ai_skill_score: 89 },
            { freelancer_id: 4, bio: "UI/UX designer specialized in Figma and prototyping intuitive user interfaces for web and mobile apps.", user_id: 10, skills: 'Figma, UI/UX Design, Prototyping', experience_level: 'mid-level', hourly_rate: 30, portfolio_link: 'https://julia.design', ai_skill_score: 91 },
            { freelancer_id: 5, bio: "Full-stack developer with 5 years of experience creating modern web applications using React and Node.js.", user_id: 8, skills: 'React, Node.js, MongoDB, Express', experience_level: 'senior', hourly_rate: 38, portfolio_link: 'https://ahmed.dev', ai_skill_score: 92 },
            { freelancer_id: 6, bio: "Mobile app developer building high-performance cross-platform apps for iOS and Android.", user_id: 11, skills: 'React Native, Flutter, iOS, Android', experience_level: 'senior', hourly_rate: 40, portfolio_link: 'https://muhammad.dev', ai_skill_score: 88 },
            { freelancer_id: 7, bio: "Backend specialist focused on building scalable APIs and databases with Python and PostgreSQL.", user_id: 13, skills: 'Python, Django, FastAPI, PostgreSQL', experience_level: 'mid-level', hourly_rate: 32, portfolio_link: 'https://hassan.dev', ai_skill_score: 85 },
            { freelancer_id: 8, bio: "Frontend developer creating responsive and interactive web interfaces using Vue.js and Nuxt.js.", user_id: 15, skills: 'Vue.js, Nuxt.js, Tailwind CSS', experience_level: 'mid-level', hourly_rate: 30, portfolio_link: 'https://bilal.dev', ai_skill_score: 87 },
            { freelancer_id: 9, bio: "DevOps engineer with expertise in Docker, Kubernetes, CI/CD pipelines, and AWS cloud deployment.", user_id: 17, skills: 'Docker, Kubernetes, CI/CD, AWS', experience_level: 'senior', hourly_rate: 45, portfolio_link: 'https://umar.dev', ai_skill_score: 90 },
            { freelancer_id: 10, bio: "Data scientist skilled in Python, machine learning, and data analysis to deliver actionable insights.", user_id: 19, skills: 'Python, TensorFlow, Data Analysis, Machine Learning', experience_level: 'senior', hourly_rate: 48, portfolio_link: 'https://abdullah.dev', ai_skill_score: 93 }
        ]

    },
    reducers: {
        addFreelancer: (state, action) => { state.list.push(action.payload); },
        updateFreelancer: (state, action) => {
            const i = state.list.findIndex(f => f.freelancer_id === action.payload.freelancer_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteFreelancer: (state, action) => { state.list = state.list.filter(f => f.freelancer_id !== action.payload); },
        updateSkills: (state, action) => { const f = state.list.find(f => f.freelancer_id === action.payload.freelancer_id); if (f) f.skills = action.payload.skills; },
        updateHourlyRate: (state, action) => { const f = state.list.find(f => f.freelancer_id === action.payload.freelancer_id); if (f) f.hourly_rate = action.payload.rate; }
    }
});
export const { addFreelancer, updateFreelancer, deleteFreelancer, updateSkills, updateHourlyRate } = freelancersSlice.actions;

// =====================================================
// 4. ADMINS
// =====================================================
export const adminSlice = createSlice({
    name: 'admins',
    initialState: {
        list: [
            { admin_id: 1, user_id: 3, role_level: 'superadmin' },
            { admin_id: 2, user_id: 11, role_level: 'admin' },
            { admin_id: 3, user_id: 17, role_level: 'moderator' }
        ]
    },
    reducers: {
        addAdmin: (state, action) => { state.list.push(action.payload); },
        updateAdmin: (state, action) => {
            const i = state.list.findIndex(a => a.admin_id === action.payload.admin_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteAdmin: (state, action) => { state.list = state.list.filter(a => a.admin_id !== action.payload); }
    }
});
export const { addAdmin, updateAdmin, deleteAdmin } = adminSlice.actions;

// =====================================================
// 5. ACTIVITY LOG
// =====================================================
export const activityLogSlice = createSlice({
    name: 'activityLog',
    initialState: {
        list: [
            { log_id: 1, user_id: 1, action: 'Posted job #1', ip_address: '192.168.1.10', action_time: '2024-02-03T10:00:00' },
            { log_id: 2, user_id: 2, action: 'Applied to job #1', ip_address: '192.168.1.15', action_time: '2024-02-04T14:22:00' },
            { log_id: 3, user_id: 1, action: 'Hired freelancer for order #1', ip_address: '192.168.1.10', action_time: '2024-02-06T09:15:00' },
            { log_id: 4, user_id: 2, action: 'Completed order #1', ip_address: '192.168.1.15', action_time: '2024-02-12T18:30:00' },
            { log_id: 5, user_id: 9, action: 'Posted job #4', ip_address: '192.168.1.20', action_time: '2024-03-05T11:30:00' },
            { log_id: 6, user_id: 8, action: 'Applied to job #4', ip_address: '192.168.1.25', action_time: '2024-03-06T15:45:00' },
            { log_id: 7, user_id: 12, action: 'Posted job #5', ip_address: '192.168.1.30', action_time: '2024-03-10T09:20:00' },
            { log_id: 8, user_id: 11, action: 'Applied to job #5', ip_address: '192.168.1.35', action_time: '2024-03-11T16:30:00' },
            { log_id: 9, user_id: 14, action: 'Posted job #6', ip_address: '192.168.1.40', action_time: '2024-03-15T10:45:00' },
            { log_id: 10, user_id: 13, action: 'Applied to job #6', ip_address: '192.168.1.45', action_time: '2024-03-16T14:20:00' },
            { log_id: 11, user_id: 16, action: 'Posted job #7', ip_address: '192.168.1.50', action_time: '2024-03-20T12:15:00' },
            { log_id: 12, user_id: 15, action: 'Applied to job #7', ip_address: '192.168.1.55', action_time: '2024-03-21T17:40:00' },
            { log_id: 13, user_id: 18, action: 'Posted job #8', ip_address: '192.168.1.60', action_time: '2024-03-25T13:30:00' },
            { log_id: 14, user_id: 17, action: 'Applied to job #8', ip_address: '192.168.1.65', action_time: '2024-03-26T18:50:00' },
            { log_id: 15, user_id: 20, action: 'Posted job #9', ip_address: '192.168.1.70', action_time: '2024-04-01T11:10:00' },
            { log_id: 16, user_id: 19, action: 'Applied to job #9', ip_address: '192.168.1.75', action_time: '2024-04-02T15:25:00' }
        ]
    },
    reducers: {
        addActivityLog: (state, action) => { state.list.push(action.payload); },
        deleteActivityLog: (state, action) => { state.list = state.list.filter(l => l.log_id !== action.payload); },
        clearAllLogs: (state) => { state.list = []; }
    }
});
export const { addActivityLog, deleteActivityLog, clearAllLogs } = activityLogSlice.actions;

// =====================================================
// 6. NOTIFICATIONS
// =====================================================
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: [
            { notification_id: 1, user_id: 2, type: 'job_application_status', message: 'Your application for "Create Frontend UI" was accepted!', is_read: false, sent_on: '2024-02-06T09:20:00' },
            { notification_id: 2, user_id: 2, type: 'payment_received', message: 'Payment of $450 received for order #1', is_read: false, sent_on: '2024-02-12T19:00:00' },
            { notification_id: 3, user_id: 1, type: 'feedback_received', message: 'You received 5-star feedback from Chander', is_read: false, sent_on: '2024-02-13T10:30:00' },
            { notification_id: 4, user_id: 2, type: 'order_update', message: 'Order #1 has been marked as completed', is_read: true, sent_on: '2024-02-12T18:35:00' },
            { notification_id: 5, user_id: 8, type: 'job_application_status', message: 'Your application for "E-commerce Website" was accepted!', is_read: false, sent_on: '2024-03-07T10:30:00' },
            { notification_id: 6, user_id: 8, type: 'payment_received', message: 'Payment of $550 received for order #4', is_read: false, sent_on: '2024-03-15T20:15:00' },
            { notification_id: 7, user_id: 9, type: 'feedback_received', message: 'You received 4-star feedback from Ahmed Khan', is_read: false, sent_on: '2024-03-16T11:45:00' },
            { notification_id: 8, user_id: 11, type: 'job_application_status', message: 'Your application for "Mobile App Development" was accepted!', is_read: false, sent_on: '2024-03-12T14:20:00' },
            { notification_id: 9, user_id: 11, type: 'payment_received', message: 'Payment of $680 received for order #5', is_read: false, sent_on: '2024-03-20T21:30:00' },
            { notification_id: 10, user_id: 12, type: 'feedback_received', message: 'You received 5-star feedback from Muhammad Ali', is_read: false, sent_on: '2024-03-21T12:00:00' },
            { notification_id: 11, user_id: 13, type: 'job_application_status', message: 'Your application for "API Integration" was accepted!', is_read: false, sent_on: '2024-03-17T16:45:00' },
            { notification_id: 12, user_id: 13, type: 'payment_received', message: 'Payment of $420 received for order #6', is_read: false, sent_on: '2024-03-25T22:10:00' },
            { notification_id: 13, user_id: 14, type: 'feedback_received', message: 'You received 4-star feedback from Hassan Raza', is_read: false, sent_on: '2024-03-26T13:15:00' },
            { notification_id: 14, user_id: 15, type: 'job_application_status', message: 'Your application for "Website Redesign" was accepted!', is_read: false, sent_on: '2024-03-22T11:30:00' },
            { notification_id: 15, user_id: 15, type: 'payment_received', message: 'Payment of $380 received for order #7', is_read: false, sent_on: '2024-03-30T19:45:00' },
            { notification_id: 16, user_id: 16, type: 'feedback_received', message: 'You received 5-star feedback from Bilal Sheikh', is_read: false, sent_on: '2024-03-31T10:20:00' },
            { notification_id: 17, user_id: 17, type: 'job_application_status', message: 'Your application for "Cloud Infrastructure Setup" was accepted!', is_read: false, sent_on: '2024-03-27T15:10:00' },
            { notification_id: 18, user_id: 17, type: 'payment_received', message: 'Payment of $750 received for order #8', is_read: false, sent_on: '2024-04-05T20:30:00' },
            { notification_id: 19, user_id: 18, type: 'feedback_received', message: 'You received 4-star feedback from Umar Farooq', is_read: false, sent_on: '2024-04-06T11:50:00' },
            { notification_id: 20, user_id: 19, type: 'job_application_status', message: 'Your application for "Data Analysis Dashboard" was accepted!', is_read: false, sent_on: '2024-04-03T12:40:00' },
            { notification_id: 21, user_id: 19, type: 'payment_received', message: 'Payment of $620 received for order #9', is_read: false, sent_on: '2024-04-10T21:15:00' },
            { notification_id: 22, user_id: 20, type: 'feedback_received', message: 'You received 5-star feedback from Abdullah Yousuf', is_read: false, sent_on: '2024-04-11T09:30:00' }
        ]
    },
    reducers: {
        addNotification: (state, action) => { state.list.push(action.payload); },
        markAsRead: (state, action) => { const n = state.list.find(n => n.notification_id === action.payload); if (n) n.is_read = true; },
        markAsUnread: (state, action) => { const n = state.list.find(n => n.notification_id === action.payload); if (n) n.is_read = false; },
        deleteNotification: (state, action) => { state.list = state.list.filter(n => n.notification_id !== action.payload); },
        markAllAsRead: (state) => { state.list.forEach(n => n.is_read = true); }
    }
});
export const { addNotification, markAsRead, markAsUnread, deleteNotification, markAllAsRead } = notificationsSlice.actions;

// =====================================================
// 7. JOBS
// =====================================================
export const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        list: [
            { job_id: 1, client_id: 1, title: 'Create Frontend UI', description: 'Develop a modern, responsive dashboard using React and Tailwind CSS. Implement reusable components, responsive layouts, and integrate Redux for state management.', category: 'Web Development', budget: 450, duration_days: 7, skills: ['React', 'Tailwind CSS', 'Redux'], status: 'closed', posted_at: '2024-02-03', deadline: '2024-02-10' },
            { job_id: 2, client_id: 2, title: 'Mobile App UI/UX Design', description: 'Design intuitive and visually appealing mobile app screens in Figma. Provide interactive prototypes and user flow documentation to ensure seamless UX.', category: 'UI/UX Design', budget: 350, duration_days: 5, skills: ['Figma', 'UI/UX'], status: 'open', posted_at: '2024-02-15', deadline: '2024-02-20' },
            { job_id: 3, client_id: 1, title: 'Backend API with Node.js', description: 'Build secure and scalable RESTful APIs using Node.js and Express. Implement authentication, authorization, and integrate JWT-based security for users.', category: 'Backend Development', budget: 600, duration_days: 10, skills: ['Node.js', 'Express', 'JWT'], status: 'in-progress', posted_at: '2024-02-18', deadline: '2024-02-28' },
            { job_id: 4, client_id: 4, title: 'E-commerce Website', description: 'Develop a full-featured e-commerce platform including product catalog, shopping cart, checkout system, and payment gateway integration. Ensure responsive design and high performance.', category: 'Web Development', budget: 550, duration_days: 14, skills: ['React', 'Node.js', 'MongoDB'], status: 'closed', posted_at: '2024-03-05', deadline: '2024-03-19' },
            { job_id: 5, client_id: 5, title: 'Mobile App Development', description: 'Create a cross-platform mobile app with React Native and Flutter. Include user authentication, real-time notifications, and Firebase backend integration.', category: 'Mobile Development', budget: 680, duration_days: 21, skills: ['React Native', 'Flutter', 'Firebase'], status: 'closed', posted_at: '2024-03-10', deadline: '2024-03-31' },
            { job_id: 6, client_id: 6, title: 'API Integration', description: 'Integrate third-party APIs into the existing system. Ensure smooth data exchange, proper error handling, and secure API calls with authentication tokens.', category: 'Backend Development', budget: 420, duration_days: 7, skills: ['Python', 'Django', 'REST API'], status: 'closed', posted_at: '2024-03-15', deadline: '2024-03-22' },
            { job_id: 7, client_id: 7, title: 'Website Redesign', description: 'Redesign the company website with a modern UI and responsive layout. Implement improved navigation, faster load times, and visually appealing components using Vue.js and Tailwind CSS.', category: 'Web Design', budget: 380, duration_days: 10, skills: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'], status: 'closed', posted_at: '2024-03-20', deadline: '2024-03-30' },
            { job_id: 8, client_id: 8, title: 'Cloud Infrastructure Setup', description: 'Set up a secure and scalable cloud infrastructure for a web application. Implement Docker containers, Kubernetes orchestration, and AWS cloud deployment for high availability.', category: 'DevOps', budget: 750, duration_days: 14, skills: ['Docker', 'Kubernetes', 'AWS'], status: 'closed', posted_at: '2024-03-25', deadline: '2024-04-08' },
            { job_id: 9, client_id: 9, title: 'Data Analysis Dashboard', description: 'Develop an interactive data visualization dashboard using Python and TensorFlow. Include charts, graphs, and AI-driven insights to help stakeholders make informed decisions.', category: 'Data Science', budget: 620, duration_days: 12, skills: ['Python', 'TensorFlow', 'Data Analysis'], status: 'closed', posted_at: '2024-04-01', deadline: '2024-04-13' },
            { job_id: 10, client_id: 4, title: 'SEO Optimization', description: 'Optimize website structure and content for search engines. Implement SEO best practices, keyword optimization, and integrate Google Analytics to track performance.', category: 'Digital Marketing', budget: 300, duration_days: 7, skills: ['SEO', 'Google Analytics', 'Content Marketing'], status: 'open', posted_at: '2024-04-05', deadline: '2024-04-12' },
            { job_id: 11, client_id: 5, title: 'Content Writing', description: 'Write engaging and SEO-friendly blog posts for the company website. Ensure high-quality content, proper keyword integration, and consistent tone across articles.', category: 'Content Writing', budget: 250, duration_days: 5, skills: ['Content Writing', 'Blog Writing', 'SEO'], status: 'open', posted_at: '2024-04-08', deadline: '2024-04-13' },
            { job_id: 12, client_id: 6, title: 'Database Optimization', description: 'Analyze and optimize database queries for better performance. Implement indexing, query optimization, and best practices for PostgreSQL to handle large datasets efficiently.', category: 'Database', budget: 400, duration_days: 8, skills: ['SQL', 'PostgreSQL', 'Database Optimization'], status: 'open', posted_at: '2024-04-10', deadline: '2024-04-18' }
        ]

    },
    reducers: {
        addJob: (state, action) => { state.list.push(action.payload); },
        updateJob: (state, action) => {
            const i = state.list.findIndex(j => j.job_id === action.payload.job_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteJob: (state, action) => { state.list = state.list.filter(j => j.job_id !== action.payload); },
        updateJobStatus: (state, action) => { const j = state.list.find(j => j.job_id === action.payload.job_id); if (j) j.status = action.payload.status; }
    }
});
export const { addJob, updateJob, deleteJob, updateJobStatus } = jobsSlice.actions;

// =====================================================
// 8. JOB APPLICATIONS
// =====================================================
export const jobApplicationsSlice = createSlice({
    name: 'jobApplications',
    initialState: {
        list: [
            { application_id: 1, job_id: 1, freelancer_id: 1, cover_letter: 'Expert in React & Tailwind.', proposed_budget: 450, status: 'accepted', applied_on: '2024-02-04' },
            { application_id: 2, job_id: 1, freelancer_id: 2, cover_letter: 'Strong frontend skills.', proposed_budget: 420, status: 'rejected', applied_on: '2024-02-05' },
            { application_id: 3, job_id: 2, freelancer_id: 4, cover_letter: 'Specialized in mobile UI/UX.', proposed_budget: 340, status: 'pending', applied_on: '2024-02-16' },
            { application_id: 4, job_id: 4, freelancer_id: 5, cover_letter: 'I have extensive experience in building e-commerce platforms with React and Node.js.', proposed_budget: 550, status: 'accepted', applied_on: '2024-03-06' },
            { application_id: 5, job_id: 4, freelancer_id: 1, cover_letter: 'I can deliver a high-quality e-commerce platform within the specified timeframe.', proposed_budget: 530, status: 'rejected', applied_on: '2024-03-07' },
            { application_id: 6, job_id: 5, freelancer_id: 6, cover_letter: 'I specialize in cross-platform mobile app development using React Native and Flutter.', proposed_budget: 680, status: 'accepted', applied_on: '2024-03-11' },
            { application_id: 7, job_id: 5, freelancer_id: 2, cover_letter: 'I have experience in mobile app development with React Native.', proposed_budget: 650, status: 'rejected', applied_on: '2024-03-12' },
            { application_id: 8, job_id: 6, freelancer_id: 7, cover_letter: 'I have expertise in API integration using Python and Django.', proposed_budget: 420, status: 'accepted', applied_on: '2024-03-16' },
            { application_id: 9, job_id: 6, freelancer_id: 3, cover_letter: 'I can integrate third-party APIs into your existing system.', proposed_budget: 400, status: 'rejected', applied_on: '2024-03-17' },
            { application_id: 10, job_id: 7, freelancer_id: 8, cover_letter: 'I specialize in modern web design using Vue.js and Tailwind CSS.', proposed_budget: 380, status: 'accepted', applied_on: '2024-03-21' },
            { application_id: 11, job_id: 7, freelancer_id: 4, cover_letter: 'I can redesign your website with a modern UI/UX approach.', proposed_budget: 360, status: 'rejected', applied_on: '2024-03-22' },
            { application_id: 12, job_id: 8, freelancer_id: 9, cover_letter: 'I have extensive experience in setting up cloud infrastructure with Docker and Kubernetes.', proposed_budget: 750, status: 'accepted', applied_on: '2024-03-26' },
            { application_id: 13, job_id: 8, freelancer_id: 3, cover_letter: 'I can set up cloud infrastructure for your web application.', proposed_budget: 720, status: 'rejected', applied_on: '2024-03-27' },
            { application_id: 14, job_id: 9, freelancer_id: 10, cover_letter: 'I specialize in data analysis and visualization using Python and TensorFlow.', proposed_budget: 620, status: 'accepted', applied_on: '2024-04-02' },
            { application_id: 15, job_id: 9, freelancer_id: 7, cover_letter: 'I can create an interactive dashboard for data visualization.', proposed_budget: 600, status: 'rejected', applied_on: '2024-04-03' },
            { application_id: 16, job_id: 10, freelancer_id: 5, cover_letter: 'I have experience in SEO optimization and can improve your website rankings.', proposed_budget: 300, status: 'pending', applied_on: '2024-04-06' },
            { application_id: 17, job_id: 11, freelancer_id: 8, cover_letter: 'I can write high-quality blog posts optimized for SEO.', proposed_budget: 250, status: 'pending', applied_on: '2024-04-09' },
            { application_id: 18, job_id: 12, freelancer_id: 7, cover_letter: 'I have expertise in database optimization using PostgreSQL.', proposed_budget: 400, status: 'pending', applied_on: '2024-04-11' }
        ]
    },
    reducers: {
        addApplication: (state, action) => { state.list.push(action.payload); },
        updateApplication: (state, action) => {
            const i = state.list.findIndex(a => a.application_id === action.payload.application_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteApplication: (state, action) => { state.list = state.list.filter(a => a.application_id !== action.payload); },
        updateApplicationStatus: (state, action) => { const a = state.list.find(a => a.application_id === action.payload.application_id); if (a) a.status = action.payload.status; }
    }
});
export const { addApplication, updateApplication, deleteApplication, updateApplicationStatus } = jobApplicationsSlice.actions;

// =====================================================
// 9. OPEN OFFERS
// =====================================================
export const openOffersSlice = createSlice({
    name: 'openOffers',
    initialState: {
        list: [
            { offer_id: 1, freelancer_id: 1, title: 'React + Tailwind Landing Page', description: 'Pixel-perfect responsive landing page built using React and Tailwind CSS. Includes interactive components, animations, and SEO-friendly structure.', category: 'Frontend', skills: ['React', 'Tailwind'], price: 180, delivery_time_days: 3, created_at: '2024-02-01' },
            { offer_id: 2, freelancer_id: 2, title: 'Django REST API Setup', description: 'Full backend setup using Django REST Framework, including authentication, CRUD operations, and PostgreSQL integration. Ready for production deployment.', category: 'Backend', skills: ['Django', 'PostgreSQL'], price: 320, delivery_time_days: 5, created_at: '2024-02-10' },
            { offer_id: 3, freelancer_id: 5, title: 'Full-stack E-commerce Solution', description: 'Complete e-commerce platform with React frontend, Node.js backend, MongoDB database, payment gateway integration, and admin dashboard for order management.', category: 'Full-stack', skills: ['React', 'Node.js', 'MongoDB'], price: 800, delivery_time_days: 15, created_at: '2024-03-01' },
            { offer_id: 4, freelancer_id: 6, title: 'Cross-platform Mobile App', description: 'Develop a mobile application for iOS and Android using React Native or Flutter, integrated with Firebase backend for authentication, database, and notifications.', category: 'Mobile Development', skills: ['React Native', 'Flutter', 'Firebase'], price: 900, delivery_time_days: 20, created_at: '2024-03-05' },
            { offer_id: 5, freelancer_id: 7, title: 'API Integration Service', description: 'Seamlessly integrate third-party APIs into your existing system, including data validation, error handling, and documentation for future maintenance.', category: 'Backend', skills: ['Python', 'Django', 'REST API'], price: 450, delivery_time_days: 7, created_at: '2024-03-10' },
            { offer_id: 6, freelancer_id: 8, title: 'Modern Website Redesign', description: 'Redesign your website with a modern UI/UX approach using Vue.js, Nuxt.js, and Tailwind CSS. Mobile responsive, SEO optimized, and performance-focused.', category: 'Web Design', skills: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'], price: 400, delivery_time_days: 10, created_at: '2024-03-15' },
            { offer_id: 7, freelancer_id: 9, title: 'Cloud Infrastructure Setup', description: 'Design and deploy scalable cloud infrastructure for your web or mobile application using Docker, Kubernetes, and AWS services for high availability.', category: 'DevOps', skills: ['Docker', 'Kubernetes', 'AWS'], price: 750, delivery_time_days: 14, created_at: '2024-03-20' },
            { offer_id: 8, freelancer_id: 10, title: 'Data Analysis Dashboard', description: 'Build an interactive dashboard for data visualization and insights using Python, TensorFlow, and data analytics libraries. Includes charts, graphs, and predictive models.', category: 'Data Science', skills: ['Python', 'TensorFlow', 'Data Analysis'], price: 650, delivery_time_days: 12, created_at: '2024-03-25' },
            { offer_id: 9, freelancer_id: 5, title: 'SEO Optimization Service', description: 'Improve website search engine ranking with SEO best practices, keyword optimization, Google Analytics setup, and content marketing strategies.', category: 'Digital Marketing', skills: ['SEO', 'Google Analytics', 'Content Marketing'], price: 300, delivery_time_days: 7, created_at: '2024-04-01' },
            { offer_id: 10, freelancer_id: 8, title: 'Content Writing Package', description: 'Deliver high-quality blog posts and website articles tailored to your audience. SEO optimized content to drive traffic and engagement.', category: 'Content Writing', skills: ['Content Writing', 'Blog Writing', 'SEO'], price: 250, delivery_time_days: 5, created_at: '2024-04-05' }
        ]
    },
    reducers: {
        addOffer: (state, action) => { state.list.push(action.payload); },
        updateOffer: (state, action) => {
            const i = state.list.findIndex(o => o.offer_id === action.payload.offer_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteOffer: (state, action) => { state.list = state.list.filter(o => o.offer_id !== action.payload); }
    }
});
export const { addOffer, updateOffer, deleteOffer } = openOffersSlice.actions;

// =====================================================
// 10. AI SKILL TESTS
// =====================================================
export const aiSkillTestSlice = createSlice({
    name: 'aiSkillTests',
    initialState: {
        list: [
            { test_id: 1, freelancer_id: 1, test_name: 'React Mastery', ai_score: 94, taken_on: '2024-01-20' },
            { test_id: 2, freelancer_id: 1, test_name: 'JavaScript Advanced', ai_score: 96, taken_on: '2024-01-22' },
            { test_id: 3, freelancer_id: 2, test_name: 'Python Backend', ai_score: 89, taken_on: '2024-02-01' },
            { test_id: 4, freelancer_id: 5, test_name: 'React Advanced', ai_score: 92, taken_on: '2024-02-15' },
            { test_id: 5, freelancer_id: 5, test_name: 'Node.js Backend', ai_score: 88, taken_on: '2024-02-18' },
            { test_id: 6, freelancer_id: 6, test_name: 'React Native', ai_score: 90, taken_on: '2024-02-20' },
            { test_id: 7, freelancer_id: 6, test_name: 'Flutter Development', ai_score: 86, taken_on: '2024-02-22' },
            { test_id: 8, freelancer_id: 7, test_name: 'Python Django', ai_score: 85, taken_on: '2024-02-25' },
            { test_id: 9, freelancer_id: 7, test_name: 'API Design', ai_score: 87, taken_on: '2024-02-28' },
            { test_id: 10, freelancer_id: 8, test_name: 'Vue.js Development', ai_score: 87, taken_on: '2024-03-01' },
            { test_id: 11, freelancer_id: 8, test_name: 'UI/UX Design', ai_score: 84, taken_on: '2024-03-03' },
            { test_id: 12, freelancer_id: 9, test_name: 'Docker & Kubernetes', ai_score: 90, taken_on: '2024-03-05' },
            { test_id: 13, freelancer_id: 9, test_name: 'AWS Cloud Services', ai_score: 89, taken_on: '2024-03-08' },
            { test_id: 14, freelancer_id: 10, test_name: 'Data Analysis', ai_score: 93, taken_on: '2024-03-10' },
            { test_id: 15, freelancer_id: 10, test_name: 'Machine Learning', ai_score: 91, taken_on: '2024-03-12' }
        ]
    },
    reducers: {
        addSkillTest: (state, action) => { state.list.push(action.payload); },
        updateSkillTest: (state, action) => {
            const i = state.list.findIndex(t => t.test_id === action.payload.test_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteSkillTest: (state, action) => { state.list = state.list.filter(t => t.test_id !== action.payload); }
    }
});
export const { addSkillTest, updateSkillTest, deleteSkillTest } = aiSkillTestSlice.actions;

// =====================================================
// 11. AI RECOMMENDATIONS
// =====================================================
export const aiRecommendationSlice = createSlice({
    name: 'aiRecommendations',
    initialState: {
        list: [
            { recommendation_id: 1, client_id: 1, freelancer_id: 1, match_score: 96, algorithm_version: 'v2.0', generated_at: '2024-02-18' },
            { recommendation_id: 2, client_id: 2, freelancer_id: 4, match_score: 92, algorithm_version: 'v2.0', generated_at: '2024-02-17' },
            { recommendation_id: 3, client_id: 4, freelancer_id: 5, match_score: 94, algorithm_version: 'v2.1', generated_at: '2024-03-06' },
            { recommendation_id: 4, client_id: 5, freelancer_id: 6, match_score: 91, algorithm_version: 'v2.1', generated_at: '2024-03-11' },
            { recommendation_id: 5, client_id: 6, freelancer_id: 7, match_score: 88, algorithm_version: 'v2.1', generated_at: '2024-03-16' },
            { recommendation_id: 6, client_id: 7, freelancer_id: 8, match_score: 90, algorithm_version: 'v2.1', generated_at: '2024-03-21' },
            { recommendation_id: 7, client_id: 8, freelancer_id: 9, match_score: 93, algorithm_version: 'v2.1', generated_at: '2024-03-26' },
            { recommendation_id: 8, client_id: 9, freelancer_id: 10, match_score: 95, algorithm_version: 'v2.1', generated_at: '2024-04-02' },
            { recommendation_id: 9, client_id: 4, freelancer_id: 5, match_score: 89, algorithm_version: 'v2.2', generated_at: '2024-04-07' },
            { recommendation_id: 10, client_id: 5, freelancer_id: 8, match_score: 87, algorithm_version: 'v2.2', generated_at: '2024-04-09' }
        ]
    },
    reducers: {
        addRecommendation: (state, action) => { state.list.push(action.payload); },
        updateRecommendation: (state, action) => {
            const i = state.list.findIndex(r => r.recommendation_id === action.payload.recommendation_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteRecommendation: (state, action) => { state.list = state.list.filter(r => r.recommendation_id !== action.payload); }
    }
});
export const { addRecommendation, updateRecommendation, deleteRecommendation } = aiRecommendationSlice.actions;

// =====================================================
// 12. ORDERS
// =====================================================
export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [
            { order_id: 1, client_id: 1, freelancer_id: 1, job_id: 1, offer_id: -1, start_date: '2024-02-06', delivery_date: '2024-02-12', status: 'completed', total_amount: 450 },
            { order_id: 2, client_id: 1, freelancer_id: 1, job_id: 3, offer_id: -1, start_date: '2024-02-19', delivery_date: '2024-02-28', status: 'in-progress', total_amount: 600 },
            { order_id: 3, client_id: 2, freelancer_id: 4, job_id: 2, offer_id: -1, start_date: '2024-02-20', delivery_date: '2024-02-25', status: 'pending', total_amount: 350 },
            { order_id: 4, client_id: 4, freelancer_id: 5, job_id: 4, offer_id: -1, start_date: '2024-03-07', delivery_date: '2024-03-21', status: 'completed', total_amount: 550 },
            { order_id: 5, client_id: 5, freelancer_id: 6, job_id: 5, offer_id: -1, start_date: '2024-03-12', delivery_date: '2024-04-02', status: 'completed', total_amount: 680 },
            { order_id: 6, client_id: 6, freelancer_id: 7, job_id: 6, offer_id: -1, start_date: '2024-03-17', delivery_date: '2024-03-24', status: 'completed', total_amount: 420 },
            { order_id: 7, client_id: 7, freelancer_id: 8, job_id: 7, offer_id: -1, start_date: '2024-03-22', delivery_date: '2024-04-01', status: 'completed', total_amount: 380 },
            { order_id: 8, client_id: 8, freelancer_id: 9, job_id: 8, offer_id: -1, start_date: '2024-03-27', delivery_date: '2024-04-10', status: 'completed', total_amount: 750 },
            { order_id: 9, client_id: 9, freelancer_id: 10, job_id: 9, offer_id: -1, start_date: '2024-04-03', delivery_date: '2024-04-15', status: 'completed', total_amount: 620 },
            { order_id: 10, client_id: 4, freelancer_id: 5, job_id: -1, offer_id: 3, start_date: '2024-04-08', delivery_date: '2024-04-23', status: 'in-progress', total_amount: 800 },
            { order_id: 11, client_id: 5, freelancer_id: 6, job_id: -1, offer_id: 4, start_date: '2024-04-10', delivery_date: '2024-04-30', status: 'in-progress', total_amount: 900 },
            { order_id: 12, client_id: 7, freelancer_id: 8, job_id: -1, offer_id: 6, start_date: '2024-04-12', delivery_date: '2024-04-22', status: 'pending', total_amount: 400 }
        ]
    },
    reducers: {
        addOrder: (state, action) => { state.list.push(action.payload); },
        updateOrder: (state, action) => {
            const i = state.list.findIndex(o => o.order_id === action.payload.order_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteOrder: (state, action) => { state.list = state.list.filter(o => o.order_id !== action.payload); },
        updateOrderStatus: (state, action) => { const o = state.list.find(o => o.order_id === action.payload.order_id); if (o) o.status = action.payload.status; }
    }
});
export const { addOrder, updateOrder, deleteOrder, updateOrderStatus } = ordersSlice.actions;

// =====================================================
// 13. PAYMENTS
// =====================================================
export const paymentsSlice = createSlice({
    name: 'payments',
    initialState: {
        list: [
            { payment_id: 1, order_id: 1, client_id: 1, freelancer_id: 1, amount: 450, method: 'credit_card', status: 'completed', transaction_date: '2024-02-12' },
            { payment_id: 2, order_id: 2, client_id: 1, freelancer_id: 1, amount: 600, method: 'paypal', status: 'pending', transaction_date: '2024-02-19' },
            { payment_id: 3, order_id: 4, client_id: 4, freelancer_id: 5, amount: 550, method: 'bank_transfer', status: 'completed', transaction_date: '2024-03-21' },
            { payment_id: 4, order_id: 5, client_id: 5, freelancer_id: 6, amount: 680, method: 'credit_card', status: 'completed', transaction_date: '2024-04-02' },
            { payment_id: 5, order_id: 6, client_id: 6, freelancer_id: 7, amount: 420, method: 'paypal', status: 'completed', transaction_date: '2024-03-24' },
            { payment_id: 6, order_id: 7, client_id: 7, freelancer_id: 8, amount: 380, method: 'bank_transfer', status: 'completed', transaction_date: '2024-04-01' },
            { payment_id: 7, order_id: 8, client_id: 8, freelancer_id: 9, amount: 750, method: 'credit_card', status: 'completed', transaction_date: '2024-04-10' },
            { payment_id: 8, order_id: 9, client_id: 9, freelancer_id: 10, amount: 620, method: 'paypal', status: 'completed', transaction_date: '2024-04-15' },
            { payment_id: 9, order_id: 10, client_id: 4, freelancer_id: 5, amount: 800, method: 'bank_transfer', status: 'pending', transaction_date: '2024-04-08' },
            { payment_id: 10, order_id: 11, client_id: 5, freelancer_id: 6, amount: 900, method: 'credit_card', status: 'pending', transaction_date: '2024-04-10' },
            { payment_id: 11, order_id: 12, client_id: 7, freelancer_id: 8, amount: 400, method: 'paypal', status: 'pending', transaction_date: '2024-04-12' }
        ]
    },
    reducers: {
        addPayment: (state, action) => { state.list.push(action.payload); },
        updatePayment: (state, action) => {
            const i = state.list.findIndex(p => p.payment_id === action.payload.payment_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deletePayment: (state, action) => { state.list = state.list.filter(p => p.payment_id !== action.payload); },
        updatePaymentStatus: (state, action) => { const p = state.list.find(p => p.payment_id === action.payload.payment_id); if (p) p.status = action.payload.status; }
    }
});
export const { addPayment, updatePayment, deletePayment, updatePaymentStatus } = paymentsSlice.actions;

// =====================================================
// 14. DISPUTES
// =====================================================
export const disputesSlice = createSlice({
    name: 'disputes',
    initialState: {
        list: [
            { dispute_id: 1, order_id: 1, raised_by: 'client', reason: 'Minor UI bug found', status: 'resolved', resolution_summary: 'Fixed in 2 hours' },
            { dispute_id: 2, order_id: 4, raised_by: 'freelancer', reason: 'Delay in payment', status: 'resolved', resolution_summary: 'Payment processed after verification' },
            { dispute_id: 3, order_id: 5, raised_by: 'client', reason: 'App crashes on certain devices', status: 'in-progress', resolution_summary: '' },
            { dispute_id: 4, order_id: 6, raised_by: 'freelancer', reason: 'Additional requirements added after project start', status: 'resolved', resolution_summary: 'Additional budget approved for extra work' },
            { dispute_id: 5, order_id: 7, raised_by: 'client', reason: 'Design does not match requirements', status: 'resolved', resolution_summary: 'Redesigned according to feedback' },
            { dispute_id: 6, order_id: 8, raised_by: 'freelancer', reason: 'Server access delayed', status: 'resolved', resolution_summary: 'Timeline extended by 3 days' },
            { dispute_id: 7, order_id: 9, raised_by: 'client', reason: 'Data visualization not loading correctly', status: 'in-progress', resolution_summary: '' },
            { dispute_id: 8, order_id: 10, raised_by: 'freelancer', reason: 'Unclear project requirements', status: 'pending', resolution_summary: '' }
        ]
    },
    reducers: {
        addDispute: (state, action) => { state.list.push(action.payload); },
        updateDispute: (state, action) => {
            const i = state.list.findIndex(d => d.dispute_id === action.payload.dispute_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteDispute: (state, action) => { state.list = state.list.filter(d => d.dispute_id !== action.payload); },
        updateDisputeStatus: (state, action) => { const d = state.list.find(d => d.dispute_id === action.payload.dispute_id); if (d) d.status = action.payload.status; },
        addResolution: (state, action) => { const d = state.list.find(d => d.dispute_id === action.payload.dispute_id); if (d) d.resolution_summary = action.payload.resolution; }
    }
});
export const { addDispute, updateDispute, deleteDispute, updateDisputeStatus, addResolution } = disputesSlice.actions;

// =====================================================
// 15. FEEDBACK
// =====================================================
export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        list: [
            { feedback_id: 1, order_id: 1, reviewer_id: 1, reviewed_user_id: 2, rating: 5, review_text: 'Outstanding work! Delivered early and exceeded expectations.', created_at: '2024-02-13' },
            { feedback_id: 2, order_id: 1, reviewer_id: 2, reviewed_user_id: 1, rating: 5, review_text: 'Great client! Clear requirements and fast payment.', created_at: '2024-02-13' },
            { feedback_id: 3, order_id: 4, reviewer_id: 9, reviewed_user_id: 8, rating: 4, review_text: 'Good work overall, but needed some minor revisions.', created_at: '2024-03-22' },
            { feedback_id: 4, order_id: 4, reviewer_id: 8, reviewed_user_id: 9, rating: 5, review_text: 'Excellent client with clear communication throughout the project.', created_at: '2024-03-22' },
            { feedback_id: 5, order_id: 5, reviewer_id: 12, reviewed_user_id: 11, rating: 5, review_text: 'Perfect mobile app development! Exactly what we needed.', created_at: '2024-04-03' },
            { feedback_id: 6, order_id: 5, reviewer_id: 11, reviewed_user_id: 12, rating: 5, review_text: 'Very responsive client with great feedback and timely payments.', created_at: '2024-04-03' },
            { feedback_id: 7, order_id: 6, reviewer_id: 14, reviewed_user_id: 13, rating: 4, review_text: 'Good API integration work, but took a bit longer than expected.', created_at: '2024-03-25' },
            { feedback_id: 8, order_id: 6, reviewer_id: 13, reviewed_user_id: 14, rating: 5, review_text: 'Professional client with clear requirements.', created_at: '2024-03-25' },
            { feedback_id: 9, order_id: 7, reviewer_id: 16, reviewed_user_id: 15, rating: 5, review_text: 'Amazing website redesign! Our conversion rate has already improved.', created_at: '2024-04-02' },
            { feedback_id: 10, order_id: 7, reviewer_id: 15, reviewed_user_id: 16, rating: 5, review_text: 'Wonderful client to work with. Appreciated the creative freedom.', created_at: '2024-04-02' },
            { feedback_id: 11, order_id: 8, reviewer_id: 18, reviewed_user_id: 17, rating: 4, review_text: 'Solid cloud infrastructure setup. Had some initial issues but resolved quickly.', created_at: '2024-04-11' },
            { feedback_id: 12, order_id: 8, reviewer_id: 17, reviewed_user_id: 18, rating: 5, review_text: 'Great client with technical knowledge which made communication easier.', created_at: '2024-04-11' },
            { feedback_id: 13, order_id: 9, reviewer_id: 20, reviewed_user_id: 19, rating: 5, review_text: 'Excellent data visualization dashboard! Very intuitive and powerful.', created_at: '2024-04-16' },
            { feedback_id: 14, order_id: 9, reviewer_id: 19, reviewed_user_id: 20, rating: 5, review_text: 'Perfect client with clear vision and prompt feedback.', created_at: '2024-04-16' }
        ]
    },
    reducers: {
        addFeedback: (state, action) => { state.list.push(action.payload); },
        updateFeedback: (state, action) => {
            const i = state.list.findIndex(f => f.feedback_id === action.payload.feedback_id);
            if (i !== -1) state.list[i] = { ...state.list[i], ...action.payload };
        },
        deleteFeedback: (state, action) => { state.list = state.list.filter(f => f.feedback_id !== action.payload); }
    }
});
export const { addFeedback, updateFeedback, deleteFeedback } = feedbackSlice.actions;

// =====================================================
// 16. CHAT
// =====================================================
export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        conversations: [
            {
                conversation_id: 1,
                participants: [1, 2],
                messages: [
                    { sender_id: 1, text: 'Hi Chander, when can you start?', sent_at: '2024-02-06T09:00:00' },
                    { sender_id: 2, text: 'I can start today!', sent_at: '2024-02-06T09:05:00' },
                    { sender_id: 1, text: 'Perfect! Access sent.', sent_at: '2024-02-06T09:10:00' }
                ]
            },
            {
                conversation_id: 2,
                participants: [9, 8],
                messages: [
                    { sender_id: 9, text: 'Ahmed, can you build an e-commerce platform for us?', sent_at: '2024-03-06T10:30:00' },
                    { sender_id: 8, text: 'Yes, I have extensive experience in building e-commerce platforms. What features do you need?', sent_at: '2024-03-06T10:45:00' },
                    { sender_id: 9, text: 'We need product catalog, shopping cart, payment integration, and user accounts.', sent_at: '2024-03-06T11:00:00' },
                    { sender_id: 8, text: 'That\'s all doable. I can deliver within 14 days.', sent_at: '2024-03-06T11:15:00' },
                    { sender_id: 9, text: 'Great! Let\'s proceed.', sent_at: '2024-03-06T11:30:00' }
                ]
            },
            {
                conversation_id: 3,
                participants: [12, 11],
                messages: [
                    { sender_id: 12, text: 'Muhammad, we need a cross-platform mobile app for our business.', sent_at: '2024-03-11T14:20:00' },
                    { sender_id: 11, text: 'I specialize in React Native and Flutter development. What kind of app do you need?', sent_at: '2024-03-11T14:35:00' },
                    { sender_id: 12, text: 'It\'s a service booking app with user profiles, booking system, and payment integration.', sent_at: '2024-03-11T14:50:00' },
                    { sender_id: 11, text: 'I can build that for you. It will take about 3 weeks.', sent_at: '2024-03-11T15:05:00' },
                    { sender_id: 12, text: 'That works for us. What\'s your rate?', sent_at: '2024-03-11T15:20:00' },
                    { sender_id: 11, text: 'My rate is $40/hour. The total project cost will be around $680.', sent_at: '2024-03-11T15:35:00' },
                    { sender_id: 12, text: 'That\'s acceptable. Let\'s start the project.', sent_at: '2024-03-11T15:50:00' }
                ]
            },
            {
                conversation_id: 4,
                participants: [14, 13],
                messages: [
                    { sender_id: 14, text: 'Hassan, we need help integrating some third-party APIs into our system.', sent_at: '2024-03-16T16:45:00' },
                    { sender_id: 13, text: 'I have experience with API integration. Which APIs do you need to integrate?', sent_at: '2024-03-16T17:00:00' },
                    { sender_id: 14, text: 'We need to integrate payment gateway, shipping service, and email service APIs.', sent_at: '2024-03-16T17:15:00' },
                    { sender_id: 13, text: 'I can help with that. I\'ll need access to your system and API documentation.', sent_at: '2024-03-16T17:30:00' },
                    { sender_id: 14, text: 'I\'ll send you the access details and documentation.', sent_at: '2024-03-16T17:45:00' }
                ]
            },
            {
                conversation_id: 5,
                participants: [16, 15],
                messages: [
                    { sender_id: 16, text: 'Bilal, we want to redesign our website with a modern UI.', sent_at: '2024-03-21T11:30:00' },
                    { sender_id: 15, text: 'I specialize in modern web design using Vue.js and Tailwind CSS. Can you share your current website?', sent_at: '2024-03-21T11:45:00' },
                    { sender_id: 16, text: 'Sure, here\'s the link: www.currentwebsite.com', sent_at: '2024-03-21T12:00:00' },
                    { sender_id: 15, text: 'I\'ve reviewed your website. I can completely redesign it with a modern UI/UX approach.', sent_at: '2024-03-21T12:15:00' },
                    { sender_id: 16, text: 'That sounds great. What\'s your timeline and cost?', sent_at: '2024-03-21T12:30:00' },
                    { sender_id: 15, text: 'I can complete the redesign in 10 days for $380.', sent_at: '2024-03-21T12:45:00' },
                    { sender_id: 16, text: 'Perfect! Let\'s proceed with the redesign.', sent_at: '2024-03-21T13:00:00' }
                ]
            },
            {
                conversation_id: 6,
                participants: [18, 17],
                messages: [
                    { sender_id: 18, text: 'Umar, we need to set up cloud infrastructure for our web application.', sent_at: '2024-03-26T18:50:00' },
                    { sender_id: 17, text: 'I have extensive experience in setting up cloud infrastructure with Docker and Kubernetes. What are your requirements?', sent_at: '2024-03-26T19:05:00' },
                    { sender_id: 18, text: 'We need a scalable infrastructure that can handle high traffic, with automated deployment and monitoring.', sent_at: '2024-03-26T19:20:00' },
                    { sender_id: 17, text: 'I can set up a complete cloud infrastructure using AWS with Docker containers, Kubernetes orchestration, and CI/CD pipeline.', sent_at: '2024-03-26T19:35:00' },
                    { sender_id: 18, text: 'That\'s exactly what we need. How long will it take?', sent_at: '2024-03-26T19:50:00' },
                    { sender_id: 17, text: 'It will take about 14 days to set up the complete infrastructure.', sent_at: '2024-03-26T20:05:00' },
                    { sender_id: 18, text: 'Great! Let\'s start the project.', sent_at: '2024-03-26T20:20:00' }
                ]
            },
            {
                conversation_id: 7,
                participants: [20, 19],
                messages: [
                    { sender_id: 20, text: 'Abdullah, we need an interactive dashboard for data visualization.', sent_at: '2024-04-02T15:25:00' },
                    { sender_id: 19, text: 'I specialize in data analysis and visualization using Python and TensorFlow. What kind of data do you want to visualize?', sent_at: '2024-04-02T15:40:00' },
                    { sender_id: 20, text: 'We have sales data, customer data, and product data that we want to visualize in an interactive dashboard.', sent_at: '2024-04-02T15:55:00' },
                    { sender_id: 19, text: 'I can create an interactive dashboard with multiple visualization types like charts, graphs, and maps.', sent_at: '2024-04-02T16:10:00' },
                    { sender_id: 20, text: 'That sounds perfect. What\'s your timeline and cost?', sent_at: '2024-04-02T16:25:00' },
                    { sender_id: 19, text: 'I can complete the dashboard in 12 days for $620.', sent_at: '2024-04-02T16:40:00' },
                    { sender_id: 20, text: 'That works for us. Let\'s proceed.', sent_at: '2024-04-02T16:55:00' }
                ]
            }
        ]
    },
    reducers: {
        addMessage: (state, action) => {
            const { conversation_id, message } = action.payload;
            const convo = state.conversations.find(c => c.conversation_id === conversation_id);
            if (convo) convo.messages.push(message);
        },
        addConversation: (state, action) => { state.conversations.push(action.payload); },
        setRole: (state, action) => { state.role = action.payload; }
    }
});
export const { addMessage, addConversation, setRole } = chatSlice.actions;

// =====================================================
// ALL REDUCERS EXPORT
// =====================================================
export const sliceReducers = {
    users: usersSlice.reducer,
    clients: clientsSlice.reducer,
    freelancers: freelancersSlice.reducer,
    admins: adminSlice.reducer,
    activityLog: activityLogSlice.reducer,
    notifications: notificationsSlice.reducer,
    jobs: jobsSlice.reducer,
    jobApplications: jobApplicationsSlice.reducer,
    openOffers: openOffersSlice.reducer,
    aiSkillTests: aiSkillTestSlice.reducer,
    aiRecommendations: aiRecommendationSlice.reducer,
    orders: ordersSlice.reducer,
    payments: paymentsSlice.reducer,
    disputes: disputesSlice.reducer,
    feedback: feedbackSlice.reducer,
    chat: chatSlice.reducer
};
export default sliceReducers;

// =====================================================
// ALL SELECTORS
// =====================================================
export const selectUsersList = state => state.users.list;
export const selectUserById = (state, userId) => state.users.list.find(u => u.user_id === userId) || null;
export const selectUsersByRole = (state, role) => state.users.list.filter(u => u.role === role);

export const selectClientsList = state => state.clients.list;
export const selectClientById = (state, clientId) => state.clients.list.find(c => c.client_id === clientId) || null;
export const selectClientByUserId = (state, userId) => state.clients.list.find(c => c.user_id === userId) || null;

export const selectFreelancersList = state => state.freelancers.list;
export const selectFreelancerById = (state, freelancerId) => state.freelancers.list.find(f => f.freelancer_id === freelancerId) || null;
export const selectFreelancerByUserId = (state, userId) => state.freelancers.list.find(f => f.user_id === userId) || null;

export const selectAdminsList = state => state.admins.list;
export const selectAdminById = (state, adminId) => state.admins.list.find(a => a.admin_id === adminId) || null;

export const selectActivityLogs = state => state.activityLog.list;
export const selectActivityLogsByUserId = (state, userId) => state.activityLog.list.filter(l => l.user_id === userId);

export const selectNotifications = state => state.notifications.list;
export const selectNotificationsByUserId = (state, userId) => state.notifications.list.filter(n => n.user_id === userId);
export const selectUnreadNotificationsByUserId = (state, userId) => state.notifications.list.filter(n => n.user_id === userId && !n.is_read);

export const selectJobs = state => state.jobs.list;
export const selectJobById = (state, jobId) => state.jobs.list.find(j => j.job_id === jobId) || null;
export const selectJobsByClientId = (state, clientId) => state.jobs.list.filter(j => j.client_id === clientId);
export const selectOpenJobs = state => state.jobs.list.filter(j => j.status === 'open');

export const selectJobApplications = state => state.jobApplications.list;
export const selectApplicationsByJobId = (state, jobId) => state.jobApplications.list.filter(a => a.job_id === jobId);
export const selectApplicationsByFreelancerId = (state, freelancerId) => state.jobApplications.list.filter(a => a.freelancer_id === freelancerId);

export const selectOpenOffers = state => state.openOffers.list;
export const selectOfferById = (state, offerId) => state.openOffers.list.find(o => o.offer_id === offerId) || null;
export const selectOffersByFreelancerId = (state, freelancerId) => state.openOffers.list.filter(o => o.freelancer_id === freelancerId);

export const selectAiSkillTests = state => state.aiSkillTests.list;
export const selectTestsByFreelancerId = (state, freelancerId) => state.aiSkillTests.list.filter(t => t.freelancer_id === freelancerId);

export const selectAiRecommendations = state => state.aiRecommendations.list;
export const selectRecommendationsByClientId = (state, clientId) => state.aiRecommendations.list.filter(r => r.client_id === clientId);

export const selectOrders = state => state.orders.list;
export const selectOrderById = (state, orderId) => state.orders.list.find(o => o.order_id === orderId) || null;
export const selectOrdersByClientId = (state, clientId) => state.orders.list.filter(o => o.client_id === clientId);
export const selectOrdersByFreelancerId = (state, freelancerId) => state.orders.list.filter(o => o.freelancer_id === freelancerId);
export const selectTotalEarningsByFreelancerId = (state, freelancerId) => {
    return state.orders.list
        .filter(o => o.freelancer_id === freelancerId && o.status === 'completed')
        .reduce((total, o) => total + o.total_amount, 0);
};
export const selectTotalSpendByClientId = (state, clientId) => {
    return state.orders.list
        .filter(o => o.client_id === clientId && o.status === 'completed')
        .reduce((total, o) => total + o.total_amount, 0);
}


export const selectPayments = state => state.payments.list;
export const selectPaymentsByOrderId = (state, orderId) => state.payments.list.filter(p => p.order_id === orderId);

export const selectDisputes = state => state.disputes.list;
export const selectDisputesByOrderId = (state, orderId) => state.disputes.list.filter(d => d.order_id === orderId);

export const selectFeedback = state => state.feedback.list;
export const selectFeedbackByOrderId = (state, orderId) => state.feedback.list.filter(f => f.order_id === orderId);
export const selectFeedbackForUser = (state, userId) => state.feedback.list.filter(f => f.reviewed_user_id === userId);
export const selectAverageRatingForUser = (state, userId) => {
    const feedback = state.feedback.list.filter(f => f.reviewed_user_id === userId);
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return Number((sum / feedback.length).toFixed(2));
};

export const selectConversations = state => state.chat.conversations;
export const selectConversationById = (state, id) => state.chat.conversations.find(c => c.conversation_id === id);