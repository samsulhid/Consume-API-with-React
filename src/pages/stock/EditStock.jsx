import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function StockEdit() {
    const params = useParams();
    const id = params.id;

    const [stuffs, setStuffs] = useState([]);
    const [stock, setStock] = useState({
        stuff_id: '',
        total_available: '',
        total_defec: ''
    });
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });

    useEffect(() => {
        getDataStuffs();
        getDataStock();
    }, []);

    function getDataStuffs() {
        instance.get(`/stuff`)
        .then(res => {
            setStuffs(res.data.data);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function getDataStock() {
        instance.get(`/StuffStock/${id}`)
        .then(res => {
            setStock(res.data.data);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleEditStock = (event) => {
        event.preventDefault();

        instance.patch(`/StuffStock/${id}`, stock)
        .then(res => {
            navigate('/stock');
        })
        .catch(err => {
            setError(err.response.data);
            console.log(err.response);
        });
    };

    // Get the name of the stuff based on the stuff_id
    const stuffName = stuffs.find(item => item.id === stock.stuff_id)?.name || 'Loading...';

    return (
        <Case name='Stock Edit'>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {Object.keys(error).length > 0 ? (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {Object.entries(error).map(([key, value], i) => (
                                        <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : ''}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stock</h5>
                    </div>
                    <form onSubmit={handleEditStock} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="stuff_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Stuff</label>
                            <p id="stuff_name" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {stuffName}
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="total_available" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Available</label>
                            <input
                                type="number"
                                name="total_available"
                                id="total_available"
                                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={stock.total_available}
                                onChange={e => setStock({ ...stock, total_available: e.target.value })}
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="total_defec" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Defec</label>
                            <input
                                type="number"
                                name="total_defec"
                                id="total_defec"
                                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={stock.total_defec}
                                onChange={e => setStock({ ...stock, total_defec: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
