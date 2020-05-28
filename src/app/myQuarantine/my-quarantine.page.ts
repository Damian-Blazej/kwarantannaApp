import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { storage, firestore } from '../app.module';

@Component({
  selector: 'app-my-quarantine',
  templateUrl: 'my-quarantine.page.html',
  styleUrls: ['my-quarantine.page.scss']
})
export class MyQuarantinePage {

  constructor(private camera: Camera) {
      this.takePictureButtonDisabled = false;
      this.pesel = 95042824351;
      this.startingQuaratineDate = new Date();
      this.endingQuarantineDate = new Date();
      this.secondsLeft = 0;
      this.minutesLeft = 0;
      this.hoursLeft = 0;
      this.daysLeft = 0;
      this.readQuarantineTimes();
  }

  sendingPhotoState: string;
  takePictureButtonDisabled: boolean;
  pesel: number;
  startingQuaratineDate: Date;
  endingQuarantineDate: Date;
  secondsLeft: number;
  minutesLeft: number;
  hoursLeft: number;
  daysLeft: number;
  timerInterval: number;

  get timeLeft() {
      return this.endingQuarantineDate.getTime() - new Date().getTime();
  }

  checkPesel(){
      firestore.collection('pesele').doc(this.pesel.toString()).get().then(doc =>{
      if(doc.exists){
        alert('Poprawny pesel');
      }
    }).catch(function(error){
      console.log(error);
    });
    console.log(this.pesel.toString());
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      cameraDirection: this.camera.Direction.FRONT,
      saveToPhotoAlbum: false,
    };

    this.camera.getPicture(options).then((imageData) => {
        const filename =  `${this.pesel}/${Date.now()}.jpg`;
        const storageRef = storage.ref().child('userPictures/' + filename);
        storageRef.putString(imageData, 'base64')
            .then(snapshot => {
                this.sendingPhotoState = 'Pomyślnie przesłano zdjęcie. Dziękujemy.';
                this.takePictureButtonDisabled = true;
            })
            .catch( error => {
                this.sendingPhotoState = 'Nie udało się przesłać zdjęcia. Spróbuj jeszcze raz.';
                this.takePictureButtonDisabled = false;
            });
    }, (err) => {
        this.takePictureButtonDisabled = false;
        this.sendingPhotoState = 'Brak dostępu do kamery.';
    });
  }

  readQuarantineTimes() {
      firestore.collection('pesele').doc(this.pesel.toString()).get().then((doc) => {
          const data = doc.data();
          this.startingQuaratineDate = data.startKwarantanny.toDate();
          this.endingQuarantineDate = data.koniecKwarantanny.toDate();
          console.log(this.endingQuarantineDate);
          const self = this;
          this.timerInterval = setInterval(function() {
              self.calculateTimeLeft();
          }, 1000);
      });
  }

  calculateTimeLeft() {
        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
        } else {

            this.secondsLeft = Math.floor(this.timeLeft / 1000);
            this.minutesLeft = Math.floor(this.secondsLeft / 60);
            this.hoursLeft = Math.floor(this.minutesLeft / 60);
            this.daysLeft = Math.floor(this.hoursLeft / 24);

            this.hoursLeft %= 24;
            this.minutesLeft %= 60;
            this.secondsLeft %= 60;
            console.log(this.secondsLeft);
        }
  }
}
