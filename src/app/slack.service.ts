import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SlackService {

    private webHook = '';
    private options = {
        headers: new HttpHeaders(
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        )
    };

    constructor(private http: HttpClient) { }

    postErrorOnSlack(error: Error, webHook:any): void {
      this.webHook = webHook;
        const message = {
            channel: '#',
            text: error.message,
            attachments: [
                {
                    author_name: window.location.href,
                    color: 'danger',
                    title: 'Failed',
                    text: error
                }
            ]
        }

        this.http.post(this.webHook, message, this.options).subscribe();
    }
}
