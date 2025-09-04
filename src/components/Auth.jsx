import React, {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Avatar, Box, Button, Container,   IconButton,  InputAdornment,  Paper, TextField, Typography,Alert} from '@mui/material'
import {  MailLockOutlined, Visibility, VisibilityOff} from '@mui/icons-material'
import {login, register, forgotPassword,resetPassword } from '../services/auth'
import { handleApiError,handleApiSuccess } from '../utils/apiHandlers';
import useAutoClearMessage from '../utils/useAutoClearMessage'
import { useParams } from 'react-router-dom'



function Auth() {
  const navigate = useNavigate();
  const {token} = useParams();
  const [action, setAction]= useState("sign in");
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [formData, setFormData]= useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useAutoClearMessage(errorMessage, setErrorMessage);
  useAutoClearMessage(successMessage, setSuccessMessage);
  
  useEffect(()=>{
    if (token) {
      setAction("reset password")
    }
  },[token]);

  useEffect(() => {
    setFormData({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
    })
  },[action]);

  const handleChange = (e) =>{
    const{name,value}= e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let res;
      if (action === "sign in") {
        res = await login({
          email: formData.email,
          password: formData.password,
        });
        console.log(res);
         navigate("/");
      }else if (action === "sign up") {
        res = await register(formData);
        setSuccessMessage(handleApiSuccess(res," register berhasil"))
        console.log(res);
        setAction("sign in");      
      }else if (action === "forgot password") {
        res = await forgotPassword({email: formData.email});
        setSuccessMessage(handleApiSuccess(res, "silahkan cek email anda untuk link reset password"));
        console.log(res);
      }else if (action === "reset password") {
        if (formData.password !== formData.confirmPassword) {
          return setErrorMessage("password harus sama");
        }
        res = await resetPassword({token,password: formData.password});
        setSuccessMessage(handleApiSuccess(res, "password berhasil di reset, silahkan login"));
        console.log(res);
        setAction("sign in");
      }
      
      
    } catch (error) {
      setErrorMessage(handleApiError(error))
    }
  }
  

  return (
    <Container maxWidth="sm"  sx={{paddingTop:20}}>
        <Paper elevation={3}  sx={{
          maxWidth:400,
          mx:"auto",
          padding:4,
          borderRadius:4
        
          }}>
          <Typography variant='h5'align='center'>
            {action}
          </Typography>
          <Avatar 
          sx={{
            backgroundColor:"primary.main",
            align:"center",
            mb:1,
            mx:"auto"
          }}
          >
            <MailLockOutlined/>
          </Avatar>
                      

            {errorMessage && (
              <Alert 
              severity="error" 
              onClose={() => setErrorMessage("")}
              sx={{mb:2, backgroundColor:'#ff2f2fff' , color:'#fff'}}>
                {errorMessage}</Alert>
              )}

            {successMessage && (
              <Alert 
              severity="success" 
              onClose={() => setSuccessMessage("")}
              sx={{mb:2, backgroundColor:'#4de72bfa', color:'#fff'}}>
                {successMessage}</Alert>
              )}

          
          <Box component="form" onSubmit={handleSubmit} autoComplete='off'>
            {action !== "reset password"&&(
               <TextField
              sx={{
              width:"75%"
            }}
              margin='normal'
                size='medium'
                name='email'
                type='text'
                value={formData.email}
                onChange={handleChange}
                placeholder='email'
                >
                </TextField>
            )}
        

          {action === "sign up"&&(
                <TextField
                 sx={{
              width:"75%"
            }}
                margin='normal'
                size='medium'
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='username'
                >
                </TextField>
                
          )}
              
                {action !== "forgot password"&&(
                  <TextField
                sx={{
                  width:"75%"
                }}
                margin='normal'
                size='medium'
                name='password'
               
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder='password'
                InputProps={{
                  endAdornment:(
                    <InputAdornment position='end'>
                      <IconButton onClick={()=>setShowPassword(!showPassword)}
                        edge="end">
                          {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment >
                  ),
                }}
                >
                </TextField>
                )}
                {action === "reset password"&&(
                   <TextField
                sx={{
                  width:"75%"
                }}
                margin='normal'
                size='medium'
                name='confirmPassword'
               
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='confirm password'
                InputProps={{
                  endAdornment:(
                    <InputAdornment position='end'>
                      <IconButton onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                        edge="end">
                          {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment >
                  ),
                }}
                >
                </TextField>
                )}
                <Button 
           variant='contained'
           type='submit'
           sx={{
            width:'50%'
           }}>
              {action === "forgot password"? "send email": action}
           </Button>
            </Box>
           
           {action ==="sign in"&&(
            <>
             <Typography   onClick={()=>setAction("sign up")} sx={{color:'blue',cursor:'pointer',pt:1}}>
           sign up
          </Typography>
          <Typography   onClick={()=>setAction("forgot password")} sx={{color:'blue',cursor:'pointer'}}>
           forgot password
          </Typography>
          </>
           )}
            {action === "forgot password"&&(
               <Typography   onClick={()=>setAction("sign in")} sx={{color:'blue',cursor:'pointer', pt:1}}>
                sign in
          </Typography>
            )}
            {action === "sign up"&&(
              <Typography   onClick={()=>setAction("sign in")} sx={{color:'blue',cursor:'pointer', pt:1}}>
                alredy have account? sign in
          </Typography>
            )}
         

        </Paper>
    </Container>
  )
}

export default Auth