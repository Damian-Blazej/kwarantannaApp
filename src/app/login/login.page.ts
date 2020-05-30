import { Component } from '@angular/core';
import {firestore, authenticate} from '../app.module';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  pesel: string;

  constructor(private router: Router) {
    this.pesel = '';
  }

  checkPesel(){
    if (this.pesel.length === 11) {
      firestore.collection('pesele').doc(this.pesel).get().then(doc => {
        if (doc.exists){
          authenticate(this.pesel);
          this.router.navigate(['app']);
        } else {
          alert('Niepoprawny pesel');
        }
      }).catch(() => {
        alert('Wystąpił błąd podczas łączenia z bazą danych. Sprawdź połączenie internetowe.');
      });
    } else {
     alert('Niepoprawny pesel');
    }
  }
}
