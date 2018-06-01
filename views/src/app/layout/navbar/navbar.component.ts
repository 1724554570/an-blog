import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { RegisterComponent } from "../../components/register/register.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openUserDialog(): void {
    console.log("Open UserLogin");
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
      data: { name: "aa", animal: "bbb" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result === 200) {
        this.login = true;
      }
    });
  }

  closeUserDialog(): void {
    this.login = false;
  }

}
