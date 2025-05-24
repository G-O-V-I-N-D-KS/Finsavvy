import React from 'react';
import '../styles/style_up.css'; // Import your CSS file

function SignUpPage() {
    return (
        <div className='whole'>
            <div className="img1">
                <img src="src\assets\Sign up-cuate (1).png" alt="Sign Up" width="400" height="400" />
            </div>
            <div className="box1">
                <form className="Signup_form">
                    <h1 className="Signup_h1">Sign up</h1>
                    <div className="inputbox1">
                        <input type="text" required="required" />
                        <span>Username</span>
                        <p></p>
                    </div>
                    <div className="inputbox1">
                        <input type="email" required="required" />
                        <span>Email id</span>
                        <p></p>
                    </div>
                    <div className="inputbox1">
                        <input type="text" required="required" />
                        <span>Phone no</span>
                        <p></p>
                    </div>
                    <div className="inputbox1">
                        <input type="password" required="required" />
                        <span>Password</span>
                        <p></p>
                    </div>
                    <input type="submit" value="Sign up" />
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
