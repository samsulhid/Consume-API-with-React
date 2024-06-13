import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard() {
    const [profile, setProfile] = useState([]);
    const [stuffs, setStuffs] = useState([]);
    const [lendings, setLendings] = useState([]);
    const [users, setUsers] = useState([]);
    const [checkProses, setCheckProses] = useState(false);
    const [lendingGrouped, setLendingGrouped] = useState([]);
    const [selectedStuffId, setSelectedStuffId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            console.log(res);
            setIsLogin(true);
            setAuthUser(res.data.data);
            if (location.pathname === '/login') {
                navigate('/profile');
            }
        })
        .catch(err => {
            setIsLogin(false);
            if (err.response && err.response.status === 401 && location.pathname !== '/login' && location.pathname !== '/') {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
        getDataStuffs();
        getDataUsers();
        getDataLendings();
        getDataProfiles();
    }, [checkProses, selectedStuffId]);

    function getDataProfiles() {
        axios.get('http://localhost:8000/profile', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setProfile(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));            
            }
            })
    }
    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/user', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                setUsers(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }

    function getDataLendings() {
        axios.get('http://localhost:8000/lendings', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(res => {
                let data = res.data.data;

                // Filter lendings based on selectedStuffId if it's selected
                if (selectedStuffId) {
                    data = data.filter(entry => entry.stuff_id === selectedStuffId);
                }

                setLendings(data);

                const groupedData = {};
                data.forEach((entry) => {
                    const date = new Date(entry.date_time);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    if (!groupedData[formattedDate]) {
                        groupedData[formattedDate] = [];
                    }
                    groupedData[formattedDate].push(entry);
                });

                const processedData = Object.keys(groupedData).map((date) => ({
                    date,
                    totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
                }));

                setLendingGrouped(processedData);
                setCheckProses(true);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
    }

    const handleStuffChange = (event) => {
        setSelectedStuffId(event.target.value);
        setCheckProses(false); // To re-trigger the effect and data fetching
    };

    return (
        <Case>
            <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-full">
                    <div className="mb-4">
                        <label className="block text-white dark:text-white text-lg font-medium mb-2">Filter by Stuff</label>
                        <select
                            className="form-select mt-1 block w-full dark:bg-gray-800 dark:text-white bg-teal-400 text-white"
                            value={selectedStuffId}
                            onChange={handleStuffChange}
                        >
                            <option value="">Select Stuff</option>
                            {stuffs.map(stuff => (
                                <option key={stuff.name} value={stuff.name}>
                                    {stuff.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
              
                    {/* <span className="text-sm text-gray-500 dark:text-gray-400">{profile.username}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span> */}
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>
                
                {
                    isLogin && authUser.role === 'admin' && (
                        <div className="p-4 w-1/2">
                            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div
                                        className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                                </div>
                                <div className="flex flex-col justify-between flex-grow">
                                    <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Lending</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{lendings.length}</h1>
                        </div>
                    </div>
                </div>


                {checkProses ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={lendingGrouped} margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"
                                    tickFormatter={(date) => {
                                        const [day, month, year] = date.split('-');
                                        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                                        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
                                      }}
                             />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalStuff" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : ''}
            </div>
        </Case>
    )
}
