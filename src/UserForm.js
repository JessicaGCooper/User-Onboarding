import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {

  //======SET STATE OF DATA TO USE IN POSTING/GETTING (see POST code below)===========
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
    setUsers([...users, status]);
    }
  }, [status])
  //======END SET STATE OF DATA TO USE IN POSTING/GETTING===========

  return (
    <div className="userForm">
      <Form >
        <h2>Registration Form</h2>
        <div>
          {touched.name && errors.name && <p className="warning">{errors.name}</p>}
          <Field type="text" name="name" placeholder="Full Name" size="45"/>
        </div>
        <div>
          {touched.email && errors.email && <p className="warning">{errors.email}</p>} 
          <Field type="email" name="email" placeholder="Email" size="45"/>
        </div>
        <div>
          {touched.password && errors.password &&<p className="warning">{errors.password}</p>}
          <Field type="password" name="password" placeholder="Create Password" size="45"/>
        </div>
        <div className="selectRoleContainer">
            {touched.role && errors.role &&<p className="warning">{errors.role}</p>}
            <div className="selectRole">
              <label htmlFor="role">
                <p>Please select the type of user:</p>
              </label>
              <Field component="select" name="role">
                  <option value="Select">Select</option>
                  <option value="Camper">Camper</option>
                  <option value="Parent">Parent</option>
                  <option value="Camp Leader">Camp Leader</option>
                  <option value="School Coach">School Coach</option>
              </Field>
            </div> 
        </div>
        <div className="checkboxContainer">
            {touched.tos && errors.tos &&<p className="warning">{errors.tos}</p>}
            <div className="checkbox">
              <label htmlFor="tos">
                <p>Accept Terms of Service:</p>
              </label>
              <div className="box">
              <Field type="checkbox" name="tos" id="tos" checked={values.tos} />
            </div>
            </div>
        </div>
        <button type="submit">Submit</button>
      </Form>

      {/* ======RENDER DATA TO SCREEN=========== */}
      {users.map((user, index) => {
        return (
          <div className="user-display" key={index}>
            <h2>Your Submission</h2>
            <p>Name: {user.name} </p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Role: {user.role}</p>
          </div>
        )
      })}
      {/* ======END RENDER DATA TO SCREEN=========== */}
      
    </div>
  );
}

const FormikUserForm = withFormik({

mapPropsToValues({ name, email, password, role, tos }) {
    return {
        name: name || "",
        email: email || "",
        password: password || "",
        role: role || "",
        tos: tos || false,
    };
},

//======VALIDATION SCHEMA==========
validationSchema: Yup.object().shape({
    name: Yup.string()
        .min(2, "You must enter 2 or more letters!")
        .required("Name is required!"),
    email: Yup.string()
        .email("Email not valid.")
        .required("Email is required!"),
    password: Yup.string()
        .min(6, "Password must be 6 characters or longer!")
        .required("Password is required!"),
    role: Yup.string()
        .oneOf(["Camper", "Parent", "Camp Leader", "School Coach"])
        .required("Make a Selection!"),
    tos: Yup.boolean()
        .oneOf([true], "You must agree to our Terms of Service!")
          
}),
//======END VALIDATION SCHEMA==========

//======POST REQUEST (see how status is set above)==========
handleSubmit(values, {setStatus} ) {
  console.log('values', values);
  axios .post("https://reqres.in/api/users", values)
        .then(response => {
          setStatus(response.data);
          console.log(response)
        })
        .catch(error => console.log(error.response))
},
//======END POST REQUEST==========

// handleSubmit(values, {resetForm} ) {
//   console.log('values', values);
//   resetForm();
// }

})(UserForm);

export default FormikUserForm;