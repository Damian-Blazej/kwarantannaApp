import { Component } from '@angular/core';
import {firestore, authenticate} from '../app.module';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  pesel: number;

  constructor(private router: Router) { }

  checkPesel(){
    firestore.collection('pesele').doc(this.pesel.toString()).get().then(doc => {
      if (doc.exists){
        alert('Poprawny pesel');
        authenticate();
        this.router.navigate(['app']);
      } else {
        alert('Niepoprawny pesel');
      }
    }).catch(() => {
      console.log('Błąd bazy.');
    });
    console.log(this.pesel.toString());
  }
}
