// import React, { useState } from 'react';

// function Login({ setUser }) {
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup) {
//       // Signup: Store in localStorage
//       localStorage.setItem('user', JSON.stringify(formData));
//       setUser(formData);
//     } else {
//       // Login: Check localStorage
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
//         setUser(storedUser);
//       } else {
//         alert('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4" style={{ width: '400px', background: 'rgba(255,255,255,0.9)' }}>
//         <h2 className="text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <div className="mb-3">
//               <label>Username</label>
//               <input type="text" name="username" className="form-control" onChange={handleChange} required />
//             </div>
//           )}
//           <div className="mb-3">
//             <label>Email</label>
//             <input type="email" name="email" className="form-control" onChange={handleChange} required />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input type="password" name="password" className="form-control" onChange={handleChange} required />
//           </div>
//           <button type="submit" className="btn btn-custom w-100">{isSignup ? 'Sign Up' : 'Login'}</button>
//         </form>
//         <p className="text-center mt-3">
//           {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <button className="btn btn-link p-0" onClick={() => setIsSignup(!isSignup)}>
//             {isSignup ? 'Login' : 'Sign Up'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isSignup) {
      // Check if email already exists
      if (users.find(u => u.email === formData.email)) {
        setError('Email already exists!');
        return;
      }
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(formData));
      onLogin(formData);
    } else {
      // Login
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid credentials!');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px', background: 'rgba(255,255,255,0.9)' }}>
        <h2 className="text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-custom w-100">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-3">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="btn btn-link p-0" onClick={() => { setIsSignup(!isSignup); setError(''); }}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;


