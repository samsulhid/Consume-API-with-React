import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";


export default function Stuff() {

    const [stuffs, setStuffs] = useState([])

    const navigate = useNavigate()

    const [error, setError] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    useEffect(() => {
        instance.get('stuff', {
            headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setStuffs(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'))
            }
        })
    }, [navigate])


    // const deleteStuff = (id) => {
    //     Swal.fire({
    //         title: 'Do you want to save the changes?',
    //         showDenyButton: true,
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes',
    //         denyButtonText: 'No',
    //         customClass: {
    //           actions: 'my-actions',
    //           cancelButton: 'order-1 right-gap',
    //           confirmButton: 'order-2',
    //           denyButton: 'order-3',
    //         },
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire('Saved!', '', 'success')
    //         } else if (result.isDenied) {
    //           Swal.fire('Changes are not saved', '', 'info')
    //         }
    //       })
    //         .then(res => {
    //             setStuffs(stuffs.filter(stuff => stuff.id !== id));
    //         })
    //         .catch(err => {
    //             setError(err.response.data);
    //         });
    //     };
    

    const deleteStuff = (id) => {
        instance.delete(`stuff/${id}`)
        .then(res => {
            
    Swal.fire({
        title: 'Berhasil hapus data',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
      })
            setStuffs(stuffs.filter(stuff => stuff.id !== id));
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
                        <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Tambah
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
                        <Link to='trash' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                            Trash
                            <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                        </Link>
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
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    {/* <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Available</th>
                                    <th scope="col" className="px-6 py-4">Defect</th> */}
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuffs.map((stuff, id) => (
                                    <tr key={stuff.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                        {/* <td className="whitespace-nowrap px-6 py-4">{stuff.stock ? stuff.stock.total_available : '0'}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.stock ? stuff.stock.total_defec : '0'}</td> */}
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
                                            <Link to={'/stuff/edit/' + stuff.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</Link>
                                            <button type="button" onClick={() => deleteStuff(stuff.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>    
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