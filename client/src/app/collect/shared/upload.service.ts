import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class UploadService {
    /**
     * @param Observable<number>
     */
    private progress$: Observable<number>;

    /**
     * @type {number}
     */
    private progress: number = 0;

    private progressObserver: any;

    constructor() {
        this.progress$ = new Observable(observer => {
            this.progressObserver = observer
        });
    }

    /**
     * @returns {Observable<number>}
     */
    public getObserver(): Observable<number> {
        return this.progress$;
    }

    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    public upload(url: string, message: string, files: File[]): Promise<any> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("message", message);
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("uploads[]", files[i], files[i].name);
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            UploadService.setUploadUpdateInterval(500);
            if (files) {
                xhr.upload.onprogress = (event) => {
                    this.progress = Math.round(event.loaded / event.total * 100);

                    if (this.progressObserver) {
                        this.progressObserver.next(this.progress);
                    }
                };
            }

            xhr.open('PUT', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
            xhr.setRequestHeader('Content-Disposition', 'multipart/form-data')
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(formData);
        });
    }

    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     *
     * @param interval
     */
    private static setUploadUpdateInterval(interval: number): void {
        setInterval(() => { }, interval);
    }
}