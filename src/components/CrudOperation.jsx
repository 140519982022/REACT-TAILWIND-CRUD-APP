import axios, { toFormData } from 'axios';
import React, { useEffect, useState } from 'react'

export default function CrudOperation() {

    const [formData,setFormData] = useState({

        name:'',
        email :'',
        mobile:'',
        password:''

    });
  let [allUser,selAlluser]=useState([])


    let formDataStore = (event) => {
        

        let inputName = event.target.name;
        let inputValue = event.target.value;

        // console.log(inputName);
        // console.log(inputValue);

        let object = {...formData};

        object[inputName] = inputValue;

        setFormData(object);

    }

    let saveFomeData = (event) => {

        event.preventDefault();
        // console.log(formData);
        axios.post(`https://wscubetech.co/form-api/save_user.php`,toFormData(formData))
        .then((response) =>{

            console.log(response.data);
            getAllDetails()
            setFormData(
            {name:'',
        email:'',
        mobile:'',
        password:''})
        })



    }

    let getAllDetails=()=>{
        axios.get(`https://wscubetech.co/form-api/view_user.php`)
        .then((res)=>{
           return res.data
        })
        .then((finalRes)=>{
            selAlluser(finalRes.dataList)
         })
     }

    useEffect(()=>{
        getAllDetails()
     },[])

    return (
        <>
            <div className='max-w-[1320px] mx-auto bg-red-200 '>
                <div class="flex justify-center items-center h-screen w-full bg-blue-400">
                    <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                        <form onSubmit={saveFomeData}>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-gray-900" for="name">Name</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="name" value={formData.name} onChange={formDataStore}/>
                            </div>

                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-gray-900" for="email">Email</label>
                                <input class="border py-2 px-3 text-grey-800" type="email" name="email" value={formData.email} onChange={formDataStore}/>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-gray-900" for="mobile">Mobile</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="mobile" value={formData.mobile} onChange={formDataStore}/>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label class="mb-2 font-bold text-lg text-gray-900" for="password">Password</label>
                                <input class="border py-2 px-3 text-grey-800" type="text" name="password" value={formData.password} onChange={formDataStore}/>
                            </div>
                            <button class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Submit</button>
                        </form>
                        <a class="block w-full text-center no-underline mt-4 text-sm text-gray-700 hover:text-gray-900" href="/login">Already have an account?</a>
                    </div>
                </div>

                <table className="min-w-full leading-normal">
      <thead className='text-center'>
        <tr>
        <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Sr No.
          </th>
          <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Name
          </th>
         
          <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Phone
          </th>
          <th
            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            password
          </th>
          
        </tr>
      </thead>
      <tbody>
            {allUser.length>=1
                ?
                allUser.map((user,index)=>{
                    return(
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                               {index+1}
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                {user.en_name}
                            </th>
                           
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                {user.en_email}
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                {user.en_contact}
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                {user.en_password}
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
