import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";


function ApplyJob(props) {

    const history = useHistory();

    const [showOtp, setshowOtp] = React.useState(false);

    const [createUrl, setcreateUrl] = React.useState(`${window.api_url}/jobs/sendOtp`);
   
    const [employeeDetails, setEmployeeDetails] = useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile:'',
        work_experience:'',
        resume:'',
        notice_period:'',
        otp:'',
    });

    const [ msgResponse , setMsgResponse] = useState({
        msgStatus:false,
        msg:'',
        msgClass:'',
    });

    // On file select (from the pop up) 
    const onFileChange = (e) => { 
        setEmployeeDetails({ ...employeeDetails, resume:  e.target.files[0] });
    } 
   
    const handleChange = (e) =>{
        let fieldName = e.target.name;
        let valueName = e.target.value;

        setEmployeeDetails({ ...employeeDetails, [fieldName]: valueName });
    }
    

    const userSubmit = (e,props) => {
        e.preventDefault();

        const formData = new FormData(); 
        formData.append("first_name", employeeDetails.first_name);
        formData.append("last_name", employeeDetails.last_name);
        formData.append("email", employeeDetails.email);
        formData.append("mobile", employeeDetails.mobile);
        formData.append("work_experience", employeeDetails.work_experience);
        formData.append("resume", employeeDetails.resume);
        formData.append("notice_period", employeeDetails.notice_period);
        formData.append("otp", employeeDetails.otp);

        window.$axios.post(createUrl , formData)
                            .then( (res) => {
                                if(res.data.status == 200){
                                    var alertClass = 'alert alert-success';
                                    setshowOtp(true);
                                    setcreateUrl( `${window.api_url}/jobs/apply`);
                                }else if(res.data.status == 400){
                                    var alertClass = 'alert alert-danger';
                                }
                                else if(res.data.status == 401){
                                    var alertClass = 'alert alert-warning';
                                    setshowOtp(true);
                                    setcreateUrl( `${window.api_url}/jobs/apply`);
                                }
                                setMsgResponse({ ...msgResponse, msgStatus:res.data.status , 
                                                                msg:res.data.msg, msgClass:alertClass});
                            });
    }

    const showMsg = (props) => {
        if(msgResponse.msgStatus){
            if(msgResponse.msgStatus == 200){
                //setTimeout(function(){ history.push('/'); } , 1000)
            }
            return (
                <div className={msgResponse.msgClass} role="alert">
                    {msgResponse.msg}
                </div>
            );
        }
    }

    const Otp = () => {
        return(
            <div className="col-4">
                <div className="form-group">
                    <label htmlFor="mobile">OTP</label>
                    <input type="text" 
                        className="form-control" 
                        id="otp" 
                        name="otp"
                        value={employeeDetails.otp}
                        onChange={handleChange}
                        placeholder="Please Enter OTP" 
                        />
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="container mt-3 mb-3">
                <div className="row">
                    <h2>Apply Job</h2>
                </div>
                {showMsg()}
                
                <form onSubmit={userSubmit} encType="multipart/form-data">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="first_name" 
                                    name="first_name"
                                    value={employeeDetails.first_name}
                                    onChange={handleChange}
                                    placeholder="First Name" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="last_name" 
                                    name="last_name"
                                    value={employeeDetails.last_name}
                                    onChange={handleChange}
                                    placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="email" 
                                    name="email"
                                    value={employeeDetails.email}
                                    onChange={handleChange}
                                    placeholder="Email" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input type="text" 
                                    className="form-control" 
                                    id="mobile" 
                                    name="mobile"
                                    value={employeeDetails.mobile}
                                    onChange={handleChange}
                                    placeholder="Mobile" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="work_experience">Work Experience</label>
                                <select  
                                    className="form-control" 
                                    id="work_experience" 
                                    name="work_experience"
                                    onChange={handleChange}>
                                    <option value="">Select Experience</option>
                                    <option value="0-6 Months">0-6 Months</option>
                                    <option value="6 Months - 1 Year">6 Months - 1 Year</option>
                                    <option value="1-2 Year">1-2 Year</option>
                                    <option value="2-3 Year">2-3 Year</option>
                                    <option value="3-4 Year">3-4 Year</option>
                                    <option value="4-5 Year">4-5 Year</option>
                                    <option value="5-6 Year">5-6 Year</option>
                                    <option value="6-7 Year">6-7 Year</option>
                                    <option value="7-8 Year">7-8 Year</option>
                                    <option value="8-9 Year">8-9 Year</option>
                                    <option value="9-10 Year">9-10 Year</option>
                                    <option value="10+ Year">10 + Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="notice_period">Notice Period</label>
                                <select  
                                    className="form-control" 
                                    id="notice_period" 
                                    name="notice_period"
                                    onChange={handleChange}>
                                    <option value="">Select Notice Period</option>
                                    <option value="Immidiate">Immidiate</option>
                                    <option value="Less then 15 days">Less then 15 days</option>
                                    <option value="1 Month">1 Month</option>
                                    <option value="2 Month">2 Month</option>
                                    <option value="3 Month">3 Month</option>
                                    <option value="3 + Month">3 + Month</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">  
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="mobile">Resume</label>
                                <input type="file" 
                                    className="form-control" 
                                    id="resume" 
                                    name="resume"
                                    onChange={onFileChange}
                                    placeholder="Resume" 
                                    accept="application/pdf" />
                            </div>
                        </div>

                        { showOtp ? <Otp /> : null }

                    </div>

                   <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </>
    );
}

export default ApplyJob;
