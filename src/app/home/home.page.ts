import { Component, output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../lib/common.service';
import { PhotoService } from '../lib/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  displayClickedImg: string = '';
  BlobData: any;
  width: number = 300;
  height: number = 200;
  displayImgArray: any[] = [];

  constructor(private router: Router, private commonService: CommonService, private photoService: PhotoService,) { }

  openCamera() {

    this.commonService.presentLoader().then(loading => {
      loading.present()

      this.photoService.takePhoto(1).then((image) => {
        console.log(image);
        console.log(image.success);
        if (image?.success) {

          const imageBlob = this.dataURItoBlob(image.mediaPath);
          console.log(imageBlob);
          this.BlobData = imageBlob;
          console.log(this.BlobData);


          this.createImageFromBlob(this.BlobData);

          // const date = new Date().valueOf();
          // const imageName = date+ '.jpg';

          // this.image_nam = imageName;

          // const imageFile = new File([imageBlob], imageName , { type: 'image/jpg' })

          // this.billURL = Capacitor.convertFileSrc(image.mediaPath);

        }
      }, (err: any) => {
        loading.dismiss()
        this.commonService.danger("Capture Failed");
      });
      loading.dismiss()
    });


  }

  createImageFromBlob(blobData: any) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.displayClickedImg = event.target!.result as string;
      console.log(this.displayClickedImg);
    };
    reader.readAsDataURL(blobData);
  }

  // dataURItoBlob(dataURI:any) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //    }
  //   const blob = new Blob([int8Array], { type: 'image/jpg' }); 
  //  return blob;
  // }

  dataURItoBlob(dataURI: string): Blob {
    // Split the Data URI into metadata and data
    const [header, base64Data] = dataURI.split(',');

    // Validate the Data URI structure
    if (!header || !base64Data) {
      throw new Error('Invalid Data URI');
    }

    // Decode the Base64 data
    const byteString = atob(base64Data);

    // Extract the MIME type from the header (e.g., "data:image/jpeg;base64")
    const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';

    // Create an ArrayBuffer and Uint8Array
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Populate the Uint8Array with decoded byte values
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create and return a Blob
    return new Blob([uint8Array], { type: mimeType });
  }

  exportImage() {

    if(this.displayClickedImg == '') {
      this.commonService.danger('Please Capture Image First');
    }else{
       this.displayImgArray.push({ imageUrl: this.displayClickedImg });
    console.log('array', this.displayImgArray);
    const data = this.displayImgArray;
    this.commonService.presentLoader().then(loading => {
      loading.present();
      setTimeout(() => {
        // this.router.navigateByUrl('/page-two', { replaceUrl: true, {state:  }});
        this.router.navigate(['/page-two'], { state: { data } });
        this.commonService.success('Image Exported Successfully');
        loading.dismiss();
        this.displayClickedImg = '';
      }, 2000);
    });
    }
  }

}
