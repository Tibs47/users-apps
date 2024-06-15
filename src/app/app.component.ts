import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('userApps') userApps!: ElementRef;
  @ViewChild('administration') administration!: ElementRef;

  constructor(private router: Router) {}

  async ngOnInit() {
    setTimeout(() => {
      this.navigateTo('userapps');
    }, 100);
  }

  public navigateTo(path: String) {
    this.router.navigate(['/' + path]);
    if (path === 'userapps') {
      this.administration.nativeElement.style.textDecoration = 'none';
      this.userApps.nativeElement.style.textDecoration = 'underline';
    } else if (path === 'administration') {
      this.userApps.nativeElement.style.textDecoration = 'none';
      this.administration.nativeElement.style.textDecoration = 'underline';
    }
  }
}
