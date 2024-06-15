import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../supabase';
import { Relations, User, App, OpenMenu, UsersApps } from '../../types';

@Component({
  selector: 'app-user-app-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-app-data.component.html',
  styleUrl: './user-app-data.component.scss'
})
export class UserAppDataComponent {
  public users: User[] = [];
  public apps: App[] = [];
  public openMenu: OpenMenu[] = [];
  public relations: Relations[] = [];
  public usersApps: UsersApps [] = [];

  async ngOnInit() {
    this.getUsers();
  }

  public initMenus() {
    for (let user of this.users) {
      const menu: OpenMenu = { id:user.id, open:false };
      this.openMenu.push(menu);
    }
  }

  async initUserApps () {
    this.usersApps = [];
    for (let user of this.users) {
      const userPush: User = user;
      const appsPush: App[] = [];
      const relationsPush: Relations[] = [];
      for (let relation of this.relations) {
        if (relation.userId === userPush.id) {
          relationsPush.push(relation);
          //might be usefull
          //const appPush: App | undefined = this.apps.find(item => item.id === relation.appId);
          //if(appPush) {
          //  appsPush.push(appPush);
          //}
        }
      }
      const userAppsPush: UsersApps = {user: userPush, relationIds: relationsPush}
      this.usersApps.push(userAppsPush);
    }
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
    this.initMenus();
    this.getApps();
  }

  async getApps() {
    let { data: Apps, error } = await supabase
    .from('Apps')
    .select('*')
    if (error) {
      console.log("error getting apps", error);
    } else {
      this.apps = Apps || [];
    }
    this.getRelations();
  }

  async getRelations () {
    let { data: AppsUsers, error } = await supabase
    .from('AppsUsers')
    .select('*')
    if (error) {
      console.log("error getting relations", error);
    } else {
      this.relations = AppsUsers || [];
    }
    this.initUserApps();
  }

  public openAppMenu (id: number) {
    const menuItem = this.openMenu.find(item => item.id === id);
    if (menuItem?.open === false) {
      menuItem.open = true;
    } else if (menuItem?.open === true) {
      menuItem.open = false;
    } else {
      console.error(`Menu item with id ${id} not found`);
    }
  }

  public menuIsOpen (id: number) {
    const menuItem = this.openMenu.find(item => item.id === id);
    return menuItem ? menuItem.open : false;
  }

  async deleteRelation (id: number) {
    const { error } = await supabase
    .from('AppsUsers')
    .delete()
    .eq('id', id)
    if (error) {
      console.log("error removing relation", error);
    }
    this.getRelations();
  }

  async addRelation (appId: number, userId: number) {
    const { data, error } = await supabase
    .from('AppsUsers')
    .insert([
      { 
        'appId': appId, 
        'userId': userId
      },
    ])
    .select()
    if (error) {
      console.log("error inserting relation", error);
    }
    this.getRelations();
  }

  public translateApps(id: number, attr: string): string | undefined {
    const app: App | undefined = this.apps.find(app => id === app.id)
    if (app) {
      switch (attr) {
        case 'name':
          return app?.name;
        case 'version':
          return app?.version;
        case 'url':
          return app?.url;
        default:
          return '';
      }
    } else {
      return '';
    }
  }
}
