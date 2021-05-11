import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, NavController, ToastController} from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '@core/models/User';
import {UserService} from '@core/services/api/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {

    displayedColumns: string[] = ['fullName', 'email', 'companyName', 'position', 'role'];
    dataSource = new MatTableDataSource<User>();
    users: User[];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;


    constructor(private nav: NavController,
                private menu: MenuController,
                private toastController: ToastController,
                private localNotifications: LocalNotifications,
                private userService: UserService,
                private router: Router) {
        this.menu.enable(false);
    }

    ngOnInit() {
        // this.showToast();
        // Schedule a single notification
        this.localNotifications.schedule({
            id: 1,
            title: 'My first notification',
            text: 'Hello Amine Mekki',
            sound: 'file://sound.mp3',
            data: {secret: 'hello'}
        });
    }

    ionViewDidEnter() {
        this.userService.getAll().subscribe(users => {
            console.log(users);
            this.users = users;
            this.dataSource.data = this.users;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editRow(userId: number) {
        this.router.navigate(['/admin/add'], {state: {userId}});
    }


    // async showToast() {
    //     const toast = await this.toastController.create({
    //         message: 'press back again to exit App.',
    //         duration: 5000,
    //     });
    //     toast.present();
    // }

}
