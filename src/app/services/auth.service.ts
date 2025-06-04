import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      };
      fetch("http://localhost:8000/api/login",options)
      .then(res=>resolve(res.json()))
      .catch(err=>reject(err));
      return true;
    })
  }

}
