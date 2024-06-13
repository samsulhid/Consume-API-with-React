import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";


export default function Stock() {

    const [stocks, setStocks] = useState([])

    const navigate = useNavigate()

    const [error, setError] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    useEffect(() => {
        instance.get('/StuffStock/trash', {
            headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setStocks(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
            }
        })
    }, [navigate])
    
    const deleteStock = (id) => {
        instance.delete(`/StuffStock/permanent/${id}`)
        .then(res => {
            setStocks(stocks.filter(stuff => stuff.id !== id));
        })
        .catch(err => {
            setError(err.response.data);
        });
    };

    const deleteAllStock = () => {
        instance.delete(`/StuffStock/permanent`)
        .then(res => {
            location.reload()
        })
        .catch(err => {
            setError(err.response.data);
        });
    };

    const restoreStock = (id) => {
        instance.put(`/StuffStock/restore/${id}`)
        .then(res => {
            setStocks(stocks.filter(stock => stock.id !== id));
        })
        .catch(err => {
            setError(err.response.data);
        });
    };

    const restoreAllStock = () => {
        instance.put(`/StuffStock/restore`)
        .then(res => {
            location.reload()
        })
        .catch(err => {
            setError(err.response.data);
        });
    };

    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                        <button type="button" onClick={() => restoreAllStock()} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Restore</button>    
                        <button type="button" onClick={() => deleteAllStock()} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>    
                    </div>
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                            // Object.entries(error).map(([key, value], i) => (
                                                // <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            // ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex mt-4 md:mt-6">
                    <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    {/* <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th> */}
                                    <th scope="col" className="px-6 py-4">Available</th>
                                    <th scope="col" className="px-6 py-4">Defect</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((stock, id) => (
                                    <tr key={stock.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        {/* <td className="whitespace-nowrap px-6 py-4">{stock.stuff ? stock.stuff.name : ''}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stock.stuff ? stock.stuff.category : ''}</td> */}
                                        <td className="whitespace-nowrap px-6 py-4">{stock.total_available}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stock.total_defec}</td>
                                        {/* {
                                            stuff.stock ? (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Total Available: {stuff.stock.total_available} <br />
                                                    Total Defect: {stuff.stock.total_defect} <br />
                                                </td>
                                            ) : (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Stock Belum Ditambahkan
                                                </td>
                                            )
                                        } */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                        <button type="button" onClick={() => restoreStock(stock.id)} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Restore</button>    
                                            <button type="button" onClick={() => deleteStock(stock.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    )
}