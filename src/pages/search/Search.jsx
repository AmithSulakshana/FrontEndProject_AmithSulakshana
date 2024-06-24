import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdCancel } from "react-icons/md";
import UserCard from '../../sharedComponent/userCard/UserCard'

const Search = () => {
    const searchQuery = localStorage.getItem("search")
    const[data,setData] = useState()
    const[loading,setLoading] = useState(true)
    const [displayUp,setDisplayUp] = useState(false);
    const[updateId,setUpdateId] = useState()
    const [selectedUser, setSelectedUser] = useState(null);

    const initialValues = {
      userName: "",
      userEmail: "",
      userPhone: "",
      gender: "",
      imageUrl:""
    };

    const validationSchema = Yup.object().shape({
      userName: Yup.string().required("userName is required"),
      userEmail: Yup.string().required("Password is required"),
      userPhone: Yup.string().required("Password is required"),
    });
  
    const inputField = [
      { name: "userName", label: "User Name", placeholder: "Enter User Name" },
      { name: "userEmail", label: "User Email", placeholder: "Enter Email" },
      { name: "userPhone",label: "User Phone",placeholder: "Enter Phone number"},
      { name: "imageUrl",label: "Image Url",placeholder: "Image Url"},
         
    ];

    useEffect(() => {
        axios.get("http://localhost:3000/allUsers").then((res) => {
          setData(res.data);
          setLoading(false);
        });
      }, []);

      const handleUpdate = (val) =>{
        setSelectedUser(val)
        setUpdateId(val.id)
        setDisplayUp(!displayUp)
    
      }    

      const handleFormUpdate = (values, { resetForm }) =>{
        axios.put(`http://localhost:3000/allUsers/${updateId}`,
          {
            name: values.userName,
            email: values.userEmail,
            phone: values.userPhone,
            gender: values.gender,
            imageUrl:values.imageUrl
          }
        ).then((res)=>{
          const updatedUser = res.data;
          setData(data.map(user => (user.id === updateId ? updatedUser : user)));
          setDisplayUp(false);
          resetForm();
            
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }

      const handleDelete = (id) =>{
        const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (confirmed) {
        axios.delete(`http://localhost:3000/allUsers/${id}`)
          .then((res) => {
            setData(data.filter(user => user.id !== id));
          })
          .catch(error => {
            console.error("Error deleting user:", error);
          });
      }
      }

      const filteredData = data?.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if(loading){
        return <div>Loading...</div>
      }
  return (
    <div className='searchpage-main'>
        {
            filteredData?.map((val,index)=>(
                <UserCard
                key={index}
                userName={val.name}
                email={val.email}
                phone={val.phone}
                gender={val.gender}
                imageUrl={val.imageUrl}
                click={() => handleDelete(val.id)}
                update={() => handleUpdate(val)}
                />
            ))
        }

{displayUp && (
        <div className="add-user-topup">
          <Formik
            initialValues={{
              userName: selectedUser.name || "",
              userEmail: selectedUser.email || "",
              userPhone: selectedUser.phone || "",
              gender: selectedUser.gender || "",
              imageUrl:selectedUser.imageUrl || ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormUpdate}
          >
            {({ getFieldProps, errors, touched }) => (
              <Form className="logging-form">
                <div className="form-cancel"><MdCancel style={{cursor:"pointer"}} onClick={()=>setDisplayUp(false)}/></div>
                {inputField.map((val, index) => (
                  <div key={index} className="form-div">
                    <label className="logging-label1">{val.label}</label>
                    <Field
                      {...getFieldProps(val.name)}
                      type="text"
                      placeholder={val.placeholder}
                      className={
                        errors[val.name] && touched[val.name]
                          ? "error"
                          : "error2"
                      }
                    ></Field>
                    <ErrorMessage
                      name={val.name}
                      component="div"
                      className="error1"
                    />
                  </div>
                ))}

                <div className="form-div">
                  <label className="logging-label1">Gender:</label>
                  <Field
                    as="select"
                    {...getFieldProps("gender")}
                    type="text"
                    className={
                      errors.gender && touched.gender ? "error" : "error2"
                    }
                  >
                    <option value="" label="Select gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error1"
                  />
                </div>

                <button type="submit" className="logging-button">
                   UPDATE
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  )
}

export default Search
