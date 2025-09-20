try {
  const res = await registerUser(form);
  alert(res.data.msg); // "User registered successfully ✅"
  navigate("/login"); // Redirect to login page
} catch (err) {
  alert(err.response?.data?.msg || "❌ Registration failed");
}
