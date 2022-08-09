//mikew@gmail.com
//password1234

import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInWighGooglePopup } from "../../utils/firebase/firebase.utils";

import { SignUpContainer, Headline, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWighGoogle = async () => {
    await signInWighGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
      // if (error.code === "auth/wrong-password") {
      //   alert('incorrect password for email')
      // }
      console.log(error);
    }
    
    //create user document from what it returns
      
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })
  };

  return (
    <SignUpContainer>
      <Headline>Already have an account?</Headline>
      <span>Sign in with your email and password</span>
      <form onSubmit={() => {}}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit" onClick={handleSubmit}>Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWighGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm