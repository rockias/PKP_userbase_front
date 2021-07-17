import React, {useState, useEffect} from 'react'
import ReactDom from 'react-dom'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

function Modal(props) {

    const [Salutation, setSalutation] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [Phone, setPhone] = useState('')
    const [DOB, setDOB] = useState('')

    //const [selectedDate, setSelectedDate] = useState(new Date('2021-07-16'));

    useEffect (()=>{
        setSalutation(props.Salutation);
        setFirstName(props.FirstName);
        setLastName(props.LastName)
        setEmail(props.Email)
        setGender(props.Gender)
        setPhone(props.Phone)
        setDOB(props.DOB)

        return (()=>{})
    },[props]);

    const handleSalutationChange = (event) =>{
        setSalutation(event.target.value);
    }
    const handleFirstNameChange = (event) => {
            setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }
    const handlePhoneChange = (event) =>{
        setPhone(event.target.value);
    }

    const handleDOBChange = (date) => {
        setDOB(date.toDateString());
      };

    //clean up on closing modal dialog
    // const cleanUp = () =>{ 
    //     setSalutation('');
    //     setFirstName('');
    //     setLastName('')
    //     setEmail('')
    //     setGender('')
    //     setPhone('')
    //     setDOB('')
    //     props.closeModal();
    // }
    //submit button
    const handleSubmit = () => {
        if(Salutation !== "" && FirstName !== "" && LastName !== "" && Email !== "" && Gender!=="" && Phone!=="" && DOB !== "")
        {
            axios.post('https://userbasepkp.herokuapp.com/createUser',{
                salutation : Salutation,
                firstName : FirstName,
                secondName : LastName,
                email : Email,
                gender : Gender,
                phone:Phone,
                dob:DOB
            })
            .then((res)=>{console.log("success"+res);window.location.reload();})
            .catch((err)=>{console.log(err)})
        }
        else{
            alert('Fill the data completely and correctly')
        }
    }
    if(!props.open) 
        return null;

    const MODAL_STYLE = {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        backgroundColor:'#FFF',
        padding:'50px',
        zIndex:1000,
        display:'flex',
        width:'40%',
    }
    const OVERLAY_STYLE = {
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0, .7)',
        zIndex:1000
    }
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLE}></div>
        {/* <div style={{display:'flex'}}> */}
        <div style={MODAL_STYLE}>
            <div style={{marginLeft:'auto', marginRight:'auto'}}>
                <TextField variant='outlined' placeholder="Salutation" onChange={handleSalutationChange} value={Salutation}></TextField> <br />
                <TextField variant='outlined' placeholder="First Name" onChange={handleFirstNameChange} value={FirstName}></TextField> <br />
                <TextField variant='outlined' placeholder="Last Name" onChange={handleLastNameChange} value={LastName}></TextField> <br />
                <TextField variant='outlined' placeholder="Email" onChange={handleEmailChange} value={Email}></TextField> <br />
                <TextField variant='outlined' placeholder="Gender" onChange={handleGenderChange} value={Gender}></TextField> <br />
                <TextField variant='outlined' placeholder="Phone" onChange={handlePhoneChange} value={Phone}></TextField> <br />
                {/* <input placeholder="DOB" onChange={handleDOBChange} value={DOB}></input> <br /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date of Birth"
                                value={DOB}
                                onChange={handleDOBChange}
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                </MuiPickersUtilsProvider>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={()=>{props.closeModal()}}>Close Pop-Up</button>
            </div>
            <br />
            <hr width=".5" size="500" color="black" ></hr>
            <div style={{marginLeft:'auto', marginRight:'auto'}}>
                <strong>Contact Card</strong> <br />
                Full Name: {Salutation + " " + FirstName + " " + LastName} <br />
                DOB : {DOB} <br />
                Email Id: {Email} <br />
            </div>
        </div>

        {/* </div> */}
        </>,
        document.getElementById('portal')
    )
}

export default Modal
