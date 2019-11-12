import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Inspire Me - Men of Melbourne';

  navCollapsed = true;
  notification: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public afs: AngularFirestore,
    public http: HttpClient,
    public toastr: ToastrService
  ) {}

  async ngOnInit() {
    // this.auth.user$.subscribe(user => {
    //   this.user = user;
    //   if (user) {
    //     this.fcm.setupFCMToken(user);
    //     this.fcm.listenToNotifications();
    //   }
    // });
    // this.fcm.currentMessage.subscribe(msg => {
    //   if (msg) {
    //     this.notification = (<any>msg).notification;
    //     this.toastr.info(this.notification.body, this.notification.title);
    //   }
    // });
  }

  isView(name) {
    let path = this.route.pathFromRoot.join('/');
    path = path.substring(1, path.length).trim();
    return path.indexOf(name) > -1;
  }
}
