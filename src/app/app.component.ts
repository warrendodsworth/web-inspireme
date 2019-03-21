import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AuthService } from './auth.service';
import { FcmService } from './fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Inspire Me - Men of Melbourne'

  user: User
  navCollapsed = true
  notification: any

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    public afs: AngularFirestore,
    public http: HttpClient,
    public fcm: FcmService,
    public toastr: ToastrService) { }

  async  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user
      if (user) {
        this.fcm.setupFCMToken(user)
        this.fcm.listenToNotifications()
      }
    })

    this.fcm.currentMessage.subscribe(msg => {
      if (msg) {
        this.notification = (<any>msg).notification
        this.toastr.info(this.notification.body, this.notification.title);
      }
    })
  }

  isView(name) {
    var path = this.route.pathFromRoot.join('/')
    path = path.substring(1, path.length).trim()
    return path.indexOf(name) > -1;
  }

  loginGoogle() {
    this.auth.loginGoogle()
  }

  testSendNotificationHttp() {
    let pushData = this.fcm.testNotificationData

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'key=' });
    let options = { headers: headers };

    this.http.post('https://fcm.googleapis.com/fcm/send', pushData, options).toPromise()
      .then(r => {
        console.log('Notification Sent')
      })
  }

  testSendNotification(uid) {
    this.afs.collection('subscribers').add({ uid: uid, subscriberId: uid + '1' })
  }
}
