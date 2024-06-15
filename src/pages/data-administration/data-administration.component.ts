import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../supabase';
import { User } from '../../types';
import { App } from '../../types';

type AppKeys = keyof App;
type UserKeys = keyof User;

@Component({
  selector: 'app-data-administration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-administration.component.html',
  styleUrl: './data-administration.component.scss'
})
export class DataAdministrationComponent {
  public users: User[] = [];
  public apps: App[] = [];
  public filteredUsers: User[] = [];
  public filteredApps: App[] = [];

  @ViewChild('userEmail') userEmail!: ElementRef<HTMLInputElement>
  @ViewChild('userName') userName!: ElementRef<HTMLInputElement>
  @ViewChild('userLastName') userLastName!: ElementRef<HTMLInputElement>
  @ViewChild('userDOB') userDOB!: ElementRef<HTMLInputElement>
  @ViewChild('appName') appName!: ElementRef<HTMLInputElement>
  @ViewChild('appVersion') appVersion!: ElementRef<HTMLInputElement>
  @ViewChild('appUrl') appUrl!: ElementRef<HTMLInputElement>
  @ViewChild('userEmailSearch') userEmailSearch!: ElementRef<HTMLInputElement>
  @ViewChild('userNameSearch') userNameSearch!: ElementRef<HTMLInputElement>
  @ViewChild('userLastNameSearch') userLastNameSearch!: ElementRef<HTMLInputElement>
  @ViewChild('appNameSearch') appNameSearch!: ElementRef<HTMLInputElement>
  @ViewChild('appVersionSearch') appVersionSearch!: ElementRef<HTMLInputElement>
  @ViewChild('appURLSearch') appURLSearch!: ElementRef<HTMLInputElement>

  async ngOnInit() {
    this.getUsers();
    this.getApps();
  }

  async getUsers() {
    let { data: Users, error } = await supabase
    .from('Users')
    .select('*')
    .order('id', {ascending: false})
    if (error) {
      console.log("error getting users", error);
    } else {
      this.users = Users || [];
    }
    this.filteredUsers = [...this.users];
  }

  async getApps() {
    let { data: Apps, error } = await supabase
    .from('Apps')
    .select('*')
    .order('id', {ascending: false})
    if (error) {
      console.log("error getting apps", error);
    } else {
      this.apps = Apps || [];
    }
    this.filteredApps = [...this.apps];
  }

  async deleteUser(id: number) {
    const { error } = await supabase
    .from('Users')
    .delete()
    .eq('id', id)
    this.getUsers();
    if (error) {
      console.log("error removing user", error);
    }
  }

  async deleteApp(id: number) {
    const { error } = await supabase
    .from('Apps')
    .delete()
    .eq('id', id)
    this.getApps();
    if (error) {
      console.log("error removing app", error);
    }
  }

  async insertApp() {
    const appName = this.appName.nativeElement.value;
    const appVersion = this.appVersion.nativeElement.value;
    const appUrl = this.appUrl.nativeElement.value;

    if (!appName || !appVersion || !appUrl) {
      console.log("empty data!!!");
      this.appName.nativeElement.classList.add('red');
      this.appVersion.nativeElement.classList.add('red');
      this.appUrl.nativeElement.classList.add('red');
      this.appName.nativeElement.placeholder = 'Please fill out this field!';
      this.appVersion.nativeElement.placeholder = 'Please fill out this field!';
      this.appUrl.nativeElement.placeholder = 'Please fill out this field!';

      setTimeout(() => {
        this.appName.nativeElement.classList.remove('red');
        this.appVersion.nativeElement.classList.remove('red');
        this.appUrl.nativeElement.classList.remove('red');
        this.appName.nativeElement.placeholder = 'Name';
        this.appVersion.nativeElement.placeholder = 'Version';
        this.appUrl.nativeElement.placeholder = 'URL';
      }, 3000);
    } else {
      const { data, error } = await supabase
      .from('Apps')
      .insert([
        { 
          'name': appName, 
          'version': appVersion, 
          'url': appUrl
        },
      ])
      .select()
      if (error) {
        console.log("error inserting app", error);
      } else {
        console.log("inserting app:", data);
      }
        this.appName.nativeElement.value = '';
        this.appVersion.nativeElement.value = '';
        this.appUrl.nativeElement.value = '';
      this.getApps();
    }
  }

