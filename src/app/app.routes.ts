import { Routes } from '@angular/router';
import { CourseCrudComponent } from './course-crud/course-crud.component';
import { EquipmentCrudComponent } from './equipment-crud/equipment-crud.component';
import { ConsumableCrudComponent } from './consumable-crud/consumable-crud.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserConsumableComponent } from './user-consumable/user-consumable.component';
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';
import { TermsAndConditonsComponent } from './terms-and-conditons/terms-and-conditons.component';
import { ReportsComponent } from './reports/reports.component';
import { ConsumableReportsComponent } from './consumable-reports/consumable-reports.component';

export const routes: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
        title: 'Dashboard',
        canActivate: [ AuthGuard ],children: [
    
    {
        path: 'courses',
        component: CourseCrudComponent,
        title: 'Home Page'
    },
    {
        path: 'equipments',
        component: EquipmentCrudComponent,
        title: 'Equipments'
    },
    {
        path: 'consumables',
        component: ConsumableCrudComponent,
        title: 'Consumables'
    },
    {
        path: 'reports',
        component: ReportsComponent,
        title: 'Equipment Reports'
    },
    {
        path: 'consumableReports',
        component: ConsumableReportsComponent,
        title: 'Consumable Reports'
    }
    ]},
    // ROUTING FOR USER LOGIN
    {
        path: 'user-menu',
        component: UserMenuComponent,
        title: 'Dashboard',
        canActivate: [ AuthGuard ],children: [
    
    {
        path: 'user-courses',
        component: UserCourseComponent,
        title: 'Home Page'
    },
    {
        path: 'user-equipments',
        component: UserEquipmentComponent,
        title: 'Equipments'
    },
    {
        path: 'user-consumables',
        component: UserConsumableComponent,
        title: 'Consumables'
    }
    ]},
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no route matches

    {
        path:'register',
        component: RegisterComponent,
        title: 'Sign Up'
    },
    {
        path:'terms',
        component: TermsAndConditonsComponent,
        title: 'Terms and Conditions'
    }
    // { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
];
