import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostRecordedFileService {
  // please change url to test here
  url = 'http://localhost:3000/api/watson/fileUpload';

  constructor(private http: HttpClient) {
  }

  /**
   * post the recorded audio
   *
   *
   * @param {File} file
   * @returns {Observable<any>}
   */
  postRecordAudio(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.url, formData);

  }


}
