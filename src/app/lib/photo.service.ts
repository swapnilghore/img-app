import { Injectable } from '@angular/core';
import { Camera, CameraOptions, MediaType, } from '@awesome-cordova-plugins/camera/ngx';
import { Platform } from '@ionic/angular';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private camera: Camera, private filePath: FilePath, private platform: Platform) { }

  takePhoto(sourceType: any): Promise<any> {
    let cameraOptions: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      sourceType: sourceType
    }
    return this.camera.getPicture(cameraOptions).then((mediaPath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        return this.filePath.resolveNativePath(mediaPath).then(path => {
          return this.getCameraProviderResponse(path);
        });
      }
      else {
        return this.getCameraProviderResponse(mediaPath);
      }
    }, (err) => {
      return err;
    });
  }

  getCameraProviderResponse(path: string) {
    return {
      success: true,
      mediaPath: path,
    };
  }
}
