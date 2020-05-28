import { Component } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { storage, firestore } from '../app.module';

@Component({
  selector: 'app-my-quarantine',
  templateUrl: 'my-quarantine.page.html',
  styleUrls: ['my-quarantine.page.scss']
})
export class MyQuarantinePage {

  constructor(private camera: Camera) {
  }

  pesel: number;

  checkPesel(){
    firestore.collection('pesele').doc(this.pesel.toString()).get().then(function(doc){
      if(doc.exists){
        alert("Poprawny pesel");
      }
    }).catch(function(error){
      console.log(error);
    })
    console.log(this.pesel.toString())
  }

  takePicture() {
    console.log("aaa!");
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

      const storageRef = storage.ref().child('userPictures/1.jpg');
      storageRef.putString(imageData, 'base64').then(snapshot => {
        console.log('Successfully uploaded picture!');
      });
    }, (err) => {
      // Handle error
      console.log('Camera issue: ' + err);
    });
  }
}
