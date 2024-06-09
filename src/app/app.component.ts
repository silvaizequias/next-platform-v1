import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <div>
    <router-outlet />
    <ul *ngFor="let user of users">
      <li>{{ user.id }}
      <a>{{user?.name.firstname}}</a>
      </li>
    </ul>
  </div>`,
})
export class AppComponent {
  title = 'platform-management'
  private api = 'https://fakestoreapi.com/users'
  users: any = []

  constructor(private httpClient: HttpClient) {
    this.findUsers()
    console.log(this.users)
  }

  findUsers() {
    return this.httpClient
      .get(this.api)
      .subscribe((data) => (this.users = data))
  }
}
