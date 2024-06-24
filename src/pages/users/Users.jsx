import React, { useEffect, useState } from "react";
import UserCard from "../../sharedComponent/userCard/UserCard";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import Pagination from '@mui/material/Pagination';

const Users = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);
  const [displayUp,setDisplayUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const[updateId,setUpdateId] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const user = useSelector((store) => store.userSlice);


  const inputField = [
    { name: "userName", label: "User Name", placeholder: "Enter User Name" },
    { name: "userEmail", label: "User Email", placeholder: "Enter Email" },
    { name: "userPhone",label: "User Phone",placeholder: "Enter Phone number"},
    { name: "imageUrl",label: "Image Url",placeholder: "Image Url"},
       
  ];

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

  useEffect(() => {
    axios.get("http://localhost:3000/allUsers").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const handleAddUser = () => {
    setDisplay(!display);
  };

  const handleFormSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3000/allUsers", {
        name: values.userName,
        email: values.userEmail,
        phone: values.userPhone,
        gender: values.gender,
        imageUrl:values.imageUrl
      })
      .then((response) => {
        setData([...data, response.data]);
        setDisplay(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
    
  };

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div className="users-main">
      {user.userRole === "admin" && (
        <div className="add-user">
          <button onClick={handleAddUser} className="add-user-btn">
            Add User
          </button>
        </div>
      )}

      <div className="users-all">
      {paginatedData.map((val) => (
          <UserCard
            key={val.id}
            userName={val.name}
            email={val.email}
            phone={val.phone}
            gender={val.gender}
            imageUrl={val.imageUrl}
            click={() => handleDelete(val.id)}
            update={() => handleUpdate(val)}
          />
        ))}
      </div>

      <div className="pagination-div">
      <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="primary" />
      </div>

      {display && (
        <div className="add-user-topup">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ getFieldProps, errors, touched }) => (
              <Form className="logging-form">
                <div className="form-cancel"><MdCancel style={{cursor:"pointer"}} onClick={()=>setDisplay(false)}/></div>
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
                    <option value="Male" label="Male" />
                    <option value="Female" label="Female" />
                    <option value="Other" label="Other" />
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error1"
                  />
                </div>

                <button type="submit" className="logging-button">
                  ADD USER
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

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
  );
};

export default Users;