  async insertUser() {
    const userEmail = this.userEmail.nativeElement.value;
    const userName = this.userName.nativeElement.value;
    const userLastName = this.userLastName.nativeElement.value;
    const userDOB = this.userDOB.nativeElement.value;

    if (!userEmail || !userName || !userLastName || !userDOB) {
      console.log("empty data!!!");
      this.userEmail.nativeElement.classList.add('red');
      this.userName.nativeElement.classList.add('red');
      this.userLastName.nativeElement.classList.add('red');
      this.userEmail.nativeElement.placeholder = 'Please fill out this field!';
      this.userName.nativeElement.placeholder = 'Please fill out this field!';
      this.userLastName.nativeElement.placeholder = 'Please fill out this field!';

      setTimeout(() => {
        this.userEmail.nativeElement.classList.remove('red');
        this.userName.nativeElement.classList.remove('red');
        this.userLastName.nativeElement.classList.remove('red');
        this.userEmail.nativeElement.placeholder = 'e-mail';
        this.userName.nativeElement.placeholder = 'Name';
        this.userLastName.nativeElement.placeholder = 'Lastname';
      }, 3000);
    } else {
      if (this.checkEmail(userEmail)) { //remove true
        const { data, error } = await supabase
        .from('Users')
        .insert([
          { 
            'email': userEmail,
            'name': userName, 
            'lastName': userLastName, 
            'dob': userDOB,
            'active': true
          },
        ])
        .select()
        if (error) {
          console.log("error inserting users", error);
        } else {
          console.log("inserting user:", data);
        }
        this.userEmail.nativeElement.value = '';
        this.userName.nativeElement.value = '';
        this.userLastName.nativeElement.value = '';
        this.userDOB.nativeElement.value = '';
        this.getUsers();
      } else {
        console.log("invalid email");
        const saveInput = this.userEmail.nativeElement.value;
        this.userEmail.nativeElement.disabled = true;
        this.userEmail.nativeElement.classList.add('red');
        this.userEmail.nativeElement.placeholder = 'Please enter a valid e-mail';
        this.userEmail.nativeElement.value = '';
        setTimeout(() => {
          this.userEmail.nativeElement.disabled = false;
          this.userEmail.nativeElement.classList.remove('red');
          this.userEmail.nativeElement.value = saveInput;
        }, 900);
      }
    }
  }

  private checkEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test if the email matches the regular expression
    return emailRegex.test(email);
  }

  //for users sort arrows
  public and: boolean | undefined = undefined;
  public avd: boolean | undefined = undefined;
  public aud: boolean | undefined = undefined;

  public sortApps(apps: App[], byColumn: AppKeys, direction: boolean | undefined) {
    const sortedApps = [...apps];
    if (direction) {
      sortedApps.sort((a, b) => {
        if (a[byColumn] < b[byColumn]) {
            return -1;
        }
        if (a[byColumn] > b[byColumn]) {
            return 1;
        }
        return 0;
      });
    } else {
      sortedApps.sort((a, b) => {
        if (a[byColumn] < b[byColumn]) {
            return 1;
        }
        if (a[byColumn] > b[byColumn]) {
            return -1;
        }
        return 0;
      });
    }
    switch(byColumn) {
      case 'name':
        this.and = !this.and;
        this.avd = undefined;
        this.aud = undefined;
        break;
      case 'version':
        this.avd = !this.avd;
        this.and = undefined;
        this.aud = undefined;
        break;
      case 'url':
        this.aud = !this.aud;
        this.and = undefined;
        this.avd = undefined;
        break;
    }
    this.apps = sortedApps;
  }

  //for apps sort arrows
  public ued: boolean | undefined = undefined;
  public und: boolean | undefined = undefined;
  public uld: boolean | undefined = undefined;
  public udd: boolean | undefined = undefined;

  public sortUsers(users: User[], byColumn: UserKeys, direction: boolean | undefined) {
    const sortedUsers = [...users];
    if (direction) {
      sortedUsers.sort((a, b) => {
        if (a[byColumn] < b[byColumn]) {
            return -1;
        }
        if (a[byColumn] > b[byColumn]) {
            return 1;
        }
        return 0;
      });
    } else {
      sortedUsers.sort((a, b) => {
        if (a[byColumn] < b[byColumn]) {
            return 1;
        }
        if (a[byColumn] > b[byColumn]) {
            return -1;
        }
        return 0;
      });
    }
    switch(byColumn) {
      case 'email':
        this.ued = !this.ued;
        this.und = undefined;
        this.uld = undefined;
        this.udd = undefined;
        break;
      case 'name':
        this.und = !this.und;
        this.ued = undefined;
        this.uld = undefined;
        this.udd = undefined;
        break;
      case 'lastName':
        this.uld = !this.uld;
        this.ued = undefined;
        this.und = undefined;
        this.udd = undefined;
        break;
      case 'dob':
        this.udd = !this.udd;
        this.ued = undefined;
        this.und = undefined;
        this.uld = undefined;
        break;
    }
    this.filteredUsers = sortedUsers;
  }

  onSearchUsers() {
    const searchTerm1 = this.userEmailSearch.nativeElement.value.toLowerCase();
    const searchTerm2 = this.userNameSearch.nativeElement.value.toLowerCase();
    const searchTerm3 = this.userLastNameSearch.nativeElement.value.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(searchTerm1) &&
      user.name.toLowerCase().includes(searchTerm2) &&
      user.lastName.toLowerCase().includes(searchTerm3)
    );
  }
  onSearchApps() {
    const searchTerm1 = this.appNameSearch.nativeElement.value.toLowerCase();
    const searchTerm2 = this.appVersionSearch.nativeElement.value.toLowerCase();
    const searchTerm3 = this.appURLSearch.nativeElement.value.toLowerCase();

    this.filteredApps = this.apps.filter(app =>
      app.name.toLowerCase().includes(searchTerm1) &&
      app.version.toLowerCase().includes(searchTerm2) &&
      app.url.toLowerCase().includes(searchTerm3)
    );
  }
  clearFilterUsers() {
    this.userEmailSearch.nativeElement.value = '';
    this.userNameSearch.nativeElement.value = '';
    this.userLastNameSearch.nativeElement.value = '';
    this.onSearchUsers();
  }
  clearFilterApps() {
    this.appNameSearch.nativeElement.value = '';
    this.appVersionSearch.nativeElement.value = '';
    this.appURLSearch.nativeElement.value = '';
    this.onSearchApps();
  }
}