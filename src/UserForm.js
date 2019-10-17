import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {

  //======SET STATE OF DATA TO USE IN POSTING/GETTING (see POST code below)===========
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    if (status) {
    setAttendees([...attendees, status]);
    }
  }, [status])
  //======END SET STATE OF DATA TO USE IN POSTING/GETTING===========

  return (
    <div className="userForm">
      <Form >
      <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="text" name="name" placeholder="Full Name"/>
        </div>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>} 
          <Field type="email" name="email" placeholder="Email"/>
        </div>
        <div>
          {touched.password && errors.password &&<p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Create Password"/>
        </div>
        <div>
            <Field component="select" name="role">
                <option value="select">Select</option>
                <option value="camper">Camper</option>
                <option value="parent">Parent</option>
                <option value="camp leader">Camp Leader</option>
                <option value="school coach">School Coach</option>
            </Field> 
        </div>
        <div>
            <label htmlFor="tos" />
            Accept Terms of Service:
            <Field type="checkbox" name="tos" id="tos" checked={values.tos} />
        </div>
        <button type="submit">Submit!</button>
      </Form>
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
        .required("Name is required."),
    email: Yup.string()
        .email("Email not valid.")
        .required("Email is required."),
    password: Yup.string()
        .min(6, "Password must be 6 characters or longer.")
        .required("Password is required.")
}),
//======END VALIDATION SCHEMA==========

//======POST REQUEST (see how status is set above)==========
handleSubmit(values, {setStatus} ) {
  console.log('values', values);
  axios .get("https://google.com")
        .then(response => {
          setStatus(response.data);
          console.log(response)
        })
        .catch(error => console.log(error.response))
}
//======END POST REQUEST==========

//======RENDER DATA TO SCREEN===========
// {attendees.map((attendee, index) => {
//   return (
//     <div className="user-display" key={index}>
//       <h1>Your Submission</h1>
//       <p>{attendee.name} </p>
//       <p>{attendee.email}</p>
//       <p>{attendee.name}</p>
//       <p>{attendee.name}</p>
//       <p>{attendee.name}</p>
//     </div>
//   )
// })}

//======END RENDER DATA TO SCREEN===========

})(UserForm);

export default FormikUserForm;