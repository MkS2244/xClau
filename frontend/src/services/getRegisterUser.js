export function getRegisterUser(userData) {
  const url = "http://localhost:8000/api/v1/register";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "user",
      apellidos: userData.apellidos,
    }),
  }).then((res) => {
    if (!res.ok) return res.json().then(err =>  {
      console.log("Service: " ,err)
      throw err; 
      });
    return res.json();
  });
}