import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StuffCreate() {
    const [forms, setForms] =useState({
        stuff_id: null,
        total_available: '',
        total_defec: ''
    })

    const [ error, setError] = useState([])
    const [ stuffs, setStuffs] = useState({})

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:  {
            'Authorization': ' Bearer' + localStorage.getItem('token'),
        }
    })

    useEffect(() => {
        axios.get('http://localhost:8000/stuff', {
            headers:  {
                'Authorization': ' Bearer' + localStorage.getItem('token'),
        }
    })
        .then(res => {
            setStuffs(res.data.data);
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }, []);

    const handleCreateStock = (event) => {
        event.preventDefault();

        instance.post('/StuffStock/create', forms)
        .then(res => {
            navigate('/stock');
        })
        .catch(err => {
            setError(err.response.data.data)
            console.log(err.response)
        })
    }
    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {/* <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Gagal!
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                    <form onSubmit={handleCreateStock} class="max-w-sm mx-auto">
                        <div class="mb-5">
                            <label for="stuff_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Stuff</label>
                            <select id="stuff"  name="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={e => setForms({...forms, stuff_id: e.target.value})}>
                                <option hidden disabled selected>Select Stuff</option>
                                {
                                    Object.entries(stuffs).map(([index, item]) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div class="sm:col-span-2">
                        <label for="total_available" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Available</label>
                            <input type="number" name="total_available" id="total_available" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required onChange={e => setForms({...forms, total_available: e.target.value})} />
                        </div>
                        <div class="sm:col-span-2">
                        <label for="total_defec" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Defec</label>
                            <input type="number" name="total_defec" id="total_defec" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required onChange={e => setForms({...forms, total_defec: e.target.value})} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    )
}