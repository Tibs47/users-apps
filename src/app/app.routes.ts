import { Routes } from '@angular/router';
import { UserAppDataComponent } from '../pages/user-app-data/user-app-data.component';
import { DataAdministrationComponent } from '../pages/data-administration/data-administration.component';

export const routes: Routes = [
    {   
        path: 'userapps', 
        component: UserAppDataComponent, 
        title: 'User apps' 
    },
    { 
        path: 'administration', 
        component: DataAdministrationComponent, 
        title: 'Data administration' 
    },
    { 
        path: '', 
        redirectTo: '/userapps', 
        pathMatch: 'full' 
    },
];
