import React, {useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Modal from './Modal'
import ViewModal from './ViewModal'
import axios from 'axios';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  //for creating dyanmic data
  function createData(Salutation, FirstName, LastName, DOB, Email, Phone, Gender) {
    return { Salutation, FirstName, LastName, DOB, Email, Phone, Gender };
  }


let rows = [];
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isVMOpen, setVMOpen] = useState(false);  //view Modal
  const classes = useStyles();

    const [Salutation, setSalutation] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [Phone, setPhone] = useState('')
    const [DOB, setDOB] = useState(new Date('2021-07-16T21:11:54').toDateString())

  useEffect(()=>{ 
    //make ajax call to api
    axios.get('https://userbasepkp.herokuapp.com/getAllUsers')
    .then((response)=>{
      response.data.forEach(user => {
        rows = [...rows, createData(user.salutation, user.firstName, user.secondName, user.dob, user.email, user.phone, user.gender)]
      });
      //rows = [...rows, createData(response.data, 159, 6.0, 24, 4.0)]
      setUsers(rows)
    })
    .catch((err)=>{
      console.log("some error occured")
    })
},[]);
    
  const deleteUser = (val) =>{
      axios.post('https://userbasepkp.herokuapp.com/deleteUser',{
        email : val
      })
      .then(()=>{
        //refresh page
        window.location.reload();
      })
      .catch(()=>{
        alert('some error occured')
      })
  }

  const editUser = (val) =>{
    axios.post('https://userbasepkp.herokuapp.com/getUserByEmail',{
        email : val
      })
      .then((response)=>{
        //refresh page
        //console.log(response);
        setSalutation(response.data.salutation);
        setFirstName(response.data.firstName);
        setLastName(response.data.secondName);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setPhone(response.data.phone);
        setDOB(response.data.dob);
        setOpen(true);
      })
      .catch((err)=>{
        alert('some error occured '+err)
      })
  }

  const viewUser = (val) =>{
    axios.post('https://userbasepkp.herokuapp.com/getUserByEmail',{
      email : val
    })
    .then((response)=>{
      //refresh page
      //console.log(response);
      setSalutation(response.data.salutation);
      setFirstName(response.data.firstName);
      setLastName(response.data.secondName);
      setEmail(response.data.email);
      setGender(response.data.gender);
      setPhone(response.data.phone);
      setDOB(response.data.dob);
      setVMOpen(true);
    })
    .catch((err)=>{
      alert('some error occured '+err)
    })
  }

  const cleanUp = () =>{ 
    setSalutation('');
    setFirstName('');
    setLastName('')
    setEmail('')
    setGender('')
    setPhone('')
    setDOB(new Date('2021-07-16T21:11:54').toDateString())
}
  
    return (
        <div style={{display:'inline-block'}}>
            <input placeholder="Enter Name to search" style={{textAlign:'left'}}></input>
            <button style={{margin:'5px'}} onClick={()=>{alert('functionality yet to be added')}}>Search</button>
            <br />
            <p style={{color:'blue', cursor:'pointer', display:'block'}} onClick={()=>{setOpen(true)}}>+Add New User</p>

            <Modal open={isOpen} closeModal={()=>{setOpen(false);cleanUp()}}
            Salutation = {Salutation} FirstName = {FirstName} LastName = {LastName} Email={Email} Gender={Gender} Phone={Phone} DOB={DOB}/>

            <ViewModal open={isVMOpen} closeModal={()=>{setVMOpen(false);cleanUp()}}
            Salutation = {Salutation} FirstName = {FirstName} LastName = {LastName} Email={Email} Gender={Gender} Phone={Phone} DOB={DOB}
            />

        <TableContainer component={Paper} style={{marginLeft:'auto', marginRight:'auto'}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Salutation</TableCell>
            <TableCell align="justify">FirstName</TableCell>
            <TableCell align="justify">LastName</TableCell>
            <TableCell align="justify">DOB</TableCell>
            <TableCell align="justify">Email</TableCell>
            <TableCell align="justify">Phone</TableCell>
            <TableCell align="justify">Gender</TableCell>
            <TableCell align="justify">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.Email}>
              <TableCell align="justify">{row.Salutation}</TableCell>
              <TableCell align="justify">{row.FirstName}</TableCell>
              <TableCell align="justify">{row.LastName}</TableCell>
              <TableCell align="justify">{row.DOB}</TableCell>
              <TableCell align="justify">{row.Email}</TableCell>
              <TableCell align="justify">{row.Phone}</TableCell>
              <TableCell align="justify">{row.Gender}</TableCell>
              <TableCell align="justify">
                <button onClick={()=>{editUser(row.Email)}}>Edit</button>
                <button onClick={()=>{deleteUser(row.Email)}}>Delete</button>
                <button onClick={()=>{viewUser(row.Email)}}>View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    )
}

export default Dashboard
