// Insert your code here

document.querySelector('#register').addEventListener('click', function(){
  data = {
    name: document.querySelector('#registerName').value,
    email: document.querySelector('#registerEmail').value,
    password: document.querySelector('#registerPassword').value
  }
  console.log(data);
  fetch('http://localhost:3000/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.result)
      window.location.assign('http://127.0.0.1:5500/week3/weatherapp-part4/frontend/index.html');
  });
});

document.querySelector('#connection').addEventListener('click', function(){
  data = {
    email: document.querySelector('#connectionEmail').value,
    password: document.querySelector('#connectionPassword').value
  }
  console.log(data);
  fetch('http://localhost:3000/user/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.result)
      window.location.assign('http://127.0.0.1:5500/week3/weatherapp-part4/frontend/index.html');
  });
});