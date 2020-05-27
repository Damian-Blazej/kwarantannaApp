import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor() {

  }

  darkMode: false;

  toggleDarkMode(){
    console.log('toggle');
    if (this.darkMode) {
      document.body.classList.toggle('dark');
    }
  }
}
