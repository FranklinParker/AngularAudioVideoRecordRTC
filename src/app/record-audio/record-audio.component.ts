import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import * as RecordRTC from 'recordRTC';
import {PostRecordedFileService} from '../service/post-recorded-file.service';

@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.css']
})
export class RecordAudioComponent implements OnInit, AfterViewInit {
  private stream: MediaStream;
  private recordRTC: any;
  postToServer = false;

  @ViewChild('audio') audio;

  constructor(private postRecordFileService: PostRecordedFileService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // set the initial state of the video
    const audio: HTMLAudioElement = this.audio.nativeElement;
    audio.muted = false;
    audio.controls = true;
    audio.autoplay = false;
  }

  toggleControls() {
    const audio: HTMLAudioElement = this.audio.nativeElement;
    audio.muted = !audio.muted;
    audio.controls = !audio.controls;
    audio.autoplay = !audio.autoplay;
  }

  /**
   * called by recordRTC
   *
   * @param {MediaStream} stream
   */
  successCallback(stream: MediaStream) {

    const options = {
      mimeType: 'audio/wav', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const audio: HTMLAudioElement = this.audio.nativeElement;
    //HTMLMediaElement.srcObject
    audio.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    //handle error here
  }

  /**
   * called after stopRecording by recordRTC
   *
   * @param audioAudioWebMURL
   */
  processAudio(audioAudioWebMURL) {
    const video: HTMLAudioElement = this.audio.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioAudioWebMURL;
    this.toggleControls();
    const blob = recordRTC.getBlob();
    const file: File = new File([blob], 'audio.wav',
      {type: 'audio/wav'});

    if (this.postToServer) {
      this.postRecordFileService.postRecordAudio(file)
        .subscribe((result) => {
          alert(JSON.stringify(result));
        });
    }

    recordRTC.getDataURL(function (dataURL) {
    });
  }

  /**
   * click start recording button
   *
   */
  startRecording() {
    const mediaConstraints = {
      video: {
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  /**
   * click stop recording button
   *
   */
  stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processAudio.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
  }

  /**
   * click download button
   */
  download() {
    this.recordRTC.save('audio.wav');
  }

}
