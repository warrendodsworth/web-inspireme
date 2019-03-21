import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  isCollapsed = true
  adminMenu = false
  currentMessage: any

  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    public fcm: FcmService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user
      if (user) {
        this.fcm.getPermission(user)
        this.fcm.monitorRefresh(user)
        this.fcm.receiveMessages()
      }
    })

    this.fcm.currentMessage.subscribe(msg => {
      this.currentMessage = msg
    })
  }

  isView(name) {
    var path = this.route.pathFromRoot.join('/')
    path = path.substring(1, path.length).trim()
    return path.indexOf(name) > -1;
  }


  testNotifyMe() {
    this.fcm.testNotifyMe(this.user.uid)
  }
  loginGoogle() {
    this.auth.loginGoogle()
  }
}
