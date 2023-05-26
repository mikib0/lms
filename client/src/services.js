import { LoginError, NonExistingUserError } from "./errors";

export async function createNewStudent(data){
  try {
    return await fetch('/api/students', {
    method: 'POST',
    body: data,
  });
} catch(e){
  throw new Error('Error!! could not create student')
}
}

export async function deleteStudent(id){
  console.log(id)
    const res = await fetch(`/api/students/${id}`, {
      method: 'DELETE'
    })
    return res.json()
}

export async function getStudent(){
    const res = await fetch(`/api/student`, {
      method: 'GET',
    })
    return await res.json();
}

export function getStudents(){
  return fetch('/api/students', {
    method: 'get',
  });
  // return await res.json()
}

export async function createOrder(order){
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  return await res.json()
}

export async function getOrderHistory(q){
  const res = await fetch('/api/orders', {
    method: 'GET'
  })
  return await res.json();
}

export async function updateOrder(update, orderId){
  return await fetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(update),
  });
}

export async function updateProfile(update){
  return await fetch(`/api/students`, {
    method: 'PUT',
    body: update,
  });
}

export async function createFeedback(feedback){
  return fetch('/api/feedbacks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedback)
  })
}

export async function getOrders(){
  const res =  await fetch('/api/orders')
  return res.json()
}

export async function authenticate(user){
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if(res.status == 401){
    throw new LoginError('Invalid email or password');
  }

  return await res.json()
}

export async function approveOrder(id){
  return fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'approved' }),
  });
}

export async function rejectOrder(id) {
  return fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'rejected' }),
  });
}

export async function uploadLostButFound(data){
  return await fetch('/api/lostbutfounds', {
    method: 'POST',
    body: data
  })
}

export async function getLostButFounds(){
  const res = await fetch('/api/lostbutfounds', {
    method: 'GET'
  })
  return await res.json()
}

export async function getFeedbacks(){
  const res = await fetch('/api/feedbacks')
  return await res.json()
}

export async function getUser(){
  const res = await fetch('/api/user')
  if(res.status == 401 && res.statusText == 'Unauthorized'){
    throw new NonExistingUserError('user does not exist')
  }
  return await res.json()
}

export async function completeOrder(id){
  await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'completed' }),
  });
}

export async function cancelOrder(id){
  await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'canceled' }),
  });
}

export async function logout(){
  return await fetch('/api/logout', {
    method: 'POST'
  })
}
