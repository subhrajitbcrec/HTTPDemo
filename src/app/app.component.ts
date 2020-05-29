import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Greet } from './app.model.greet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Welcome';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /* This next line is just to demo we can change the req/resp type from JSON to XML,
    Even though we will be able to make a successful Call to the API (we can check in the Networks tab)
    We will see a proper response being sent by the API but we need to make changes to use the XML in our angular code
    As by default Angular will treat the response as JSON. We can uncomment this line of code & comment the next Headers
    declaration to test the changes. */

    // const headerValues = {userID: 'subhrajit', Accept: 'application/xml', 'Content-Type': 'application/xml'};

    const headerValues = { userID: 'subhrajit', Accept: 'application/json', 'Content-Type': 'application/json' };

    this.http.get<any>('http://localhost:8080/greet', { headers: headerValues }).subscribe(data => {
      console.log(data);
      this.title = data.content;
    });
    // Making 2 calls example
    // this.makePostCall(0, "Perry");
  }


  validateName(name: any) {
    console.log('Inside Validate Name: ', name);
    this.makePostCall(2, name);
  }

  makePostCall(id: number, name: any) {
    const body = new Greet(id, name);
    let resp;
    this.http.post('http://localhost:8080/addGreeting', body).subscribe({
      next: data => {
        console.log('Success : ', data);
        resp = data;
        this.title = resp.content;
      },
      error: err => {
        console.error('There was an error: ', err);
        this.title = 'How could you!!';
      }
    });
  }
}
