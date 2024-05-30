import React, { useEffect, useState } from "react";
import { Label } from "../components/label";
import { Input } from "components/input";
import ShareAuthenPage from "./ShareAuthenPage";
import {useForm} from 'react-hook-form'
import Field from "components/field/Field";
import { Button } from "components/button";
import {NavLink, useNavigate} from 'react-router-dom'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, updateCurrentUser, updateProfile} from 'firebase/auth'
import { auth, db } from "firebase-app/firebase-config";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import InputTogglePassword from "components/input/InputTogglePassword";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";



const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup.string().email("Please enter your email address").required("Please enter your email address"),
  password: yup.string().min(8, "Your password must be at least 8 characters or greater").required("Please enter your password")
})

const SignUpPage = () => {
  const navigate = useNavigate();
  const {control, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {displayName: values.fullname, photoURL:"https://images.unsplash.com/photo-1712926362714-97ab56bd078a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"});
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname, email: values.email, password: values.password, username: slugify(values.fullname, {lower: true}),
      avatar:"https://images.unsplash.com/photo-1712926362714-97ab56bd078a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    toast.success('Register successfully!');
    navigate("/");

  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if ( arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {pauseOnHover: false, delay: 0})
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page"
  }, [])
  return (
    <div>
      <ShareAuthenPage>
          <form className="form" onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
            <Field>
              <Label htmlFor="fullname" >
                Fullname
              </Label>
              <Input
              name="fullname"
                type="text"
                placeholder="Enter your fullname"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="email" >
                Email address
              </Label>
              <Input
              name="email"
                type="email"
                placeholder="Enter your email"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor="password" >
                Password
              </Label>
              <InputTogglePassword control={control}></InputTogglePassword>
            </Field>
            <div className="have-account">You already have an account? <NavLink to={"/sign-in"}>Log in</NavLink></div>
            <Button type="submit" kind='primary' style={{width: '100%',maxWidth: 300, margin: "0 auto"}} isLoading={isSubmitting} disabled ={isSubmitting  }>Sign Up</Button>
          </form>
      </ShareAuthenPage>
    </div>
  );
};

export default SignUpPage;
