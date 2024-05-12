import axios, { toFormData } from 'axios';
import React, { useEffect, useState } from 'react'

export default function CrudOperation() {

    const [formData, setFormData] = useState({

        name: '',
        email: '',
        mobile: '',
        password: ''

    });
    let [allUser, selAlluser] = useState([])


    let formDataStore = (event) => {


        let inputName = event.target.name;
        let inputValue = event.target.value;

        // console.log(inputName);
        // console.log(inputValue);

        let object = { ...formData };

        object[inputName] = inputValue;

        setFormData(object);

    }

    let saveFomeData = (event) => {

        event.preventDefault();
        // console.log(formData);
        axios.post(`https://wscubetech.co/form-api/save_user.php`, toFormData(formData))
            .then((response) => {

                // console.log(response.data);
                getAllDetails()
                setFormData(
                    {
                        name: '',
                        email: '',
                        mobile: '',
                        password: ''
                    })


                // Scroll to the last record in the table
                const table = document.getElementById('userTable');
                if (table) {
                    const lastRow = table.rows[table.rows.length - 1];
                    lastRow.scrollIntoView({ behavior: "smooth" });
                }

            })



    }

    let getAllDetails = () => {
        axios.get(`https://wscubetech.co/form-api/view_user.php`)
            .then((res) => {
                return res.data
            })
            .then((finalRes) => {
                // console.log(finalRes.dataList)
                selAlluser(finalRes.dataList)
            })
    }

    useEffect(() => {
        getAllDetails()
    }, [])


    let deleteUser = (deleteUserId) => {
        // alert(deleteUserId);

        axios.get(`https://wscubetech.co/form-api/delete_user.php?enid=${deleteUserId}`)
            .then((response) => {
                getAllDetails()
            })

    }

    let editUserDetails = (editUserId) => {
        // alert(editUserId)

        // edit user by calling edit-user-API
        axios.get(`https://wscubetech.co/form-api/view_user.php?editId=${editUserId}`)
            .then((response) => {
                console.log(response.data.dataList)

                setFormData(
                    {
                        name: response.data.dataList.en_name,
                        email: response.data.dataList.en_email,
                        mobile: response.data.dataList.en_contact,
                        password: response.data.dataList.en_password,
                        id: response.data.dataList.en_id

                    })

            })

        // edit manually
        // axios.get(`https://wscubetech.co/form-api/view_user.php`)
        //     .then((response) => {
        //         // console.log(response.data)
        //         return response.data
        //     })
        //     .then((finalRes) => {

        //         console.log(finalRes.dataList)

        //         let finalUseData = finalRes.dataList.filter((users) => users.en_id == editUserId)
        //         // console.log(finalUseData) // give this given id all data in object of array form
        //         // console.log(finalUseData[0]) // give perticular ids object
        //         let finalResult = finalUseData[0]

        //         setFormData(
        //             {
        //                 name: finalResult.en_name,
        //                 email: finalResult.en_email,
        //                 mobile: finalResult.en_contact,
        //                 password: finalResult.en_password,
        //                 id: finalResult.en_id

        //             })

        //     })
    }

    return (
        <>
            <div className='max-w-[1320px] mx-auto bg-white-200 '>

            <h1 className='my-5 text-center font-bold text-[25px] text-red-500'>CRUD OPERATION</h1>
                <div class="flex justify-center items-center h-screen w-full bg-blue-400">

                    <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                        <form onSubmit={saveFomeData}>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-black-900" for="name">Name</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="name" value={formData.name} onChange={formDataStore} />
                            </div>

                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-black-900" for="email">Email</label>
                                <input class="border py-2 px-3 text-grey-800" type="email" name="email" value={formData.email} onChange={formDataStore} />
                            </div>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-black-900" for="mobile">Mobile</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="mobile" value={formData.mobile} onChange={formDataStore} />
                            </div>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-black-900" for="password">Password</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="password" value={formData.password} onChange={formDataStore} />
                            </div>
                            <input class="block bg-teal-400 hover:bg-teal-600 uppercase text-lg mx-auto p-4 rounded text-dark-900" type="submit" value={formData.id === undefined ? 'Save' : 'Update'} />
                        </form>
                    </div>
                </div>

                <h1 className='my-5 text-center font-bold text-[25px]'>View All User Details</h1>

                <table className="min-w-full leading-normal my-5 border" id="userTable">
                    <thead className='text-center'>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                Sr No.
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                Name
                            </th>

                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                Phone
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                password
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-bold text-black-700 uppercase tracking-wider"
                            >
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {allUser.length >= 1
                            ?
                            allUser.map((user, index) => {
                                return (
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            {index + 1}
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            {user.en_name}
                                        </th>

                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            {user.en_email}
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            {user.en_contact}
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            {user.en_password}
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-dark-700 tracking-wider"
                                        >
                                            <button className='bg-red-500 p-2 rounded-lg text-white' onClick={() => deleteUser(user.en_id)}>Delete</button>

                                            <button className='bg-green-400 p-2 rounded-lg text-white ms-4 px-4' onClick={() => editUserDetails(user.en_id)}>Edit</button>
                                        </th>

                                    </tr>
                                )
                            })

                            :
                            <tr>
                                <td colSpan={6}> No Data Found </td>
                            </tr>

                        }


                    </tbody>
                </table>

            </div>





        </>
    )
}
