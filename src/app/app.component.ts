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
    //Make ServiceCall -> update Title -> then display the title
    const headersVal = { userID: "Subhrajit" };
    this.http.get<any>('http://localhost:8080/greet', { headers: headersVal }).subscribe(data => {
      console.log(data);
      this.title = data.content;
    });
  }


  submitName(nameVal) {
    console.log(nameVal);
    const body = new Greet(2, nameVal);
    let resp = null;
    var status = "running";
    this.http.post('http://localhost:8080/addGreeting', body).subscribe({
      next: data => {
        console.log("Success", data);
        status = "success";
        resp = data;
        this.title = resp.content;
      },
      error: error => {
        console.error('There was an error!', error);
        status = "failed";
        this.title ='There was an error!';
      }
    })

  }
}
